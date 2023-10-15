import {
  Button,
  ButtonText,
  FormControl,
  HStack,
  Heading,
  Input,
  InputField,
  KeyboardAvoidingView,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import * as SecureStore from "expo-secure-store";
import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { api } from '../../utils/axios';

export function ConfirmPix({navigation, route }) {

  const { pixReceiver, pixValue, paymentDate, comment } = route.params;

  const [showModal, setShowModal] = useState(false);
  const [pixTransaction, setPixTransaction] = useState({})
	const ref = useRef(null);

  const onSubmit = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const pix = await api.post('/transactions/pix', 
        {
          value: parseFloat(pixValue),
          comment,
          pix_key: pixReceiver.pix_key,
          programmed_to: new Date(paymentDate),
        },
        {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
      setPixTransaction(pix.data);
      setShowModal(true);
    
    } catch (error) {
      if(error.response.status === 401){
        Alert.alert('Erro', 'Você não tem saldo suficiente para realizar esta transação.');
      }
			Alert.alert('Erro', 'Não foi possível realizar esta transação.');
		}
  }

	return (
    <KeyboardAvoidingView style={{flex: 1}}>
		<VStack
			flex={1}
			alignItems="center"
			bgColor="$backgroundDark100"
			p="$10"
			pb="$16">
			<VStack
				w="100%"
				flex={1}
				justifyContent="space-between">
          <VStack gap={32}>
					<Heading
						lineHeight="$xl"
						size="xl">
						Fazer um PIX
					</Heading>
        <FormControl
					gap={32}
					mb="$4">
          <VStack
								w="100%"
								gap={10}>
								<Text size="xl">Chave PIX</Text>
								<Input size="xl" isReadOnly={true}>
									<InputField
										type="text"
										value={pixReceiver.pix_key}
									/>
								</Input>
							</VStack>
          <VStack gap={6}>
            <Text size="xl" fontFamily="Jost_700Bold">{pixReceiver.name}</Text>
            <Text size="lg">{pixReceiver.bank}</Text>
          </VStack>
          <VStack gap={32}>
          <HStack justifyContent='space-between'>
            <Text size="lg" fontWeight="700">Valor</Text>
            <Text size="lg">R$ {parseFloat(pixValue).toFixed(2)}</Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text size="lg" fontWeight="700">Data de pagamento</Text>
            <Text size="lg">{new Date(paymentDate).toLocaleDateString()}</Text>
          </HStack>
          <VStack mb="$6" gap={6}>
            <Text size="lg" fontWeight="700">Comentário</Text>
            <Text size="lg">{comment}</Text>
          </VStack>
          </VStack>
				</FormControl>
        </VStack>
				<VStack
					width={'100%'}>
					<Button
						variant="solid"
						size="xl"
						onPress={() => onSubmit()}>
						<ButtonText>Fazer PIX</ButtonText>
					</Button>
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
                <Heading size="lg">PIX feito com sucesso.</Heading>
                <Text size="lg">Seu PIX foi feito com sucesso e já deve estar na conta do recebedor.</Text>
								<Button
									size="xl"
									onPress={() => {
										setShowModal(false);
										navigation.navigate('PixReceipt', { pixReceiver, pixTransaction })
									}}>
									<ButtonText>Voltar para a Home</ButtonText>
								</Button>
                </VStack>
							</ModalBody>
						</ModalContent>
					</Modal>
		</VStack>
    </KeyboardAvoidingView>
	);
}
