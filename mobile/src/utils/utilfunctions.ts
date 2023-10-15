import { CommonActions } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";

export const capitalizeFirstLetter = (quote: string) => {
return quote.charAt(0).toUpperCase() + quote.slice(1);
}

export const welcomeGreeting = (genre_identity: string) => {
    if(genre_identity === 'mulher cisgênero' || genre_identity === 'mulher transgênero'){
      return "Bem-vinda"
    } else if(genre_identity === 'não binário' || genre_identity === 'outro'){
      return "Bem-vindx"
    } else {
      return "Bem-vindo"
    }
  }

   export async function signOut(navigation){
    await SecureStore.deleteItemAsync("token");

		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: 'NotLogged' }],
			}),
		);
  }

  export function creditDebit(type: string){
    if(type==="D"){
      return "enviado"
    } else {
      return "recebido"
    }
  }