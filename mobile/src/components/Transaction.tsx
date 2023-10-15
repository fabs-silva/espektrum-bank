import { HStack, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';

type TransactionProps = {
  payer: string;
  transactionType: string;
  transactionDate: Date;
  transactionValue: number;
  debitCredit: string;
}

export function Transaction({payer, transactionType, transactionDate, transactionValue, debitCredit}: TransactionProps) {
	return (
		<HStack
			alignItems="center"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="$borderDark300"
      pt="$2"
      pb="$2">
			<VStack>
        <Text size="md" fontWeight="700">{payer}</Text>
        <Text size="sm">{transactionType}</Text>
      </VStack>
      <VStack alignItems='flex-end'>
        <Text size="md" fontWeight="700" color={debitCredit === "D" ? "$error800" : "$blue800"}>{debitCredit === "D" ? "-" : ""} R$ {transactionValue.toFixed(2)}</Text>
        <Text size="sm">{transactionDate.toLocaleDateString()}</Text>
      </VStack>
		</HStack>
	);
}
