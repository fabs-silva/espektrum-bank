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
import React from 'react';
import { Logo } from '../../components/Logo';
import { loginSupervisorJson } from './json/loginJson';

export function LoginSupervisor() {
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
				{loginSupervisorJson.map((lp) => (
					<VStack
						key={lp.id}
						w="100%"
						gap={10}>
						<Text size="xl">{lp.label}</Text>
						<Input size="xl">
							<InputField
								type={lp.inputType}
								keyboardType={lp.keyboardType}
								maxLength={lp.maxLength}
							/>
						</Input>
					</VStack>
				))}
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
						size="xl">
						<ButtonText>Esqueci minha senha</ButtonText>
					</Button>
				</VStack>
			</FormControl>
		</Center>
	);
}
