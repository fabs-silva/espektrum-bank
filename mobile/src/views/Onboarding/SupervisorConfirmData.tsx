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

export function SupervisorConfirmData({ route, navigation }) {

	useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

	const backToStartButton = () => {
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: 'SupervisorBasicInfo' }],
			}),
		);
	};

const data = RegisterClientStore.useState(s => s);

const registerAccount = async () => {
		try {
			const register = await api.post('/registerSupervised', {
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
				supervisor_name: data.supervisor_name,
				supervisor_birthday: data.supervisor_birthday,
				supervisor_degree_kinship: data.supervisor_degree_kinship,
				supervisor_genre_identity: data.supervisor_genre_identity,
				supervisor_cpf: data.supervisor_cpf,
				supervisor_identification: data.supervisor_identification,
				supervisor_issuing_body: data.supervisor_issuing_body,
				supervisor_issuing_state: data.supervisor_issuing_state,
				supervisor_email_address: data.supervisor_email_address,
				supervisor_phone_number: data.supervisor_phone_number,
				supervisor_password: data.supervisor_password,
			});

			navigation.navigate('AccountCreated', {
				client: register.data,
			})
		} catch (error) {
			Alert.alert('Erro', 'Não foi possível abrir sua conta.')
		}
	};

	  // const data = {
	// 	"name":"Valmir Amancio Koga",
	// 	"birthday":"1985-06-06T00:48:41.219Z",
	// 	"birth_country":"Brasil",
	// 	"genre_identity":"não binário",
	// 	"cpf":"96361225712",
	// 	"identification":"226520079",
	// 	"issuing_body":"SSP",
	// 	"issuing_state":"São Paulo",
	// 	"street":"Rua Manuel Gaya",
	// 	"number":"256",
	// 	"complement":"Casa 2",
	// 	"district":"Vila Nova Mazzei",
	// 	"city":"São Paulo",
	// 	"state":"São Paulo",
	// 	"cep":"02313000",
	// 	"email_address":"valmiramancio@terra.com.br",
	// 	"phone_number":"11981338178",
	// 	"selfie_url":"17e4faf3-1020-47ec-9b74-e1a8fbd62a57.jpg",
	// 	"account_type":"supervisionada",
	// 	"password":"12345678",
	// 	"supervisor_name":"Ana Cristina Koga",
	// 	"supervisor_birthday":"1960-03-22T00:51:31.704Z",
	// 	"supervisor_degree_kinship":"pai/mãe",
	// 	"supervisor_genre_identity":"mulher cisgênero",
	// 	"supervisor_cpf":"71304637751",
	// 	"supervisor_identification":"452762777",
	// 	"supervisor_issuing_body":"SSP",
	// 	"supervisor_issuing_state":"São Paulo",
	// 	"supervisor_email_address":"anackoga@gmail.com",
	// 	"supervisor_phone_number":"11986276447",
	// 	"supervisor_password":"12345678"
	// }

	return (
		<ScrollView>
			<ContainerOnboarding
				step={4}
				stepCount={4}
				title={'4 Confira os dados do responsável'}
				buttonTitle={'Abrir conta'}
				onPress={() => registerAccount()}>
					<VStack mt="$6" gap={24} mb="$10">
					<VStack 
							p="$4" 
							borderRadius={5}
							borderWidth="$1"
							borderColor="$borderDark900"
						>
						<Heading size="lg" mb="$4">02 Dados básicos</Heading>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Nome: </Text>{data.supervisor_name}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Data de nascimento: </Text>{data.supervisor_birthday.toLocaleDateString()}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Grau de parentesco: </Text>{data.supervisor_degree_kinship}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Telefone de contato: </Text>{data.supervisor_phone_number}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Identidade de gênero: </Text>{capitalizeFirstLetter(data.supervisor_genre_identity.toString())}</Text>
					</VStack>
					<VStack 
							p="$4" 
							borderRadius={5}
							borderWidth="$1"
							borderColor="$borderDark900"
						>
						<Heading size="lg" mb="$4">03 Documentos</Heading>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>CPF: </Text>{data.supervisor_cpf}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Documento de identificação: </Text>{data.supervisor_identification}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Órgão emissor: </Text>{data.supervisor_issuing_body}</Text>
						<Text size="lg" mb="$3"><Text fontFamily='Jost_700Bold'>Estado de emissão: </Text>{data.supervisor_issuing_state}</Text>
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
