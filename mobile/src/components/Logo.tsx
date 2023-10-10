import { Box, Text } from '@gluestack-ui/themed';
import React from 'react';

export function Logo() {
	return (
		<Box
			flexDirection="row"
			alignItems="center">
			<Text
				fontFamily="Jost_700Bold"
				fontSize="$4xl"
				color="$textDark950"
				lineHeight="$3xl">
				ESPEKTRUM
			</Text>
			<Text
				fontFamily="Jost_300Light"
				fontSize="$4xl"
				color="$textDark950"
				lineHeight="$3xl">
				BANK
			</Text>
		</Box>
	);
}
