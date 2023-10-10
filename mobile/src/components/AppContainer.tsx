import { Box } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';

type AppContainerProps = {
	children: ReactNode;
};

export function AppContainer(props: AppContainerProps) {
	return (
		<Box flex={1}>
			{props.children}
			<StatusBar style="auto" />
		</Box>
	);
}
