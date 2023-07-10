import { Box, HStack, Icon, Pressable, Text, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IRonda } from "../../../interfaces/IRonda";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Cards(props: any) {
  const navigation = useNavigation();
  const [item, setItem] = useState<IRonda | null>(null);

  useEffect(() => {
    setItem(props.item);
  });

  function handleRound(item: IRonda) {
    navigation.navigate("RoundSelected", item);
  }

  return (
    <TouchableOpacity onPress={() => handleRound(item)}>
      <HStack
        mt="8"
        alignItems="center"
        justifyContent="center"
        w="3/5"
        alignSelf="center"
      >
        <Box
          bg="personColors.100"
          h="12"
          w="12"
          rounded="full"
          justifyContent="center"
          alignItems="center"
        >
          <Icon
            size={8}
            as={MaterialCommunityIcons}
            color="personColors.50"
            name="home"
          />
        </Box>
        <VStack ml="4">
          <Text color="personColors.150" fontFamily="heading">
            {item?.Ponto.nome}
          </Text>
          <Text color="personColors.150" fontFamily="body">
            Você tem até{" "}
            {dayjs(item?.maximo_horario).format("DD/MM/YYYY HH:mm:ss")} para
            bater esse ponto
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
