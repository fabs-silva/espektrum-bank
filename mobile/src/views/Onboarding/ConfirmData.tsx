import {
	Button,
	ButtonText,
	Heading,
	Text,
	VStack
} from '@gluestack-ui/themed';
import { CommonActions } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { api } from '../../utils/axios';
import { RegisterClientStore } from '../../utils/store';
import { capitalizeFirstLetter } from '../../utils/utilfunctions';

export function ConfirmData({ route, navigation }) {

	useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

	const backToStartButton = () => {
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: 'AccountType' }],
			}),
		);
	};

const data = RegisterClientStore.useState(s => s);

const registerAccount = async () => {

	if(data.account_type === "independente"){
		try {
			const register = await api.post('/registerIndependent', {
				name: data.name,
				birthday: data.birthday,
				birth_country: data.birth_country,
				genre_identity: data.genre_identity,
				cpf: data.cpf,
				identification: data.identification,
				issuing_body: data.issuing_body,
				issuing_state: data.issuing_state,
				street: data.street,
				number: data.number,
				complement: data.complement,
				district: data.district,
				city: data.city,
				state: data.state,
				cep: data.cep,
				email_address: data.email_address,
				phone_number: data.phone_number,
				selfie_url: data.selfie_url,
				account_type: data.account_type,
				password: data.password,
			});

			navigation.navigate('AccountCreated', {
				client: register.data,
			})
		} catch (error) {
			Alert.alert('Erro', 'Não foi possível abrir sua conta.')
		}
	} else {
			navigation.navigate('SupervisorBasicInfo');
	}
}

  // const data = {
  // name: 'Joana Silva',
	// birthday: '2005-10-11T01:05:18.000Z',
	// birth_country: 'Brasil',
	// genre_identity: 'mulher cisgênero',
	// cpf: '75041974080',
	// identification: '421398851',
	// issuing_body: 'SSP',
	// issuing_state: 'São Paulo',
	// street: 'Praça da Matriz',
	// number: '52',
	// complement: '',
	// district: 'Centro',
	// city: 'Bofete',
	// state: 'São Paulo',
	// cep: '18590970',
	// email_address: 'joana.silva@gmail.com',
	// phone_number: '14982771711',
	// selfie_url: 'imagem.jpg',
	// account_type: 'independente',
	// password: '12345678',
	// supervisor_name: null,
	// supervisor_birthday: null,
	// supervisor_genre_identity: null,
	// supervisor_cpf: null,
	// supervisor_identification: null,
	// supervisor_issuing_body: null,
	// supervisor_issuing_state: null,
	// supervisor_email_address: null,
	// supervisor_phone_number: null,
	// supervisor_password: null,
  // }

	return (
		<ScrollView>
			<ContainerOnboarding
				step={8}
				stepCount={8}
				title={'8 Confira seus dados'}
				buttonTitle={data.account_type === "independente" ? 'Abrir conta' : 'Cadastrar responsável'}
				onPress={() => registerAccount()}>
					<VStack mt="$6" gap={24} mb="$10">
					<VStack 
						p="$4" 
						borderRadius={5}
						borderWidth="$1"
						borderColor="$borderDark900"
					>
						<Heading size="lg" mb="$4">01 Tipo de conta</Heading>
						<Text size="lg"><Text fontFamily='Jost_700Bold'>Tipo de conta: </Text>{capitalizeFirstLetter(data.account_type)}</Text>
					</VStack>
					<VStack 
							p="$4" 
							borderRadius={5}
							borderWidth="$1"
							borderColor="$borderDark900"
						>
						<Heading size="lg" mb="$4">02 Dados básicos</Heading>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Nome: </Text>{data.name}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Data de nascimento: </Text>{data.birthday.toLocaleDateString()}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>País de nascimento: </Text>{data.birth_country}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Identidade de gênero: </Text>{capitalizeFirstLetter(data.genre_identity)}</Text>
					</VStack>
					<VStack 
							p="$4" 
							borderRadius={5}
							borderWidth="$1"
							borderColor="$borderDark900"
						>
						<Heading size="lg" mb="$4">03 Documentos</Heading>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>CPF: </Text>{data.cpf}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Documento de identificação: </Text>{data.identification}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Órgão emissor: </Text>{data.issuing_body}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Estado de emissão: </Text>{data.issuing_state}</Text>
					</VStack>
					<VStack 
							p="$4" 
							borderRadius={5}
							borderWidth="$1"
							borderColor="$borderDark900"
						>
						<Heading size="lg" mb="$4">04 Endereço</Heading>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Rua: </Text>{data.street}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Número: </Text>{data.number}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Complemento: </Text>{data.complement !== '' ? data.complement : "-"}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>CEP: </Text>{data.cep}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Bairro: </Text>{data.district}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Cidade: </Text>{data.city}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Estado: </Text>{data.state}</Text>
					</VStack>
					<VStack 
							p="$4" 
							borderRadius={5}
							borderWidth="$1"
							borderColor="$borderDark900"
						>
						<Heading size="lg" mb="$4">05 Contatos</Heading>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Telefone: </Text>{data.phone_number}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Email: </Text>{data.email_address}</Text>
					</VStack>
				</VStack>
				<Button 
					variant="outline"
					size="xl"
					onPress={() => backToStartButton()}>
					<ButtonText>Voltar para o início</ButtonText>
				</Button>
			</ContainerOnboarding>
		</ScrollView>
	);
}
