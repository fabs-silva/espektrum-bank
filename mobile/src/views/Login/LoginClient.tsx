import {
	Button,
	ButtonText,
	Center,
	FormControl,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import * as SecureStore from "expo-secure-store";
import React, { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { Logo } from '../../components/Logo';
import { api } from '../../utils/axios';

export function LoginClient( { navigation, route }) {

	const { accountNumber } = route.params;
	
	const [accountNumberInput, setAccountNumberInput] = useState(accountNumber || "");
	const [passwordInput, setPasswordInput] = useState("");

	const [errors, setErrors] = useState({});

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!accountNumberInput){
			 setErrors(prevState => ({...prevState, accountNumber: "Número da conta é um campo obrigatório."}));
			 isValid = false;
		};

		if(!passwordInput){
			 setErrors(prevState => ({...prevState, password: "Senha é um campo obrigatório."}));
			 isValid = false;
		};

		if(isValid){
			onSubmit();
		}
	}

	const onSubmit = async () => {
		api.post('/signIn/client', {
			account_number: parseInt(accountNumberInput),
			password: passwordInput,
		}).then(response => {
			const { token,  user_name } = response.data;

			SecureStore.setItemAsync("token", token);

			navigation.navigate('Home', {
				user_name,
			})
		}).catch(error => {
			if(error.response.status === 401 || error.response.data.message === 'No Account found'){
				Alert.alert('Erro', 'Número da conta e/ou senha inválidos.');
			} else {
				Alert.alert('Erro', 'Não foi possível realizar o login.');
			}
		});
	}
	
	return (
		<Center
			flex={1}
			bgColor="$backgroundDark100"
			p="$10">
			<FormControl
				gap={32}
				alignItems="center"
				w="100%">
				<Logo />
					<VStack
						w="100%"
						gap={10}>
						<Text size="xl">Número da conta</Text>
						<Input size="xl" isInvalid={errors.accountNumber ? true : false}>
							<InputField
								maxLength={7}
								keyboardType='numeric'
								value={accountNumberInput}
								onChangeText={setAccountNumberInput}
							/>
						</Input>
						{errors.accountNumber && (
								<Text size="md" color="$error500">{errors.accountNumber}</Text>
							)}
					</VStack>
						<VStack
						w="100%"
						gap={10}>
						<Text size="xl">Senha</Text>
						<Input size="xl" isInvalid={errors.password ? true : false}>
							<InputField
								type='password'
								keyboardType='numeric'
								maxLength={8}
								value={passwordInput}
								onChangeText={setPasswordInput}
							/>
						</Input>
						{errors.password && (
								<Text size="md" color="$error500">{errors.password}</Text>
							)}
					</VStack>
				<VStack
					gap={24}
					w="100%">
					<Button
						variant="solid"
						size="xl"
						onPress={() => validate()}>
						<ButtonText>Entrar</ButtonText>
					</Button>
					<Button
						variant="outline"
						size="xl"
						>
						<ButtonText>Esqueci minha senha</ButtonText>
					</Button>
				</VStack>
			</FormControl>
		</Center>
	);
}
