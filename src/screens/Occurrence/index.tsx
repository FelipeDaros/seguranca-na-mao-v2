import { Button, FlatList, Text, VStack } from "native-base";
import Header from "../../components/Header";
import CardsOccurrence from "./Components/CardsOccurrence";
import { api } from "../../config/api";
import { useEffect, useState } from "react";
import { IOcorrenciaProps } from "./Interfaces/IOcorrence";
import ModalOccurrenceSelect from "./Components/ModalOccurrenceSelect";
import { useNavigation } from "@react-navigation/native";

export default function Occurrence() {
  const navigation = useNavigation();
  const [ocorrencias, setOcorrencias] = useState<IOcorrenciaProps[]>([]);
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);

  async function buscarOccorrencias() {
    const { data } = await api.get("/ocorrencia");
    setOcorrencias(data);
  }

  function handleNavigateRegistroOcorrencia(){
    navigation.navigate('RegisterOccurrence');
  }

  useEffect(() => {
    buscarOccorrencias();
  }, []);

  return (
    <VStack flex={1}>
      <Header back />
      <VStack alignItems="center" justifyItems="center" mt="4">
        <Text fontFamily="mono" color="personColors.150" fontSize="lg">
          Ocorrências
        </Text>
        <Button variant="outline" onPress={handleNavigateRegistroOcorrencia} borderColor="personColors.50" w="80%" mt="8">
          <Text color="personColors.50" fontFamily="heading">
            Registrar Ocorrência
          </Text>
        </Button>
        <FlatList
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
