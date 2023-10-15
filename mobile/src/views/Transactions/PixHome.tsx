import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import PixLogo from '../../assets/pix.svg';
import { Transaction } from '../../components/Transaction';
import { UserInfoStore } from '../../utils/store';
import { capitalizeFirstLetter, creditDebit } from '../../utils/utilfunctions';

export function PixHome({ navigation, route }) {

  const userInfo = UserInfoStore.useState(s => s);

  return (
    <ScrollView style={{ backgroundColor: '#E5E5E5'}}>
    <VStack flex={1}
			bgColor="$backgroundDark100"
			p="$10">
    <HStack justifyContent='space-between'>
      <TouchableOpacity  style={{ width: "47%"}} onPress={() => navigation.navigate('FindPixKeyToSend')}>
      <VStack
        borderRadius={5}
				borderWidth="$1"
				borderColor="$borderDark900"
        gap={8}
        p="$3"
        justifyContent='center'
      >
          <PixLogo width={18} height={18} />
        <Text size="xs" fontWeight="700">Fazer Pix</Text>
      </VStack>
      </TouchableOpacity>
      <TouchableOpacity  style={{ width: "47%"}} onPress={() => navigation.navigate('PixKey')}>
      <VStack
        borderRadius={5}
				borderWidth="$1"
				borderColor="$borderDark900"
        gap={8}
        p="$3"
        justifyContent='center'
      >
        <MaterialCommunityIcons name="key-outline" size={20} />
        <Text size="xs" fontWeight="700">Cadastrar chave</Text>
      </VStack>
      </TouchableOpacity>
    </HStack>
    <VStack mt="$12">
      <Text size="lg" fontWeight="700" mb="$4">Últimas Transações PIX</Text>
      <VStack gap={12}>
         {userInfo.transactions.filter(t => t.type === "pix").length === 0 
          ? (<Text>Não existem transações para esta conta.</Text>)
          :  userInfo.transactions.filter(t => t.type === "pix").map(t => (
          <Transaction key={t.id} payer={t.receiver.name} transactionType={capitalizeFirstLetter(t.type) + " " + creditDebit(t.debit_credit)} transactionDate={new Date(t.settled_at)} transactionValue={parseFloat(t.value)} debitCredit={t.debit_credit} />
        ))}
      </VStack>
    </VStack>
    </VStack>
    </ScrollView>
  )
}
