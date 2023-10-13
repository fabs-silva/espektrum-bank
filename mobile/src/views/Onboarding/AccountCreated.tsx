import {
	Button,
	ButtonText,
	Heading,
	Text,
	VStack
} from '@gluestack-ui/themed';
import { CommonActions } from '@react-navigation/native';
import { Logo } from '../../components/Logo';
import { capitalizeFirstLetter } from '../../utils/utilfunctions';

export function AccountCreated({ route, navigation }) {
	const { client } = route.params;

	const pressButtonLogin = () => {
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: 'LoginClient', params: { accountNumber: client.account_number } }],
			}),
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
						Sua conta foi aberta com sucesso
					</Heading>
					<Text
						mb="$8"
						size="lg">
						Estas são as principais informações sobre sua nova conta. Sugerimos
						que você as anote em um local seguro, pois você precisará delas para
						fazer login.
					</Text>
					<VStack 
							p="$4" 
							borderRadius={5}
							borderWidth="$1"
							borderColor="$borderDark900"
						>
						<Text
							size="lg"
							mb="$4">
							<Text
								size="lg"
								fontWeight="$bold">
								Agência:{' '}
							</Text>
							01
						</Text>
						<Text
							size="lg"
							mb="$4">
							<Text
								size="lg"
								fontWeight="$bold">
								Número da Conta:{' '}
							</Text>{' '}
							{client.account.account_number}
						</Text>
						<Text size="lg">
							<Text
								size="lg"
								fontWeight="$bold">
								Tipo de Conta:{' '}
							</Text>{' '}
							{capitalizeFirstLetter(client.account.account_type)}
						</Text>
					</VStack>
				</VStack>
				<Button
					variant="solid"
					size="xl"
					onPress={() => pressButtonLogin()}>
					<ButtonText>Entrar na conta</ButtonText>
				</Button>
			</VStack>
		</VStack>
	);
}
