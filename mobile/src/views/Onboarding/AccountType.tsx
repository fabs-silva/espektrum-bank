import {
	AlertDialog,
	AlertDialogBackdrop,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogHeader,
	Button,
	ButtonText,
	CloseIcon,
	HStack,
	Heading,
	Icon,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { accountTypeJson, accountTypeJsonType } from './json/onboardingJson';

export default function AccountType() {
	const [showAlertDialog, setShowAlertDialog] = useState(false);
	const [accountType, setAccountType] = useState('');

	return (
		<ContainerOnboarding
			step={1}
			stepCount={7}
			title={'1 Tipo de Conta'}
			buttonTitle={'Próximo'}
			onPress={() => null}>
			<VStack
				gap={32}
				mt="$6">
				{accountTypeJson.map((at: accountTypeJsonType) => {
					const onSelectAccount = () => {
						setAccountType(at.title.toLowerCase());
						if (at.title === 'Supervisionado') {
							setShowAlertDialog(true);
						}
					};
					return (
						<TouchableOpacity
							activeOpacity={0.5}
							key={at.id}
							onPress={() => onSelectAccount()}>
							<HStack
								justifyContent="space-between"
								borderRadius={5}
								borderWidth="$1"
								borderColor="$borderDark900"
								gap={12}
								p="$4">
								{at.image}
								<VStack
									gap={12}
									w="65%">
									<Heading size="lg">{at.title}</Heading>
									<Text size="lg">{at.description}</Text>
								</VStack>
							</HStack>
						</TouchableOpacity>
					);
				})}
				<AlertDialog
					isOpen={showAlertDialog}
					onClose={() => {
						setShowAlertDialog(false);
					}}>
					<AlertDialogBackdrop />
					<AlertDialogContent p="$2">
						<AlertDialogHeader>
							<Heading size="xl">Atenção!</Heading>
							<AlertDialogCloseButton>
								<Icon as={CloseIcon} />
							</AlertDialogCloseButton>
						</AlertDialogHeader>
						<AlertDialogBody>
							<Text
								size="lg"
								mb="$8">
								Selecionando o tipo de conta supervisionada, você deve preencher
								primeiro todos os dados do titular da conta (ou seja, quem vai
								utilizá-la). Depois, você preencherá os dados do responsável,
								que é aquele que aprovará as transações antes que elas sejam
								realmente realizadas.
							</Text>
							<Button
								variant="solid"
								size="lg"
								mb="$2"
								onPress={() => {
									setShowAlertDialog(false);
								}}>
								<ButtonText>Ok, entendi</ButtonText>
							</Button>
						</AlertDialogBody>
					</AlertDialogContent>
				</AlertDialog>
			</VStack>
		</ContainerOnboarding>
	);
}
