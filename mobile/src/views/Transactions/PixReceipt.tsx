import { Button, ButtonText, Heading, Text, VStack } from '@gluestack-ui/themed';
import { CommonActions } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import React, { useRef } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { Logo } from '../../components/Logo';
import { UserInfoStore } from '../../utils/store';
import { capitalizeFirstLetter } from '../../utils/utilfunctions';

export default function PixReceipt({ navigation, route }) {
  const { pixReceiver, pixTransaction } = route.params;

   const payerInfo = UserInfoStore.useState(s => { return { user_name: s.user.name, user_cpf: s.user.cpf }});

   const viewToSnapshotRef = useRef();

  async function shareReceipt (){
    const receiptFile = await captureRef(viewToSnapshotRef, {
      format: "jpg",
      quality: 0.8
    });

    console.log(receiptFile);
    
    Sharing.shareAsync(receiptFile);
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
          <View ref={viewToSnapshotRef} collapsable={false}>
          <VStack gap={32}>
            <Logo />
            <Heading
              lineHeight="$xl"
              size="xl">
              Comprovante
            </Heading>
            <VStack gap={6}>
              <Text fontFamily="Jost_700Bold">Código: <Text>{pixTransaction.id}</Text></Text>
              <Text fontFamily="Jost_700Bold">Tipo da transação: <Text>{capitalizeFirstLetter(pixTransaction.type)}</Text></Text>
              <Text fontFamily="Jost_700Bold">Data: <Text>{new Date(pixTransaction.programmed_to).toLocaleDateString()}</Text></Text>
              <Text fontFamily="Jost_700Bold">Valor: <Text>R$ {parseFloat(pixTransaction.value).toFixed(2)}</Text></Text>
            </VStack>
            <VStack gap={6}>
              <Text fontFamily="Jost_700Bold">Nome do pagador: <Text>{payerInfo.user_name}</Text></Text>
              <Text fontFamily="Jost_700Bold">CPF do pagador: <Text>{payerInfo.user_cpf}</Text></Text>
              <Text fontFamily="Jost_700Bold">Instituição do pagador: <Text>Espektrum Bank</Text></Text>
            </VStack>
            <VStack gap={6}>
              <Text fontFamily="Jost_700Bold">Nome do recebedor: <Text>{pixReceiver.name}</Text></Text>
              <Text fontFamily="Jost_700Bold">Chave pix do recebedor: <Text>{pixReceiver.pix_key}</Text></Text>
              <Text fontFamily="Jost_700Bold">Instituição do recebedor: <Text>{pixReceiver.bank}</Text></Text>
            </VStack>
          </VStack>
          </View>
      <VStack
					gap={24}
					w="100%">
					<Button
						variant="solid"
						size="xl"
						onPress={() => shareReceipt()}>
						<ButtonText>Compartilhar comprovante</ButtonText>
					</Button>
					<Button
						variant="outline"
						size="xl"
            onPress={() => navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              }),
            )}
						>
						<ButtonText>Voltar para a Home</ButtonText>
					</Button>
				</VStack>
			</VStack>
		</VStack>
    </KeyboardAvoidingView>
  )
}
