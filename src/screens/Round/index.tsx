import { Text, VStack } from "native-base";
import Header from "../../components/Header";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Cards } from "./Components/Cards";



export function Round(){
  const [isLoading, setIsLoading] = useState(false);
  const rondas = [
    {
      id: 1,
      ponto: 'Pavilhão 02',
      horarioMaximo: new Date()
    },
    {
      id: 2,
      ponto: 'Pavilhão 03',
      horarioMaximo: new Date()
    }
  ]
  return(
    <VStack flex={1}>
      <Header back/>
      <VStack mt="4" justifyItems="center" alignItems="center">
        <Text color="personColors.150" fontFamily="heading" fontSize="2xl" mb="4">Suas Rondas</Text>
        <Text textAlign="center" color="personColors.150" fontFamily="body" px="10">Aqui você irá ver todas suas rondas ativas para fazer, A cada 1h é gerada as rondas, fique de olho!</Text>
      </VStack>
        <FlashList 
          data={rondas}
          renderItem={({item}) => <Cards item={item}/>}
          estimatedItemSize={20}
        />
    </VStack>
  )
}