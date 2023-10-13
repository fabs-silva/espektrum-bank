import {
  Button,
  ButtonText,
  VStack
} from '@gluestack-ui/themed';
import { Camera, CameraType } from 'expo-camera';
import React, { useRef } from 'react';
import { Alert } from 'react-native';

export function TakeSelfie({navigation}) {
  const cameraRef = useRef<Camera>(null);

  const [permission, requestPermission] = Camera.useCameraPermissions();

    if(!permission){
      return (<VStack />)
    }

    if(!permission.granted){
      return (Alert.alert("", "Você precisa autorizar o uso da câmera para tirar a selfie.", [
        {
          text: 'Autorizar',
          onPress: () => requestPermission()
        },
        {
          text: 'Voltar',
          onPress: () => navigation.navigate('SelfieInstructions')
        },
      ]))
    }

  const handleSelfie = async () => {
    if(cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          quality: 0.6,
        });
        navigation.navigate('Selfie', {
          uri: data.uri,
        })
      } catch(error){
        Alert.alert("Erro", "Não foi possível tirar a selfie.");
      }
    }
  }

	return (
		<VStack flex={1}>
      <Camera ref={cameraRef} type={CameraType.front} style={{ flex: 1 }}>
      <Button
						variant="solid"
						size="xl"
						onPress={() => handleSelfie()}
            m="$8"
            alignSelf="center"
            style={{ position: 'absolute', bottom: 50 }}>
						<ButtonText>Tirar Selfie</ButtonText>
					</Button>
          </Camera>
    </VStack>
	);
}
