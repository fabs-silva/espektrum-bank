import {
	Box,
	Button,
	ButtonText,
	Heading,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import { Logo } from '../../components/Logo';

export function AccountCreated() {
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
					<Box
						borderColor="$borderDark800"
						borderRadius="$lg"
						borderWidth="$1"
						overflow="hidden"
						p="$4">
						<Text
							size="lg"
							mb="$4">
							<Text
								size="lg"
								fontWeight="$bold">
								Agência:{' '}
							</Text>{' '}
							1
						</Text>
						<Text
							size="lg"
							mb="$4">
							<Text
								size="lg"
								fontWeight="$bold">
								Número da Conta:{' '}
							</Text>{' '}
							76235
						</Text>
						<Text size="lg">
							<Text
								size="lg"
								fontWeight="$bold">
								Tipo de Conta:{' '}
							</Text>{' '}
							1 - Independente
						</Text>
					</Box>
				</VStack>
				<Button
					variant="solid"
					size="xl"
					onPress={() => null}>
					<ButtonText>Criar senha</ButtonText>
				</Button>
			</VStack>
		</VStack>
	);
}
