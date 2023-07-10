import {
  Button,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import Header from "../../components/Header";
import CardsHome from "../../components/CardsHome";
import { api } from "../../config/api";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function panico() {
    setLoading(true);
    try {
      await api.post("/panico", {
        usuario_id: "da88f629-8804-4dd8-9207-807a7a346765",
        verificado: false,
      });
      toast.show({
        title: "Pânico emitido com sucesso!",
        duration: 3000,
        bg: "success.500",
        placement: "top",
      });
    } catch (error) {
      toast.show({
        title: "Erro ao emitir o alerta!",
        duration: 3000,
        bg: "error.500",
        placement: "top",
      });
    } finally {
      setLoading(false);
    }
  }

  async function alert() {}

  return (
    <VStack>
      <Header />
      <VStack alignItems="center" justifyContent="center" mt="32">
        <Text
          fontFamily="heading"
          fontSize="lg"
          color="personColors.150"
          mb="4"
        >
          Utilitários
        </Text>
        <HStack>
          <CardsHome
            name="Rondas"
            route="Round"
            iconName="alert-circle-outline"
          />
          <CardsHome name="Alert" route="alert" iconName="bell-outline" />
          <CardsHome
            name="Panico"
            iconName="account-alert-outline"
            onLongPress={panico}
          />
        </HStack>
        <Text
          fontFamily="heading"
          fontSize="lg"
          color="personColors.150"
          mb="4"
          mt="4"
        >
          Cadastros
        </Text>
        <Center>
          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {user?.user.isAdmin && (
              <>
                <CardsHome
                  name="Cadastrar ponto"
                  route="PointCreate"
                  iconName="map-marker-plus-outline"
                  pt="2"
                />
                <CardsHome
                  name="Cadastrar Equipamento"
                  route="EquipamentCreate"
                  iconName="plus-minus"
                  pt="2"
                />
                <CardsHome
                  name="Cadastrar Posto"
                  route="PostService"
                  iconName="warehouse"
                  pt="2"
                />
              </>
            )}
            <CardsHome
              name="Ocorrências"
              route="Occurrence"
              iconName="pistol"
              pt="2"
            />
          </ScrollView>
        </Center>
      </VStack>
    </VStack>
  );
}
