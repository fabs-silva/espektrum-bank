import {
	FormControl,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';

export default function PasswordSupervisor() {
	return (
		<ContainerOnboarding
			step={3}
			stepCount={3}
			title={'3 Senha - responsável'}
			buttonTitle={'Confirmar'}
			onPress={() => null}>
			<Text
				size="xl"
				mb="$6">
				Essa senha deve ter oito números. Ela será utilizada para fazer o login
				e também para confirmar as transações do cliente supervisionado.
			</Text>
			<FormControl
				gap={32}
				mb="$4">
				<VStack
					w="100%"
					gap={10}>
					<Text size="xl">Digite a senha</Text>
					<Input size="xl">
						<InputField
							type="password"
							keyboardType="numeric"
							maxLength={8}
						/>
					</Input>
				</VStack>
				<VStack
					w="100%"
					gap={10}>
					<Text size="xl">Confirme a senha</Text>
					<Input size="xl">
						<InputField
							type="password"
							keyboardType="numeric"
							maxLength={8}
						/>
					</Input>
				</VStack>
			</FormControl>
		</ContainerOnboarding>
	);
}
