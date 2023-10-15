import { Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { ScrollView } from 'react-native';
import { Transaction } from '../../components/Transaction';
import { UserInfoStore } from '../../utils/store';
import { capitalizeFirstLetter, creditDebit } from '../../utils/utilfunctions';

export function Balance({ navigation }) {

  const transactions = UserInfoStore.useState(s => s.transactions);

  return (
    <ScrollView style={{ backgroundColor: '#E5E5E5'}}>
    <VStack flex={1}
			bgColor="$backgroundDark100"
			p="$10">
      <Text size="lg" fontWeight="700" mb="$4">Transações</Text>
      <VStack gap={12}>
        {transactions.length === 0 
        ? (<Text>Não existem transações para esta conta.</Text>)
        : transactions.map(t => (
          <Transaction key={t.id} payer={t.receiver.name} transactionType={capitalizeFirstLetter(t.type) + " " + creditDebit(t.debit_credit)} transactionDate={new Date(t.settled_at)} transactionValue={parseFloat(t.value)} debitCredit={t.debit_credit} />
        ))}
      </VStack>
    </VStack>
    </ScrollView>
  )
}
