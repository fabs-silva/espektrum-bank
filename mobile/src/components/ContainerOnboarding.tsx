import {
	Box,
	Button,
	ButtonText,
	Heading,
	Progress,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import { ReactNode } from 'react';
import { Logo } from './Logo';

type ContainerOnboardingProps = {
	step: number;
	stepCount: number;
	title: string;
	buttonTitle: string;
	onPress: (params?: any) => void;
	children: ReactNode;
};

export function ContainerOnboarding({
	step,
	stepCount,
	title,
	buttonTitle,
	onPress,
	children,
}: ContainerOnboardingProps) {
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
					<Box
						w="100%"
						alignItems="center"
						mb="$6">
						<Logo />
					</Box>
					<VStack mb="$8">
						<Text
							mb="$2"
							size="lg">
							Passo {step} de {stepCount}
						</Text>
						<Progress
							size="md"
							value={(step / stepCount) * 100}>
							<Progress.FilledTrack />
						</Progress>
					</VStack>
					<Heading
						lineHeight="$xl"
						size="xl"
						mb="$2">
						{title}
					</Heading>
					<VStack
						w="100%"
						justifyContent="space-between">
						{children}
					</VStack>
				</VStack>
				<Box
					gap={24}
					width={'100%'}>
					<Button
						variant="solid"
						size="xl"
						onPress={(params) => onPress(params)}>
						<ButtonText>{buttonTitle}</ButtonText>
					</Button>
				</Box>
			</VStack>
		</VStack>
	);
}
