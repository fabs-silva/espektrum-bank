import {
	Button,
	ButtonText,
	ChevronDownIcon,
	FormControl,
	Heading,
	Icon,
	Input,
	InputField,
	KeyboardAvoidingView,
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
	VStack,
} from '@gluestack-ui/themed';
import * as SecureStore from "expo-secure-store";
import { useRef, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { api } from '../../utils/axios';
import { pixKeyTypeList } from './json/transactionsJson';

export function PixKey({navigation }) {
  
  const [pixKeyType, setPixKeyType] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
	const ref = useRef(null);

  const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!pixKey){
			 setErrors(prevState => ({...prevState, pixKey: "Chave é um campo obrigatório."}));
			 isValid = false;
		};

		if(!pixKeyType){
			 setErrors(prevState => ({...prevState, pixKeyType: "Tipo de chave é um campo obrigatório."}));
			 isValid = false;
		};

		if(isValid){
			onSubmit();
		}
	}

  const onSubmit = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      await api.post('/pixKey', 
        {
          pix_key: pixKey,
          key_type: pixKeyType.toLowerCase().replace("-", ""),
        },
        {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
      setShowModal(true);
    } catch (error) {
      if(error.response.status === 500){
        Alert.alert('Erro', 'Esta chave PIX já foi cadastrada.');
        return;
      }
			Alert.alert('Erro', 'Não foi possível salvar sua chave PIX.');
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
				<VStack>
					<Heading
						lineHeight="$xl"
						size="xl">
						PIX - Cadastro de Chave
					</Heading>
					<VStack
						w="100%">
            <VStack gap={16}>
              <Text size="lg">Primeiro escolha o tipo de chave que deseja cadastrar (Número do celular, e-mail, CPF ou chave aleatória).</Text>
              <Text size="lg">Depois, digite a chave e salve. No caso de chave aleatória, uma combinação de letras e números é gerada pelo sistema.</Text>
            </VStack>
					</VStack>
				</VStack>
        <FormControl
					gap={32}
					mb="$4">
					<VStack
						w="100%"
						gap={10}>
						<Text size="xl">Tipo de chave</Text>
						<Select
							onValueChange={setPixKeyType}
							isInvalid={errors.pixKeyType ? true : false}>
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
									{pixKeyTypeList.map((pk) => (
										<SelectItem
											key={pk}
											label={pk}
											value={pk}
										/>
									))}
								</SelectContent>
							</SelectPortal>
						</Select>
						{errors.pixKeyType && (
									<Text size="md" color="$error500">{errors.pixKeyType}</Text>
								)}
					</VStack>
          <VStack
								w="100%"
								gap={10}>
								<Text size="xl">Chave</Text>
								<Input size="xl" isInvalid={errors.pixKey ? true : false}>
									<InputField
										type="text"
										onChangeText={setPixKey}
										value={pixKey}
									/>
								</Input>
								{errors.pixKey && (
									<Text size="md" color="$error500">{errors.pixKey}</Text>
								)}
							</VStack>
				</FormControl>
        </VStack>
				<VStack
					width={'100%'}>
					<Button
						variant="solid"
						size="xl"
						onPress={() => validate()}>
						<ButtonText>Salvar</ButtonText>
					</Button>
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
                <Heading size="lg">Chave PIX cadastrada com sucesso.</Heading>
                <Text size="lg">Sua chave PIX foi cadastrada e já pode ser utilizada para realizar transações.</Text>
								<Button
									size="xl"
									onPress={() => {
										setShowModal(false);
										navigation.navigate('Home');
									}}>
									<ButtonText>Voltar para a Home</ButtonText>
								</Button>
                </VStack>
							</ModalBody>
						</ModalContent>
					</Modal>
			</VStack>
		</VStack>
    </KeyboardAvoidingView>
	);
}
