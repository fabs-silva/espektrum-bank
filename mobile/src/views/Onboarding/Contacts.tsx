import {
	FormControl,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { InputJsonType } from '../Login/json/loginJson';
import { contactsJson } from './json/onboardingJson';

export default function Contacts() {
	return (
		<ContainerOnboarding
			step={5}
			stepCount={7}
			title={'5 Contatos'}
			buttonTitle={'Próximo'}
			onPress={() => null}>
			<Text
				size="md"
				mb="$6">
				* Todos os campos são obrigatórios
			</Text>
			<FormControl
				gap={32}
				mb="$4">
				{contactsJson.map((bi: InputJsonType) => {
					return (
						<VStack
							key={bi.id}
							w="100%"
							gap={10}>
							<Text size="xl">{bi.label}</Text>
							<Input size="xl">
								<InputField
									type={bi.inputType}
									keyboardType={bi.keyboardType}
									maxLength={bi.maxLength}
								/>
							</Input>
						</VStack>
					);
				})}
			</FormControl>
		</ContainerOnboarding>
	);
}
