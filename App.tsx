import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_900Black
} from "@expo-google-fonts/inter";
import { NativeBaseProvider } from "native-base";
import Loading from "./src/components/Loading";
import { Routes } from "./src/routes";
import { THEME } from "./src/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
