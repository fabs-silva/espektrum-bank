import {
	Button,
	ButtonText,
	Center,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalContent,
	VStack,
} from '@gluestack-ui/themed';
import React, { useRef, useState } from 'react';
import ImageHome from '../../assets/image_home.svg';
import { Logo } from '../../components/Logo';

export function NotLogged({ navigation }) {
	const pressButton = (nextView: string) => {
		navigation.navigate(nextView);
	};

	const [showModal, setShowModal] = useState(false);
	const ref = useRef(null);

	return (
		<Center
			flex={1}
			bgColor="$backgroundDark100"
			p="$10">
			<VStack
				gap={32}
				alignItems="center"
				w="100%">
				<ImageHome
					width={250}
					height={250}
				/>
				<Logo />
				<VStack
					gap={24}
					w="100%">
					<Button
						variant="solid"
						size="xl"
						onPress={() => setShowModal(true)}>
						<ButtonText>Já tenho uma conta</ButtonText>
					</Button>
					<Modal
						isOpen={showModal}
						onClose={() => {
							setShowModal(false);
						}}
						finalFocusRef={ref}>
						<ModalBackdrop />
						<ModalContent>
							<ModalBody>
								<Button
									size="xl"
									mt="$6"
									mb="$6"
									onPress={() => {
										setShowModal(false);
										pressButton('LoginClient');
									}}>
									<ButtonText>Sou cliente</ButtonText>
								</Button>
								<Button
									size="xl"
									mb="$6"
									onPress={() => {
										setShowModal(false);
										pressButton('LoginSupervisor');
									}}>
									<ButtonText>Sou responsável</ButtonText>
								</Button>
							</ModalBody>
						</ModalContent>
					</Modal>
					<Button
						variant="outline"
						size="xl"
						onPress={() => pressButton('CheckCpf')}>
						<ButtonText>Quero abrir uma conta</ButtonText>
					</Button>
				</VStack>
			</VStack>
		</Center>
	);
}
