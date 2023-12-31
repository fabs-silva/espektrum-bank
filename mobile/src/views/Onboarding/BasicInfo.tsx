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
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useLayoutEffect, useState } from 'react';
import { Keyboard, Platform, Pressable, ScrollView } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { RegisterClientStore } from '../../utils/store';
import { genderIdentityList } from './json/onboardingJson';

export function BasicInfo({ navigation }) {

	const [name, setName] = useState("");
	const [birthday, setBirthday] = useState("");
	const [birthCountry, setBirthCountry] = useState("");
	const [genreIdentity, setGenreIdentity] = useState("");

	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const [errors, setErrors] = useState({});

	const toggleDatePicker = () => {
		setShowPicker(!showPicker);
	}
		
	const getAge = (bday) => {
		const today = new Date();
    let age = today.getFullYear() - bday.getFullYear();
    const m = today.getMonth() - bday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
        age--;
    }
    return age;
	}

	const onChangePicker = ( { type }, selectedDate) => {
		if (type == "set"){
			const currentDate = selectedDate;
			setDate(currentDate);

			if(Platform.OS === "android"){
				toggleDatePicker();
				setBirthday(currentDate);
				
			}
		} else {
			toggleDatePicker();
		}
	}

	useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!name){
			 setErrors(prevState => ({...prevState, name: "Nome completo é um campo obrigatório."}));
			 isValid = false;
		};

		if(!birthday){
			 setErrors(prevState => ({...prevState, birthday: "Data de nascimento é um campo obrigatório."}));
			 isValid = false;
		} else if(getAge(birthday) < 18) {
			setErrors(prevState => ({...prevState, birthday: "Você não pode abrir uma conta tendo menos de 18 anos."}));
			 isValid = false;
		};

		if(!birthCountry){
			 setErrors(prevState => ({...prevState, birthCountry: "País de nascimento é um campo obrigatório."}));
			 isValid = false;
		};

		if(!genreIdentity){
			 setErrors(prevState => ({...prevState, genreIdentity: "Identidade de gênero é um campo obrigatório."}));
			 isValid = false;
		};

		if(isValid){
			onSubmit();
		}
	}

	 const onSubmit = () => {
    RegisterClientStore.update((s) => {
			s.name = name;
			s.birthday = new Date(birthday);
			s.birth_country = birthCountry;
			s.genre_identity = genreIdentity.toLowerCase();
    });
    navigation.navigate("Documents");
  };

	return (
		<ScrollView>
			<ContainerOnboarding
				step={2}
				stepCount={8}
				title={'2 Dados básicos'}
				buttonTitle={'Próximo'}
				onPress={() => validate()}>
				<Text
					size="md"
					mb="$8">
					* Todos os campos são obrigatórios
				</Text>
				<FormControl
					gap={32}
					mb="$4">
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Nome Completo</Text>
								<Input size="xl" isInvalid={errors.name ? true : false}>
									<InputField
										type="text"
										onChangeText={setName}
										value={name}
									/>
								</Input>
								{errors.name && (
									<Text size="md" color="$error500">{errors.name}</Text>
								)}
							</VStack>
					<VStack
						w="100%"
						gap={10}>
							<Text size="xl">Data de nascimento</Text>
							{showPicker && (<DateTimePicker 
								mode="date"
								display="spinner"
								value={date}
								onChange={onChangePicker}
								maximumDate={new Date()}
							/>)}
							<Pressable
							onPress={toggleDatePicker}>
						<Input size="xl" isReadOnly={true} isInvalid={errors.birthday ? true : false}>
							<InputField 
								type="text"
								onChangeText={setBirthday}
								value={birthday ? birthday.toLocaleDateString() : ""}
							/>
							<InputSlot>
								<InputIcon
									as={CalendarDaysIcon}
									marginRight="$4"
								/>
							</InputSlot>
						</Input>
						</Pressable>
						{errors.birthday && (
									<Text size="md" color="$error500">{errors.birthday}</Text>
								)}
					</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">País de nascimento</Text>
								<Input size="xl" isInvalid={errors.birthCountry ? true : false}>
									<InputField
										type="text"
										onChangeText={setBirthCountry}
										value={birthCountry}
									/>
								</Input>
								{errors.birthCountry && (
									<Text size="md" color="$error500">{errors.birthCountry}</Text>
								)}
							</VStack>
					<VStack
						w="100%"
						gap={10}>
						<Text size="xl">Identidade de gênero</Text>
						<Select
							onValueChange={setGenreIdentity}
							isInvalid={errors.genreIdentity ? true : false}>
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
						{errors.genreIdentity && (
									<Text size="md" color="$error500">{errors.genreIdentity}</Text>
								)}
					</VStack>
				</FormControl>
			</ContainerOnboarding>
		</ScrollView>
	);
}
