import { Center, HStack, ScrollView, Text, VStack } from "native-base";
import Header from "../../components/Header";
import CardsHome from "../../components/CardsHome";

export default function Home() {
  return (
    <VStack>
      <Header />
      <VStack alignItems="center" justifyContent="center" mt="32">
        <Text fontFamily="heading" color="personColors.150" mb="4">
          Utilitários
        </Text>
        <HStack>
          <CardsHome
            name="Rondas"
            route="ronda"
            iconName="alert-circle-outline"
          />
          <CardsHome name="Alert" route="alert" iconName="bell-outline" />
          <CardsHome
            name="Panico"
            route="panico"
            iconName="account-alert-outline"
          />
        </HStack>
        <Text fontFamily="heading" color="personColors.150" mb="4" mt="4">
          Cadastros
        </Text>

        <Center>
          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <CardsHome
              name="Cadastrar ponto"
              route="ronda"
              iconName="map-marker-plus-outline"
              pt="2"
            />
            <CardsHome
              name="Cadastrar Equipamento"
              route="alert"
              iconName="plus-minus"
              pt="2"
            />
            <CardsHome
              name="Cadastrar Posto"
              route="panico"
              iconName="warehouse"
              pt="2"
            />
            <CardsHome
              name="Registrar Ocorrência"
              route="panico"
              iconName="pistol"
              pt="2"
            />
          </ScrollView>
        </Center>
      </VStack>
    </VStack>
  );
}
