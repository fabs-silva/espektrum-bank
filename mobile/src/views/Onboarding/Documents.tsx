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
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { InputJsonType } from '../Login/json/loginJson';
import { documentsJson } from './json/onboardingJson';

export default function Documents() {
	const [showAlertDialog, setShowAlertDialog] = useState(false);
	return (
		<ScrollView>
			<ContainerOnboarding
				step={3}
				stepCount={7}
				title={'3 Documentos'}
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
					{documentsJson.map((bi: InputJsonType) => {
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
