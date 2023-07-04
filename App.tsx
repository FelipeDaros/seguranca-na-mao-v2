import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { NativeBaseProvider } from "native-base";
import Loading from "./src/components/Loading";
import { Routes } from "./src/routes";
import { THEME } from "./src/styles/theme";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });
  
  useEffect(() => {
    buscarUsuario();
  }, [])

  async function buscarUsuario(){
    const user = await AsyncStorage.getItem('usuario');
    setUser(user);
    return 
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider usuario={user}>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
