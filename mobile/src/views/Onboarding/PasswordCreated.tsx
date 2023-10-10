import {
	Button,
	ButtonText,
	Heading,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import { Logo } from '../../components/Logo';

export function PasswordCreated({ navigation }) {
	const pressButtonLogin = () => {
		navigation.reset({
			index: 0,
			actions: [navigation.navigate({ routeName: 'LoginPassword' })],
		});
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
						Sua senha foi criada com sucesso
					</Heading>
					<Text
						mb="$4"
						size="lg">
						Agora você já pode acessar sua conta e realizar transações
						financeiras como PIX e pagamentos.
					</Text>
				</VStack>
				<Button
					variant="solid"
					size="xl"
					onPress={() => pressButtonLogin()}>
					<ButtonText>Acessar conta</ButtonText>
				</Button>
			</VStack>
		</VStack>
	);
}
