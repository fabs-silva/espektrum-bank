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

export function LoginSupervisor({ navigation }) {
	const [cpfInput, setCpfInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	const [errors, setErrors] = useState({});

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!cpfInput){
			 setErrors(prevState => ({...prevState, cpf: "CPF é um campo obrigatório."}));
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
		api.post('/signIn/supervisor', {
			cpf: cpfInput,
			password: passwordInput,
		}).then(response => {
			const { token, supervisor_name } = response.data;

    	SecureStore.setItemAsync("token", token);

			navigation.navigate('HomeSupervisor', {
				supervisor_name,
			})
		}).catch(error => {
			console.log(JSON.stringify(error.response.data.message))
			if(error.response.status === 401 || error.response.data.message === 'No Supervisor found'){
				Alert.alert('Erro', 'CPF e/ou senha inválidos.');
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
						<Text size="xl">CPF</Text>
						<Input size="xl" isInvalid={errors.cpf ? true : false}>
							<InputField
								maxLength={11}
								keyboardType='numeric'
								value={cpfInput}
								onChangeText={setCpfInput}
							/>
						</Input>
						{errors.cpf && (
								<Text size="md" color="$error500">{errors.cpf}</Text>
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
