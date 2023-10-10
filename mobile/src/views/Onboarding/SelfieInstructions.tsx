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
	Heading,
	HelpCircleIcon,
	Icon,
	Link,
	Text,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';

export default function SelfieInstructions() {
	const [showAlertDialog, setShowAlertDialog] = useState(false);
	return (
		<ScrollView>
			<ContainerOnboarding
				step={6}
				stepCount={7}
				title={'6 Selfie'}
				buttonTitle={'Tirar Selfie'}
				onPress={() => null}>
				<Text
					mt="$4"
					mb="$4"
					size="lg">
					Para validar seu cadastro, precisamos que você envie uma selfie, ou
					seja, uma fotografia de você mesmo.
				</Text>
				<Text
					mb="$4"
					size="lg">
					Temos algumas orientações importantes:
				</Text>
				<Text
					mb="$4"
					size="lg">
					▪ Seu rosto deve aparecer por completo na imagem, nítido e na posição
					vertical.
				</Text>
				<Text
					mb="$4"
					size="lg">
					▪ Não faça caretas e nem use acessórios tampando seu rosto.
				</Text>
				<Text
					mb="$4"
					size="lg">
					▪ O fundo da imagem deve ser neutro, de preferência claro. Escolha um
					local com boa iluminação.
				</Text>
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
							Não sabe como deve ser essa selfie? Clique para ver um exemplo.
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
							<Heading size="xl">Exemplo de selfie</Heading>
							<AlertDialogCloseButton>
								<Icon as={CloseIcon} />
							</AlertDialogCloseButton>
						</AlertDialogHeader>
						<AlertDialogBody>
							<Image
								source={require('../../assets/selfie_model.jpg')}
								style={{ width: 260, height: 400 }}
							/>
						</AlertDialogBody>
					</AlertDialogContent>
				</AlertDialog>
			</ContainerOnboarding>
		</ScrollView>
	);
}
