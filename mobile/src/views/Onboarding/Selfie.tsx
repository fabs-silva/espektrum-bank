import { Center } from '@gluestack-ui/themed';
import React from 'react';
import { Alert, Image } from 'react-native';
import { ContainerOnboarding } from '../../components/ContainerOnboarding';
import { api } from '../../utils/axios';
import { RegisterClientStore } from '../../utils/store';

export function Selfie({ navigation, route }) {

	const  { uri } = route.params;

	const onSubmit = async () => {
      const uploadFormData = new FormData();
      uploadFormData.append("file", {
        name: "image.jpg",
        type: "image/jpg",
        uri,
      } as any);

				api.post("/uploadSelfie", uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(response => {
				 const coverUrl = response.data.fileUrl;

    RegisterClientStore.update((s) => {
			s.selfie_url = coverUrl
    });
    navigation.navigate("CreatePassword");
			}).catch(error => {
				Alert.alert('Erro', 'Não foi possível salvar a imagem');
			});
  };
	
	return (
		<ContainerOnboarding
			step={6}
			stepCount={8}
			title={'6 Selfie'}
			buttonTitle={'Criar senha'}
			onPress={() => onSubmit()}>
			<Center mt="$6">
				<Image
					source={{
						uri: uri
					}}
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
