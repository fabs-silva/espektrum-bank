import {
	FormControl,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { RegisterClientStore } from '../../utils/store';
import { statesList } from './json/onboardingJson';

export function FullAddress({ route, navigation }) {

	const { cep, street, district, city, state }  = route.params;

	const [houseNumber, setHouseNumber] = useState("");
	const [complement, setComplement] = useState("");

	const [errors, setErrors] = useState({});

	useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!houseNumber){
			 setErrors(prevState => ({...prevState, houseNumber: "Número é um campo obrigatório."}));
			 isValid = false;
		};

		if(isValid){
			onSubmit();
		}
	}

	const stateFullName = statesList.find(st => st.code === state)?.state;

	 const onSubmit = () => {
    RegisterClientStore.update((s) => {
			s.cep = cep;
			s.street = street;
			s.number = houseNumber;
			s.complement = complement;
			s.district = district;
			s.city = city;
			s.state = stateFullName;
    });
    navigation.navigate("Contacts");
  };

	return (
		<ScrollView>
			<ContainerOnboarding
				step={4}
				stepCount={8}
				title={'4 Endereço'}
				buttonTitle={'Próximo'}
				onPress={() => validate()}>
				<Text
					size="md"
					mb="$6">
					* Todos os campos são obrigatórios, exceto complemento
				</Text>
				<FormControl
					gap={32}
					mb="$4">
						<VStack
								w="100%"
								gap={10}>
								<Text size="xl">CEP</Text>
								<Input size="xl" isReadOnly={true}>
									<InputField
										type="text"
										value={cep}
									/>
								</Input>
							</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Rua</Text>
								<Input size="xl" isReadOnly={true} >
									<InputField
										type="text"
										value={street}
									/>
								</Input>
							</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Número</Text>
								<Input size="xl"  isInvalid={errors.houseNumber ? true : false}>
									<InputField
										type="text"
										value={houseNumber}
										onChangeText={setHouseNumber}
									/>
								</Input>
								{errors.houseNumber && (
									<Text size="md" color="$error500">{errors.houseNumber}</Text>
								)}
							</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Complemento (não obrigatório)</Text>
								<Input size="xl">
									<InputField
										type="text"
										value={complement}
										onChangeText={setComplement}
									/>
								</Input>
							</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Bairro</Text>
								<Input size="xl" isReadOnly={true}>
									<InputField
										type="text"
										value={district}
									/>
								</Input>
							</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Cidade</Text>
								<Input size="xl" isReadOnly={true}>
									<InputField
										type="text"
										value={city}
									/>
								</Input>
							</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Estado</Text>
								<Input size="xl" isReadOnly={true}>
									<InputField
										type="text"
										value={stateFullName}
									/>
								</Input>
							</VStack>
				</FormControl>
			</ContainerOnboarding>
		</ScrollView>
	);
}
