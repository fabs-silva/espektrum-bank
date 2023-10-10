import { Center } from '@gluestack-ui/themed';
import React from 'react';
import { Image } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';

export default function Selfie() {
	return (
		<ContainerOnboarding
			step={6}
			stepCount={7}
			title={'6 Selfie'}
			buttonTitle={'Tirar Selfie'}
			onPress={() => null}>
			<Center mt="$6">
				<Image
					source={require('../../assets/selfie_model.jpg')}
					style={{
						width: 218,
						height: 335,
						resizeMode: 'cover',
					}}
				/>
			</Center>
		</ContainerOnboarding>
	);
}
