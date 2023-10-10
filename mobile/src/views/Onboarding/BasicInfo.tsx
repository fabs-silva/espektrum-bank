import {
	CalendarDaysIcon,
	ChevronDownIcon,
	FormControl,
	Icon,
	Input,
	InputField,
	InputIcon,
	InputSlot,
	Select,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
	SelectIcon,
	SelectInput,
	SelectItem,
	SelectPortal,
	SelectTrigger,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { ScrollView } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { InputJsonType } from '../Login/json/loginJson';
import { basicInfoJson, genderIdentityList } from './json/onboardingJson';

export default function BasicInfo() {
	return (
		<ScrollView>
			<ContainerOnboarding
				step={2}
				stepCount={7}
				title={'2 Dados básicos'}
				buttonTitle={'Próximo'}
				onPress={() => null}>
				<Text
					size="md"
					mb="$8">
					* Todos os campos são obrigatórios
				</Text>
				<FormControl
					gap={32}
					mb="$4">
					{basicInfoJson.map((bi: InputJsonType) => {
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
					<VStack
						w="100%"
						gap={10}>
						<Text size="xl">Data de nascimento</Text>
						<Input size="xl">
							<InputField type="text" />
							<InputSlot>
								<InputIcon
									as={CalendarDaysIcon}
									marginRight="$4"
								/>
							</InputSlot>
						</Input>
					</VStack>
					<VStack
						w="100%"
						gap={10}>
						<Text size="xl">Identidade de gênero</Text>
						<Select>
							<SelectTrigger
								variant="outline"
								size="xl">
								<SelectInput placeholder="Selecione uma opção" />
								<SelectIcon mr="$3">
									<Icon as={ChevronDownIcon} />
								</SelectIcon>
							</SelectTrigger>
							<SelectPortal>
								<SelectBackdrop />
								<SelectContent>
									<SelectDragIndicatorWrapper>
										<SelectDragIndicator />
									</SelectDragIndicatorWrapper>
									{genderIdentityList.map((gender) => (
										<SelectItem
											key={gender}
											label={gender}
											value={gender}
										/>
									))}
								</SelectContent>
							</SelectPortal>
						</Select>
					</VStack>
				</FormControl>
			</ContainerOnboarding>
		</ScrollView>
	);
}
