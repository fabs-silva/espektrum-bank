import {
	Button,
	ButtonText,
	FormControl,
	Heading,
	Input,
	InputField,
	KeyboardAvoidingView,
	Text,
	VStack
} from '@gluestack-ui/themed';
import * as SecureStore from "expo-secure-store";
import { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { api } from '../../utils/axios';

export function FindPixKeyToSend({navigation}) {
  
  const [pixKey, setPixKey] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
		Keyboard.dismiss();
		let isValid = true;

		if(!pixKey){
			 setErrors(prevState => ({...prevState, pixKey: "Chave é um campo obrigatório."}));
			 isValid = false;
		};

		if(isValid){
			onSubmit();
		}
	}

  const onSubmit = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const pixReceiverData = await api.post('/pixReceiver', 
        {
          pix_key: pixKey,
        },
        {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    
    navigation.navigate('SendPix', {
      pixReceiver: pixReceiverData.data,
    })
    } catch (error) {
			Alert.alert('Erro', 'Não foi possível encontrar esta chave PIX.');
		}
  }

	return (
    <KeyboardAvoidingView style={{flex: 1}}>
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
								<Input size="xl" isInvalid={errors.pixKey ? true : false}>
									<InputField
										type="text"
										onChangeText={setPixKey}
										value={pixKey}
									/>
								</Input>
								{errors.pixKey && (
									<Text size="md" color="$error500">{errors.pixKey}</Text>
								)}
							</VStack>
				</FormControl>
        </VStack>
				<VStack
					width={'100%'}>
					<Button
						variant="solid"
						size="xl"
						onPress={() => validate()}>
						<ButtonText>Buscar chave</ButtonText>
					</Button>
				</VStack>
			</VStack>
		</VStack>
    </KeyboardAvoidingView>
	);
}
