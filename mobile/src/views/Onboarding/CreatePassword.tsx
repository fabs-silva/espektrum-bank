import {
	Button,
	ButtonText,
	FormControl,
	Heading,
	Input,
	InputField,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import { Logo } from '../../components/Logo';

export function CreatePassword() {
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
						Crie uma senha com 8 números
					</Heading>
					<Text
						mb="$8"
						size="lg">
						Essa senha será utilizada para fazer o login e também para confirmar
						transações.
					</Text>
					<FormControl
						gap={32}
						mb="$4">
						<VStack
							w="100%"
							gap={10}>
							<Text size="xl">Digite a senha</Text>
							<Input size="xl">
								<InputField
									type="password"
									keyboardType="numeric"
									maxLength={8}
								/>
							</Input>
						</VStack>
						<VStack
							w="100%"
							gap={10}>
							<Text size="xl">Confirme a senha</Text>
							<Input size="xl">
								<InputField
									type="password"
									keyboardType="numeric"
									maxLength={8}
								/>
							</Input>
						</VStack>
					</FormControl>
				</VStack>
				<Button
					variant="solid"
					size="xl"
					onPress={() => null}>
					<ButtonText>Salvar senha</ButtonText>
				</Button>
			</VStack>
		</VStack>
	);
}
