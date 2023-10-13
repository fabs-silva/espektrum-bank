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
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Logo } from '../../components/Logo';

export function LoginSupervisor() {
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

	const onSubmit = () => {
		return null
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
						size="xl">
						<ButtonText>Entrar</ButtonText>
					</Button>
					<Button
						variant="outline"
						size="xl"
						onPress={() => validate()}>
						<ButtonText>Esqueci minha senha</ButtonText>
					</Button>
				</VStack>
			</FormControl>
		</Center>
	);
}
