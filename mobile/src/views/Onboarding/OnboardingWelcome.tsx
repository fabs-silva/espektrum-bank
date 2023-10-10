import {
	Button,
	ButtonText,
	Heading,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { Logo } from '../../components/Logo';

export function OnboardingWelcome({ navigation }) {
	return (
		<VStack
			flex={1}
			alignItems="center"
			bgColor="$backgroundDark100"
			p="$10"
			pb="$16">
			<VStack
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
						Bem-vindo ao seu novo banco
					</Heading>
					<Text
						mb="$4"
						size="lg">
						Estamos felizes que você escolheu abrir uma conta conosco.
					</Text>
					<Text
						mb="$8"
						size="lg">
						Precisamos que você preencha algumas informações básicas, tais como
						nome completo, formas de contato, endereço e documentos de
						identificação. Para isso, clique no botão Iniciar Cadastro.
					</Text>
				</VStack>
				<Button
					variant="solid"
					size="xl"
					onPress={() => navigation.navigate('AccountType')}>
					<ButtonText>Iniciar Cadastro</ButtonText>
				</Button>
			</VStack>
		</VStack>
	);
}
