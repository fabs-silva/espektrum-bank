import { IBMPlexMono_400Regular } from '@expo-google-fonts/ibm-plex-mono';
import {
	Jost_300Light,
	Jost_400Regular,
	Jost_700Bold,
	useFonts,
} from '@expo-google-fonts/jost';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './gluestack-ui.config';
import { AppContainer } from './src/components/AppContainer';
import { MainNavigation } from './src/routes/MainNavigation';

export default function App() {
	let [fontsLoaded] = useFonts({
		Jost_300Light,
		Jost_400Regular,
		Jost_700Bold,
		IBMPlexMono_400Regular,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GluestackUIProvider config={config.theme}>
			<AppContainer>
				<MainNavigation />
			</AppContainer>
		</GluestackUIProvider>
	);
}
