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

export function Contacts({ navigation }) {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [emailAddress, setEmailAddress] = useState("");

	const [errors, setErrors] = useState({});

	useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!phoneNumber){
			 setErrors(prevState => ({...prevState, phoneNumber: "Telefone é um campo obrigatório."}));
			 isValid = false;
		};

		if(!emailAddress){
			 setErrors(prevState => ({...prevState, emailAddress: "E-mail é um campo obrigatório."}));
			 isValid = false;
		};

		if(isValid){
			onSubmit();
		}
	}

	 const onSubmit = () => {
    RegisterClientStore.update((s) => {
			s.phone_number = phoneNumber;
			s.email_address = emailAddress;
    });
    navigation.navigate("SelfieInstructions");
  };

	return (
		<ContainerOnboarding
			step={5}
			stepCount={8}
			title={'5 Contatos'}
			buttonTitle={'Próximo'}
			onPress={() => validate()}>
			<Text
				size="md"
				mb="$6">
				* Todos os campos são obrigatórios
			</Text>
			<FormControl
				gap={32}
				mb="$4">
				<VStack
							w="100%"
							gap={10}>
							<Text size="xl">Telefone celular (com DDD)</Text>
							<Input size="xl"  isInvalid={errors.phoneNumber ? true : false}>
								<InputField
									type="text"
									keyboardType="phone-pad"
									maxLength={11}
									value={phoneNumber}
									onChangeText={setPhoneNumber}
								/>
							</Input>
							{errors.phoneNumber && (
									<Text size="md" color="$error500">{errors.phoneNumber}</Text>
								)}
						</VStack>
						<VStack
							w="100%"
							gap={10}>
							<Text size="xl">E-mail</Text>
							<Input size="xl"  isInvalid={errors.emailAddress ? true : false}>
								<InputField
									type="text"
									keyboardType="email-address"
									value={emailAddress}
									onChangeText={setEmailAddress}
								/>
							</Input>
							{errors.emailAddress && (
									<Text size="md" color="$error500">{errors.emailAddress}</Text>
								)}
						</VStack>
			</FormControl>
		</ContainerOnboarding>
	);
}
