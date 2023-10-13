import {
	Alert,
	AlertDialog,
	AlertDialogBackdrop,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogHeader,
	AlertIcon,
	AlertText,
	CloseIcon,
	FormControl,
	Heading,
	HelpCircleIcon,
	Icon,
	Input,
	InputField,
	Link,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { RegisterClientStore } from '../../utils/store';

export function SupervisorDocuments({ navigation }) {
	const [showAlertDialog, setShowAlertDialog] = useState(false);
	const [cpf, setCpf] = useState("");
	const [identification, setIdentification] = useState("");
	const [issuingBody, setIssuingBody] = useState("");
	const [issuingState, setIssuingState] = useState("");

	const [errors, setErrors] = useState({});

	useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!cpf){
			 setErrors(prevState => ({...prevState, cpf: "CPF é um campo obrigatório."}));
			 isValid = false;
		};

		if(!identification){
			 setErrors(prevState => ({...prevState, identification: "Documento de identificação é um campo obrigatório."}));
			 isValid = false;
		} 

		if(!issuingBody){
			 setErrors(prevState => ({...prevState, issuingBody: "Órgão emissor é um campo obrigatório."}));
			 isValid = false;
		};

		if(!issuingState){
			 setErrors(prevState => ({...prevState, issuingState: "Estado de emissão é um campo obrigatório."}));
			 isValid = false;
		};

		if(isValid){
			onSubmit();
		}
	}

	 const onSubmit = () => {
    RegisterClientStore.update((s) => {
			s.supervisor_cpf = cpf;
			s.supervisor_identification = identification;
			s.supervisor_issuing_body = issuingBody;
			s.supervisor_issuing_state = issuingState;
    });
    navigation.navigate("SupervisorPassword");
  };

	return (
		<ScrollView>
			<ContainerOnboarding
				step={2}
				stepCount={3}
				title={'2 Documentos - responsável'}
				buttonTitle={'Próximo'}
				onPress={() => validate()}>
				<Text
					size="md"
					mb="$6">
					* Todos os campos são obrigatórios
				</Text>
				<FormControl
					gap={32}
					mb="$4">
						<VStack
								w="100%"
								gap={10}>
								<Text size="xl">CPF</Text>
								<Input size="xl" isInvalid={errors.cpf ? true : false}>
									<InputField
										type="text"
										onChangeText={setCpf}
										value={cpf}
										maxLength={11}
									/>
								</Input>
								{errors.cpf && (
									<Text size="md" color="$error500">{errors.cpf}</Text>
								)}
							</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Documento de Identificação</Text>
								<Input size="xl" isInvalid={errors.identification ? true : false}>
									<InputField
										type="text"
										onChangeText={setIdentification}
										value={identification}
									/>
								</Input>
								{errors.identification && (
									<Text size="md" color="$error500">{errors.identification}</Text>
								)}
							</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Órgão emissor</Text>
								<Input size="xl" isInvalid={errors.issuingBody ? true : false}>
									<InputField
										type="text"
										onChangeText={setIssuingBody}
										value={issuingBody}
									/>
								</Input>
								{errors.issuingBody && (
									<Text size="md" color="$error500">{errors.issuingBody}</Text>
								)}
							</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Estado de emissão</Text>
								<Input size="xl" isInvalid={errors.issuingState ? true : false}>
									<InputField
										type="text"
										onChangeText={setIssuingState}
										value={issuingState}
									/>
								</Input>
								{errors.issuingState && (
									<Text size="md" color="$error500">{errors.issuingState}</Text>
								)}
							</VStack>				
				</FormControl>
				<Link onPress={() => setShowAlertDialog(true)}>
					<Alert
						mt="$6"
						mb="$2"
						action="muted"
						variant="outline"
						backgroundColor="$backgroundDark100">
						<AlertIcon
							as={HelpCircleIcon}
							mr="$3"
						/>
						<AlertText size="lg">
							Dúvidas sobre algum dos campos? Clique para saber mais sobre eles.
						</AlertText>
					</Alert>
				</Link>
				<AlertDialog
					isOpen={showAlertDialog}
					onClose={() => {
						setShowAlertDialog(false);
					}}>
					<AlertDialogBackdrop />
					<AlertDialogContent p="$2">
						<AlertDialogHeader>
							<Heading size="xl">Documentos</Heading>
							<AlertDialogCloseButton>
								<Icon as={CloseIcon} />
							</AlertDialogCloseButton>
						</AlertDialogHeader>
						<AlertDialogBody>
							<Text
								size="lg"
								mb="$4">
								<Text
									fontWeight="bold"
									size="lg">
									Documento de identificação:
								</Text>{' '}
								serão considerados documentos oficiais de identificação:
								Carteira de Identidade, Carteira Nacional de Habilitação,
								Carteira de Trabalho, Carteira Profissional, Carteira de
								Identificação Funcional, Registro Nacional de Estrangeiro e
								Passaporte.
							</Text>
							<Text
								size="lg"
								mb="$4">
								<Text
									fontWeight="bold"
									size="lg">
									Órgão emissor:
								</Text>{' '}
								órgão público brasileiro que emitiu tal documento.
							</Text>
							<Text size="lg">
								<Text
									fontWeight="bold"
									size="lg">
									Estado de emissão:
								</Text>{' '}
								estado onde o documento foi emitido.
							</Text>
						</AlertDialogBody>
					</AlertDialogContent>
				</AlertDialog>
			</ContainerOnboarding>
		</ScrollView>
	);
}
