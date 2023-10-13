import {
	Button,
	ButtonText,
	FormControl,
	Heading,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Logo } from '../../components/Logo';
import { api } from '../../utils/axios';

export function CheckCpf({ navigation }) {
	const [cpf, setCpf] = useState('');

	async function findCpf(cpf: string) {
		try {
			const response = await api.post('/findUserCpf', { cpf });

			navigation.navigate('AlreadyRegistered', {
				email: response.data.emails[0].email_address,
			});
		} catch (error) {
			if (error.response.data.message === 'No User found') {
				navigation.navigate('OnboardingWelcome');
			} else {
				Alert.alert('Erro', 'Não foi possível buscar seu CPF.');
			}
		}
	}

	return (
		<VStack
			flex={1}
			alignItems="center"
			bgColor="$backgroundDark100"
			p="$10"
			pb="$16">
			<FormControl
				gap={32}
				w="100%"
				flex={1}
				justifyContent="space-between">
				<VStack>
					<VStack
						w="100%"
						alignItems="center"
						mb="$12">
						<Logo />
					</VStack>
					<Heading
						lineHeight="$2xl"
						size="2xl"
						mb="$8">
						Antes de começarmos
					</Heading>
					<Text
						mb="$8"
						size="lg">
						Precisamos verificar se você já não tem uma conta cadastrada em
						nosso banco. Para isso, digite eu CPF e clique no botão ‘Verificar’.
					</Text>
					<VStack
						w="100%"
						gap={10}>
						<Text size="xl">CPF</Text>
						<Input size="xl">
							<InputField
								type="text"
								keyboardType="numeric"
								maxLength={11}
								onChangeText={setCpf}
							/>
						</Input>
					</VStack>
				</VStack>
				<VStack
					gap={24}
					w="100%">
					<Button
						variant="solid"
						size="xl"
						onPress={() => findCpf(cpf)}>
						<ButtonText>Verificar</ButtonText>
					</Button>
				</VStack>
			</FormControl>
		</VStack>
	);
}
