import {
	Button,
	ButtonText,
	CalendarDaysIcon,
	FormControl,
	HStack,
	Heading,
	Input,
	InputField,
	InputIcon,
	InputSlot,
	KeyboardAvoidingView,
	Text,
	VStack
} from '@gluestack-ui/themed';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from 'react';
import { Keyboard, Platform, Pressable, ScrollView } from 'react-native';
import { UserInfoStore } from '../../utils/store';

export function SendPix({navigation, route }) {

	 const balance = UserInfoStore.useState(s => s.balance);

  const { pixReceiver } = route.params;
  
  const [pixValue, setPixValue] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const [errors, setErrors] = useState({});

	const toggleDatePicker = () => {
		setShowPicker(!showPicker);
	}

	const onChangePicker = ( { type }, selectedDate) => {
		if (type == "set"){
			const currentDate = selectedDate;
			setDate(currentDate);

			if(Platform.OS === "android"){
				toggleDatePicker();
				setPaymentDate(currentDate);
				
			}
		} else {
			toggleDatePicker();
		}
	}

	const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!pixValue){
			 setErrors(prevState => ({...prevState, pixValue: "Valor é um campo obrigatório."}));
			 isValid = false;
		};

		if(!paymentDate){
			 setErrors(prevState => ({...prevState, paymentDate: "Data de pagamento é um campo obrigatório."}));
			 isValid = false;
		}

		if(isValid){
			onSubmit();
		}
	}

  const onSubmit = async () => {
   navigation.navigate('ConfirmPix', {
    pixReceiver,
    pixValue,
    paymentDate,
    comment,
   })
  }

	return (
    <KeyboardAvoidingView style={{flex: 1}}>
       <ScrollView style={{ backgroundColor: '#E5E5E5'}}>
		<VStack
			flex={1}
			alignItems="center"
			bgColor="$backgroundDark100"
			p="$10"
			pb="$16">
			<VStack
				w="100%"
				flex={1}
				justifyContent="space-between">
          <VStack gap={32}>
					<Heading
						lineHeight="$xl"
						size="xl">
						Fazer um PIX
					</Heading>
        <FormControl
					gap={32}
					mb="$4">
          <VStack
								w="100%"
								gap={10}>
								<Text size="xl">Chave PIX</Text>
								<Input size="xl" isReadOnly={true}>
									<InputField
										type="text"
										value={pixReceiver.pix_key}
									/>
								</Input>
							</VStack>
          <VStack gap={6}>
            <Text size="xl" fontFamily="Jost_700Bold">{pixReceiver.name}</Text>
            <Text size="lg">{pixReceiver.bank}</Text>
          </VStack>
          <VStack gap={32}>
            	<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Valor</Text>
								<Input size="xl" isInvalid={errors.pixValue ? true : false}>
									<InputField
										type="text"
                    keyboardType='numeric'
										onChangeText={setPixValue}
										value={pixValue}
									/>
								</Input>
								{errors.pixValue && (
									<Text size="md" color="$error500">{errors.pixValue}</Text>
								)}
							</VStack>
					<VStack
						w="100%"
						gap={10}>
							<Text size="xl">Data do pagamento</Text>
							{showPicker && (<DateTimePicker 
								mode="date"
								display="spinner"
								value={date}
								onChange={onChangePicker}
								minimumDate={new Date()}
							/>)}
							<Pressable
							onPress={toggleDatePicker}>
						<Input size="xl" isReadOnly={true} isInvalid={errors.paymentDate ? true : false}>
							<InputField 
								type="text"
								onChangeText={setPaymentDate}
								value={paymentDate ? paymentDate.toLocaleDateString() : ""}
							/>
							<InputSlot>
								<InputIcon
									as={CalendarDaysIcon}
									marginRight="$4"
								/>
							</InputSlot>
						</Input>
						</Pressable>
						{errors.paymentDate && (
									<Text size="md" color="$error500">{errors.paymentDate}</Text>
								)}
					</VStack>
							<VStack
								w="100%"
								gap={10}>
								<Text size="xl">Comentário (não obrigatório)</Text>
								<Input size="xl">
									<InputField
										type="text"
										onChangeText={setComment}
										value={comment}
                    maxLength={140}
									/>
								</Input>
								<Text size="md" color="$error500">* Até 140 caracteres.</Text>
							</VStack>
          </VStack>
          <HStack justifyContent='space-between' mb="$6">
            <Text size="lg" fontWeight="700">Saldo em conta</Text>
            <Text size="lg">R$ {parseFloat(balance).toFixed(2)}</Text>
          </HStack>
				</FormControl>
        </VStack>
				<VStack
					width={'100%'}>
					<Button
						variant="solid"
						size="xl"
						onPress={() => validate()}>
						<ButtonText>Próximo</ButtonText>
					</Button>
				</VStack>
			</VStack>
		</VStack>
    </ScrollView>
    </KeyboardAvoidingView>
	);
}
