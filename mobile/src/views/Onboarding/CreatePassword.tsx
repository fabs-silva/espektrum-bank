import {
	FormControl,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { RegisterClientStore } from '../../utils/store';

export function CreatePassword({ navigation }) {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [errors, setErrors] = useState({});

	useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!password){
			 setErrors(prevState => ({...prevState, password: "Senha é um campo obrigatório."}));
			 isValid = false;
		};

		if(!confirmPassword){
			 setErrors(prevState => ({...prevState, confirmPassword: "Confirmar senha é um campo obrigatório."}));
			 isValid = false;
		};

		if(password.length < 8){
			 setErrors(prevState => ({...prevState, passwordLength: "A senha deve ter 8 números."}));
			 isValid = false;
		};

		if(password !== confirmPassword){
			setErrors(prevState => ({...prevState, differentPassword: "A senha e sua confirmação devem ser iguais."}));
			 isValid = false;
		}

		if(isValid){
			onSubmit();
		}
	}

	 const onSubmit = () => {
    RegisterClientStore.update((s) => {
			s.password = password;
    });
    
		navigation.navigate("ConfirmData");
  };

	return (
		<ContainerOnboarding
			step={7}
			stepCount={8}
			title={'8 Cadastre sua senha'}
			buttonTitle={'Confirmar dados'}
			onPress={() => validate()}>
				<Text
				size="xl"
				mb="$6">
				Essa senha deve ter oito números. Ela será utilizada para fazer o login
				e também para confirmar suas transações.
			</Text>
			<FormControl
				gap={32}
				mb="$4">						
						<VStack
							w="100%"
							gap={10}>
							<Text size="xl">Digite a senha</Text>
							<Input size="xl" isInvalid={errors.password ? true : false}>
								<InputField
									type="password"
									keyboardType="numeric"
									maxLength={8}
									value={password}
									onChangeText={setPassword}
								/>
							</Input>
							{errors.password && (
								<Text size="md" color="$error500">{errors.password}</Text>
							)}
							{errors.passwordLength && (
								<Text size="md" color="$error500">{errors.passwordLength}</Text>
							)}
						</VStack>
						<VStack
							w="100%"
							gap={10}>
							<Text size="xl">Confirme a senha</Text>
							<Input size="xl" isInvalid={errors.confirmPassword ? true : false}>
								<InputField
									type="password"
									keyboardType="numeric"
									maxLength={8}
									value={confirmPassword}
									onChangeText={setConfirmPassword}
								/>
							</Input>
							{errors.confirmPassword && (
								<Text size="md" color="$error500">{errors.confirmPassword}</Text>
							)}
							{errors.differentPassword && (
								<Text size="md" color="$error500">{errors.differentPassword}</Text>
							)}
						</VStack>
			</FormControl>
		</ContainerOnboarding>
	);
}
