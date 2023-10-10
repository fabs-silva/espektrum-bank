import {
	Button,
	ButtonText,
	Heading,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import { CommonActions } from '@react-navigation/native';
import { Logo } from '../../components/Logo';

export function AlreadyRegistered({ route, navigation }) {
	const pressButtonLogin = () => {
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: 'LoginClient' }],
			}),
		);
	};

	const { email } = route.params;

	const maskedEmail = (email: string) => {
		const firstLetter = email.slice(0, 1);
		const lettersBeforeAt = email.substring(1, email.indexOf('@'));
		const maskedFirstPart = lettersBeforeAt.replace(lettersBeforeAt, '*******');
		const firstLetterAfterAt = email.substring(
			email.indexOf('@') + 1,
			email.indexOf('@') + 2,
		);
		const lettersAfterAt = email.substring(
			email.indexOf('@') + 2,
			email.length,
		);

		const maskedLettersAfterAt = lettersAfterAt.replace(
			lettersAfterAt,
			'******',
		);

		return (
			firstLetter +
			maskedFirstPart +
			'@' +
			firstLetterAfterAt +
			maskedLettersAfterAt
		);
	};

	return (
		<VStack
			flex={1}
			alignItems="center"
			bgColor="$backgroundDark100"
			p="$10"
			pb="$16">
			<VStack
				gap={32}
				w="100%"
				flex={1}
				justifyContent="space-between">
				<VStack>
					<VStack
						w="100%"
						alignItems="center"
						mb="$12">
						<Logo />
					</VStack>
					<Heading
						lineHeight="$2xl"
						size="2xl"
						mb="$8">
						Você já tem uma conta
					</Heading>
					<Text
						mb="$4"
						size="lg">
						Caso você não lembre seus dados de acesso, clique no botão Recuperar
						meus dados e eles serão enviados para o e-mail{' '}
						<Text
							size="lg"
							fontWeight="bold">
							{maskedEmail(email)}
						</Text>
						.
					</Text>
					<Text
						mb="$8"
						size="lg">
						Não reconhece esse e-mail? Entre em contato conosco via Whatsapp,
						clicando no botão 'Não reconheço o e-mail'.
					</Text>
				</VStack>
				<VStack
					gap={24}
					w="100%">
					<Button
						variant="solid"
						size="xl"
						onPress={() => pressButtonLogin()}>
						<ButtonText>Fazer Login</ButtonText>
					</Button>
					<Button
						variant="outline"
						size="xl"
						onPress={() => null}>
						<ButtonText>Não reconheço o e-mail</ButtonText>
					</Button>
				</VStack>
			</VStack>
		</VStack>
	);
}
