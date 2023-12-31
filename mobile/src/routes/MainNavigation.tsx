import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginClient } from '../views/Login/LoginClient';
import { LoginSupervisor } from '../views/Login/LoginSupervisor';
import { NotLogged } from '../views/Login/NotLogged';
import { AlreadyRegistered } from '../views/NewAccount/AlreadyRegistered';
import { CheckCpf } from '../views/NewAccount/CheckCpf';
import { AccountCreated } from '../views/Onboarding/AccountCreated';
import { AccountType } from '../views/Onboarding/AccountType';
import { BasicInfo } from '../views/Onboarding/BasicInfo';
import { ConfirmData } from '../views/Onboarding/ConfirmData';
import { Contacts } from '../views/Onboarding/Contacts';
import { CreatePassword } from '../views/Onboarding/CreatePassword';
import { Documents } from '../views/Onboarding/Documents';
import { FindCep } from '../views/Onboarding/FindCep';
import { FullAddress } from '../views/Onboarding/FullAddress';
import { OnboardingWelcome } from '../views/Onboarding/OnboardingWelcome';
import { Selfie } from '../views/Onboarding/Selfie';
import { SelfieInstructions } from '../views/Onboarding/SelfieInstructions';
import { SupervisorBasicInfo } from '../views/Onboarding/SupervisorBasicInfo';
import { SupervisorConfirmData } from '../views/Onboarding/SupervisorConfirmData';
import { SupervisorDocuments } from '../views/Onboarding/SupervisorDocuments';
import { SupervisorPassword } from '../views/Onboarding/SupervisorPassword';
import { TakeSelfie } from '../views/Onboarding/TakeSelfie';
import { Balance } from '../views/Transactions/Balance';
import { ConfirmPix } from '../views/Transactions/ConfirmPix';
import { FindPixKeyToSend } from '../views/Transactions/FindPixKeyToSend';
import { Home } from '../views/Transactions/Home';
import { HomeSupervisor } from '../views/Transactions/HomeSupervisor';
import { PixHome } from '../views/Transactions/PixHome';
import { PixKey } from '../views/Transactions/PixKey';
import PixReceipt from '../views/Transactions/PixReceipt';
import { SendPix } from '../views/Transactions/SendPix';

const Stack = createNativeStackNavigator();

export function MainNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#E5E5E5',
					},
					headerTintColor: '#171717',
					headerTitleAlign: 'center',
					headerShadowVisible: false,
					headerTitleStyle: {
						fontFamily: 'Jost_700Bold',
						fontSize: 22,
					},
				}}
				initialRouteName="NotLogged">
				<Stack.Screen
					name="NotLogged"
					component={NotLogged}
					options={{ title: 'Boas vindas' }}
				/>
				<Stack.Screen
					name="LoginClient"
					component={LoginClient}
					options={{ title: 'Login' }}
				/>
				<Stack.Screen
					name="LoginSupervisor"
					component={LoginSupervisor}
					options={{ title: 'Login' }}
				/>
				<Stack.Screen
					name="CheckCpf"
					component={CheckCpf}
					options={{ title: 'Checar CPF' }}
				/>
				<Stack.Screen
					name="OnboardingWelcome"
					component={OnboardingWelcome}
					options={{ title: 'Bem-vindo' }}
				/>
				<Stack.Screen
					name="AlreadyRegistered"
					component={AlreadyRegistered}
					options={{ title: 'CPF já registrado' }}
				/>
				<Stack.Screen
					name="AccountType"
					component={AccountType}
					options={{ title: 'Tipo de conta' }}
				/>
				<Stack.Screen
					name="BasicInfo"
					component={BasicInfo}
					options={{ title: 'Dados básicos' }}
				/>
				<Stack.Screen
					name="Documents"
					component={Documents}
					options={{ title: 'Documentos' }}
				/>
				<Stack.Screen
					name="FindCep"
					component={FindCep}
					options={{ title: 'Endereço' }}
				/>
				<Stack.Screen
					name="FullAddress"
					component={FullAddress}
					options={{ title: 'Endereço' }}
				/>
				<Stack.Screen
					name="Contacts"
					component={Contacts}
					options={{ title: 'Dados de contato' }}
				/>
				<Stack.Screen
					name="SelfieInstructions"
					component={SelfieInstructions}
					options={{ title: 'Selfie' }}
				/>
				<Stack.Screen
					name="TakeSelfie"
					component={TakeSelfie}
					options={{ title: 'Selfie' }}
				/>
				<Stack.Screen
					name="Selfie"
					component={Selfie}
					options={{ title: 'Selfie' }}
				/>
				<Stack.Screen
					name="AccountCreated"
					component={AccountCreated}
					options={{ title: 'Conta criada' }}
				/>
				<Stack.Screen
					name="CreatePassword"
					component={CreatePassword}
					options={{ title: 'Criar senha' }}
				/>
				<Stack.Screen
					name="ConfirmData"
					component={ConfirmData}
					options={{ title: 'Confirmar dados'}}
				/>
				<Stack.Screen
					name="SupervisorBasicInfo"
					component={SupervisorBasicInfo}
					options={{ title: 'Dados do responsável' }}
				/>
				<Stack.Screen
					name="SupervisorDocuments"
					component={SupervisorDocuments}
					options={{ title: 'Documentos do responsável' }}
				/>
				<Stack.Screen
					name="SupervisorPassword"
					component={SupervisorPassword}
					options={{ title: 'Senha do responsável' }}
				/>
				<Stack.Screen
					name="SupervisorConfirmData"
					component={SupervisorConfirmData}
					options={{ title: 'Confirmar dados' }}
				/>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ title: 'Página inicial' }}
				/>
				<Stack.Screen
					name="HomeSupervisor"
					component={HomeSupervisor}
					options={{ title: 'Página inicial' }}
				/>
				<Stack.Screen
					name="PixHome"
					component={PixHome}
					options={{ title: 'PIX' }}
				/>
				<Stack.Screen
					name="Balance"
					component={Balance}
					options={{ title: 'Extrato' }}
				/>
				<Stack.Screen
					name="PixKey"
					component={PixKey}
					options={{ title: 'Cadastrar chave PIX' }}
				/>
				<Stack.Screen
					name="FindPixKeyToSend"
					component={FindPixKeyToSend}
					options={{ title: 'Fazer um PIX' }}
				/>
				<Stack.Screen
					name="SendPix"
					component={SendPix}
					options={{ title: 'Fazer um PIX' }}
				/>
				<Stack.Screen
					name="ConfirmPix"
					component={ConfirmPix}
					options={{ title: 'Fazer um PIX' }}
				/>
				<Stack.Screen
					name="PixReceipt"
					component={PixReceipt}
					options={{ title: 'Comprovante PIX' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
