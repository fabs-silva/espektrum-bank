import { Box, Text } from '@gluestack-ui/themed';
import React from 'react';

export function ShortenedLogo() {
	return (
		<Box
			flexDirection="row">
			<Text
				fontFamily="Jost_700Bold"
				fontSize="$3xl"
				color="$textDark950"
				lineHeight="$3xl">
				E
			</Text>
			<Text
				fontFamily="Jost_300Light"
				fontSize="$3xl"
				color="$textDark950"
				lineHeight="$3xl">
				B
			</Text>
		</Box>
	);
}
