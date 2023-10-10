import {
	FormControl,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { ScrollView } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { InputJsonType } from '../Login/json/loginJson';
import { addressJson } from './json/onboardingJson';

export default function FullAddress() {
	return (
		<ScrollView>
			<ContainerOnboarding
				step={4}
				stepCount={7}
				title={'4 Endereço'}
				buttonTitle={'Próximo'}
				onPress={() => null}>
				<Text
					size="md"
					mb="$6">
					* Todos os campos são obrigatórios, exceto complemento
				</Text>
				<FormControl
					gap={32}
					mb="$4">
					{addressJson.map((bi: InputJsonType) => {
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
		</ScrollView>
	);
}
