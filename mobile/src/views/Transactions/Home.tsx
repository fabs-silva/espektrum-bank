import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HStack, Text, VStack } from '@gluestack-ui/themed';
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import PixLogo from '../../assets/pix.svg';
import { Transaction } from '../../components/Transaction';
import { api } from '../../utils/axios';
import { UserInfoStore } from '../../utils/store';
import { capitalizeFirstLetter, creditDebit, signOut, welcomeGreeting } from '../../utils/utilfunctions';

export function Home({ navigation, route }) {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null
    });
  }, [navigation]);

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

    async function fetchData() {
    const token = await SecureStore.getItemAsync("token");
    const response = await api.get('/userInfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  useEffect(() => {   
    setLoading(true); 
    fetchData().then(response => {
      setUserInfo(response.data.account[0]);
      UserInfoStore.update(s => response.data.account[0]);
    }).catch(error => {
      Alert.alert("Erro", "Não foi possível acessar seus dados.")
    }).finally(() => setLoading(false));

  }, []);

  if(loading) return <Text>Carregando...</Text>

  return (
    <ScrollView style={{ backgroundColor: '#E5E5E5'}}>
    <VStack flex={1}
			bgColor="$backgroundDark100"
			p="$10">
      <HStack justifyContent='space-between' alignItems='center'>
      <Text size="xl">{welcomeGreeting(userInfo.user.genre_identity)}, <Text size="xl" fontFamily="Jost_700Bold">{userInfo.user.name.slice(0, userInfo.user.name.indexOf(" "))}</Text></Text>
      <TouchableOpacity onPress={() => signOut(navigation)}>
      <MaterialCommunityIcons name="exit-to-app" size={26} />
      </TouchableOpacity>
      </HStack>
    <HStack justifyContent='space-between' mt="$12">
      <VStack
        borderRadius={5}
				borderWidth="$1"
				borderColor="$borderDark900"
        gap={8}
        p="$4"
        w="47%"
        justifyContent='center'
      >
        <Text size="xs" fontWeight="700">Saldo</Text>
        <Text size="xl" fontWeight="700">R$ {parseFloat(userInfo.balance).toFixed(2)}</Text>
      </VStack>
      <VStack
        borderRadius={5}
				borderWidth="$1"
				borderColor="$borderDark900"
        gap={8}
         p="$4"
        w="47%"
         justifyContent='center'
      >
        <Text size="xs" fontWeight="700">Lançamentos Futuros</Text>
        <Text size="xl" fontWeight="700">R$ 0.00</Text>
      </VStack>
    </HStack>
    <HStack justifyContent='space-between' mt="$12">
      <TouchableOpacity  style={{ width: "30%"}} onPress={() => navigation.navigate('Balance')}>
      <VStack
        borderRadius={5}
				borderWidth="$1"
				borderColor="$borderDark900"
        gap={8}
        p="$3"
        justifyContent='center'
      >
         <MaterialCommunityIcons name="file-document-outline" size={20} />
        <Text size="xs" fontWeight="700">Extrato</Text>
      </VStack>
      </TouchableOpacity>
      <TouchableOpacity  style={{ width: "30%"}} onPress={() => navigation.navigate('PixHome')}>
      <VStack
        borderRadius={5}
				borderWidth="$1"
				borderColor="$borderDark900"
        gap={8}
        p="$3"
        justifyContent='center'
      >
         <PixLogo width={18} height={18} />
        <Text size="xs" fontWeight="700">Pix</Text>
      </VStack>
      </TouchableOpacity>
      <TouchableOpacity  style={{ width: "30%"}} onPress={() => navigation.navigate('Payment')}>
      <VStack
        borderRadius={5}
				borderWidth="$1"
				borderColor="$borderDark900"
        gap={8}
        p="$3"
        justifyContent='center'
      >
          <MaterialCommunityIcons name="wallet-outline" size={20} />
        <Text size="xs" fontWeight="700">Pagamento</Text>
      </VStack>
      </TouchableOpacity>
    </HStack>
    <VStack mt="$12">
      <Text size="lg" fontWeight="700" mb="$4">Últimas Transações</Text>
      <VStack gap={12}>
         {userInfo.transactions.length === 0 
          ? (<Text>Não existem transações para esta conta.</Text>)
          :  userInfo.transactions.slice(0,4).map(t => (
          <Transaction key={t.id} payer={t.receiver.name} transactionType={capitalizeFirstLetter(t.type) + " " + creditDebit(t.debit_credit)} transactionDate={new Date(t.settled_at)} transactionValue={parseFloat(t.value)} debitCredit={t.debit_credit} />
        ))}
      </VStack>
    </VStack>
    </VStack>
    </ScrollView>
  )
}
