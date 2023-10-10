import {
	FormControl,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';

export default function FindCep() {
	return (
		<ContainerOnboarding
			step={4}
			stepCount={7}
			title={'4 Endereço'}
			buttonTitle={'Buscar CEP'}
			onPress={() => null}>
			<FormControl
				gap={32}
				mt="$6"
				mb="$4">
				<VStack
					w="100%"
					gap={10}>
					<Text size="xl">CEP</Text>
					<Input size="xl">
						<InputField
							type="text"
							keyboardType="numeric"
							maxLength={8}
						/>
					</Input>
				</VStack>
			</FormControl>
		</ContainerOnboarding>
	);
}
