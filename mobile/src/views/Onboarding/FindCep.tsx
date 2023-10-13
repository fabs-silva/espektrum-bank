import {
	FormControl,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';

export function FindCep({ navigation }) {

	const [cep, setCep] = useState("");
	
	const findCepApi = () => {
		axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`).then((response) => {
			navigation.navigate('FullAddress', {
				cep: cep,
				street: response.data.street,
				district: response.data.neighborhood,
				city: response.data.city,
				state: response.data.state
			})
		}).catch((error) => {
			Alert.alert("Erro", "Não foi possível encontrar seu CEP.");
		})
	}

	return (
		<ContainerOnboarding
			step={4}
			stepCount={8}
			title={'4 Endereço'}
			buttonTitle={'Buscar CEP'}
			onPress={() => findCepApi()}>
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
							onChangeText={setCep}
							value={cep}
						/>
					</Input>
				</VStack>
			</FormControl>
		</ContainerOnboarding>
	);
}
