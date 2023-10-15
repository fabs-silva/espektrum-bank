import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Button,
  ButtonText,
  ChevronDownIcon,
  HStack,
  Icon,
  Link,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack
} from "@gluestack-ui/themed";
import * as SecureStore from "expo-secure-store";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { Transaction } from '../../components/Transaction';
import { api } from '../../utils/axios';
import { capitalizeFirstLetter, signOut, welcomeGreeting } from "../../utils/utilfunctions";


export function HomeSupervisor({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const { supervisor_name } = route.params;

  const [supervisorInfo, setSupervisorInfo] = useState({});
  const [accountNumberList, setAccountNumberList] = useState([]);
  const [account, setAccount] = useState({});
  const [accountSelected, setAccountSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
	const ref = useRef(null);

    async function fetchDataInfo() {
    const token = await SecureStore.getItemAsync("token");
    const response = await api.get('/supervisorInfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  function changeAccount(accountNumber: string){
    const newAccount = supervisorInfo.supervised_accounts.find(a => a.account_number === accountNumber);
    setAccount(newAccount);
    setShowModal(false);
  }

  useEffect(() => {   
    setLoading(true); 
    fetchDataInfo().then(response => {
      setSupervisorInfo(response.data.supervisor);
      setAccount(response.data.supervisor.supervised_accounts[0]);
      setAccountNumberList(response.data.supervisor.supervised_accounts.map(a => { return { accountNumber: a.account_number, accountName: a.user.name }}));
      setAccountSelected(response.data.supervisor.supervised_accounts[0].account_number)
    }).catch(error => {
      Alert.alert("Erro", "Não foi possível acessar seus dados.")
    }).finally(() => setLoading(false));

  }, []);

  if(loading) return <Text>Carregando...</Text>

  return(
    <ScrollView style={{ backgroundColor: '#E5E5E5'}}>
      <VStack flex={1}
        bgColor="$backgroundDark100"
        p="$10" gap={32}>
          <HStack justifyContent='space-between' alignItems='center'>
            <Text size="xl">{welcomeGreeting("a")}, <Text size="xl" fontFamily="Jost_700Bold">{supervisor_name.slice(0, supervisor_name.indexOf(" "))}</Text></Text>
            <TouchableOpacity onPress={() => signOut(navigation)}>
            <MaterialCommunityIcons name="exit-to-app" size={26} />
            </TouchableOpacity>
          </HStack>
           <VStack>
            <Text size='md' mb="$1">Conta selecionada:</Text>
            <Text size='lg' borderRadius={5}
				borderWidth="$1"
				borderColor="$borderDark900"
        p="$3">{account.user.name} - cc. {account.account_number}</Text>
          <Link alignItems='center' mt="$4" onPress={() => setShowModal(true)}><Text size="lg" underline>Trocar conta</Text></Link>
        </VStack>
        <Button size="xl">
          <ButtonText>Aprovar Lançamentos</ButtonText>
        </Button>
        <VStack>
          <Text size="lg" fontWeight="700" mb="$4">Últimas Transações</Text>
          {account.transactions.length === 0 
          ? (<Text>Não existem transações para esta conta.</Text>)
          :  account.transactions.map(t => (
          <Transaction key={t.id} payer={t.receiver.name} transactionType={capitalizeFirstLetter(t.type) + " " + creditDebit(t.debit_credit)} transactionDate={new Date(t.settled_at)} transactionValue={parseFloat(t.value)} debitCredit={t.debit_credit} />
        ))}
        </VStack>
      </VStack>
      	<Modal
						isOpen={showModal}
						onClose={() => {
							setShowModal(false);
						}}
						finalFocusRef={ref}>
						<ModalBackdrop />
						<ModalContent>
							<ModalBody>
                <VStack p="$4" gap={24}>
								<VStack
						w="100%"
						gap={10}
            >
						<Text size="lg">Selecione uma conta: </Text>
						<Select
							onValueChange={setAccountSelected}>
							<SelectTrigger
								variant="outline"
								size="xl">
								<SelectInput placeholder="Selecione uma opção" />
								<SelectIcon mr="$3">
									<Icon as={ChevronDownIcon} />
								</SelectIcon>
							</SelectTrigger>
							<SelectPortal>
								<SelectBackdrop />
								<SelectContent>
									<SelectDragIndicatorWrapper>
										<SelectDragIndicator />
									</SelectDragIndicatorWrapper>
									{accountNumberList.map((acc) => (
										<SelectItem
											key={acc.accountNumber}
											label={acc.accountNumber}
											value={acc.accountNumber}
										/>
									))}
								</SelectContent>
							</SelectPortal>
						</Select>
					</VStack>
          <Button size="xl" onPress={() => changeAccount(accountSelected)}>
            <ButtonText>Selecionar conta</ButtonText>
          </Button>
          </VStack>
							</ModalBody>
						</ModalContent>
					</Modal>
    </ScrollView>
  )
}