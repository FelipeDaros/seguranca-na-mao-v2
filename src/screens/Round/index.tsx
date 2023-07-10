import { Text, VStack, useToast } from "native-base";
import Header from "../../components/Header";
import { useCallback, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Cards } from "./Components/Cards";
import { IRonda } from "../../interfaces/IRonda";
import Loading from "../../components/Loading";
import { api } from "../../config/api";
import { useAuth } from "../../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

export function Round() {
  const [isLoading, setIsLoading] = useState(false);
  const [rondas, setRondas] = useState<IRonda[] | null>([]);
  const { user, signOut } = useAuth();
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      buscarRondas();
    }, [])
  );

  async function buscarRondas() {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/gerar-rondas/${user?.user.id}`);
      setRondas(data);
    } catch (error: any) {
      if (error.response.status === 401) {
        signOut();
        toast.show({
          title: "Você precisa efetuar o login!",
          duration: 3000,
          bg: "error.500",
          placement: "top",
        });
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <Header back />
      <VStack mt="4" justifyItems="center" alignItems="center">
        <Text
          color="personColors.150"
          fontFamily="heading"
          fontSize="2xl"
          mb="4"
        >
          Suas Rondas
        </Text>
        <Text
          textAlign="center"
          color="personColors.150"
          fontFamily="body"
          px="10"
        >
          Aqui você irá ver todas suas rondas ativas para fazer, A cada 1h é
          gerada as rondas, fique de olho!
        </Text>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlashList
          data={rondas}
          renderItem={({ item }) => <Cards item={item} />}
          estimatedItemSize={20}
        />
      )}
    </VStack>
  );
}
