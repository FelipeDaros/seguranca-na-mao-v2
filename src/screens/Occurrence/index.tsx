import { Button, FlatList, Text, VStack, useToast } from "native-base";
import Header from "../../components/Header";
import CardsOccurrence from "./Components/CardsOccurrence";
import { api } from "../../config/api";
import { useCallback, useEffect, useState } from "react";
import { IOcorrenciaProps } from "./Interfaces/IOcorrence";
import ModalOccurrenceSelect from "./Components/ModalOccurrenceSelect";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { UserType } from "../../contexts/UserType";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Occurrence() {
  const navigation = useNavigation();
  const [ocorrencias, setOcorrencias] = useState<IOcorrenciaProps[]>([]);
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const { usuario } = useAuth();
  const toast = useToast();

  async function buscarOccorrencias() {
    try {
      const user: UserType = JSON.parse(usuario);
      const { data } = await api.get("/ocorrencia", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOcorrencias(data);
    } catch (error: any) {
      if (error.response.status === 401) {
        await AsyncStorage.removeItem("usuario");
        navigation.navigate("Login");
      }
      
      toast.show({
        title: "Erro ao listar!",
        duration: 3000,
        bg: "error.500",
        placement: "top",
      });
    }
  }

  function handleNavigateRegistroOcorrencia() {
    navigation.navigate("RegisterOccurrence");
  }

  useFocusEffect(
    useCallback(() => {
      buscarOccorrencias();
    }, [])
  );

  return (
    <VStack flex={1}>
      <Header back />
      <VStack alignItems="center" justifyItems="center" mt="4">
        <Text fontFamily="mono" color="personColors.150" fontSize="lg">
          Ocorrências
        </Text>
        <Button
          variant="outline"
          onPress={handleNavigateRegistroOcorrencia}
          borderColor="personColors.50"
          w="80%"
          mt="8"
        >
          <Text color="personColors.50" fontFamily="heading">
            Registrar Ocorrência
          </Text>
        </Button>
        <FlatList
          mt="4"
          showsVerticalScrollIndicator={false}
          height="3/5"
          data={ocorrencias}
          keyExtractor={(item, index) => item.id as any}
          renderItem={({ item }) => (
            <CardsOccurrence
              ocorrenciaProps={item}
              selecionarOcorrencia={setOcorrenciaSelecionada}
              setIsOpen={() => setIsOpen(true)}
            />
          )}
        />
      </VStack>
      <ModalOccurrenceSelect
        id={ocorrenciaSelecionada}
        open={isOpen}
        setIsClose={() => setIsOpen(false)}
      />
    </VStack>
  );
}
