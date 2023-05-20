import { Box, Checkbox, HStack, Text, VStack } from "native-base";
import CustomButton from "../../components/CustomButton";

export default function CheckList() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Text color="personColors.150" fontFamily="mono" mb="2">
        Equipamentos da ronda passada
      </Text>
      <Box
        bg="personColors.100"
        w="64"
        h="40"
        justifyContent="center"
        alignItems="center"
        rounded="md"
        shadow={1}
      >
        <Text>Teste</Text>
      </Box>
      <Text color="personColors.150" fontFamily="mono" mt="10" mb="2">
        Selecionar seus equipamentos
      </Text>
      <Box
        bg="personColors.100"
        w="64"
        h="40"
        justifyContent="center"
        alignItems="center"
        rounded="md"
        shadow={1}
      >
        <HStack alignItems="center">
          <Checkbox value="" aria-label="check" mt="2" rounded="full" />
          <Text mt="2" mx="2">
            Mochila
          </Text>
        </HStack>
      </Box>
      <Text
        color="personColors.150"
        w="64"
        textAlign="center"
        fontFamily="mono"
        mt="10"
      >
        Confirmar a leitura dos equipamentos da ronda passada
      </Text>
      <Checkbox value="" aria-label="check" mt="2" rounded="full" />
      <CustomButton title="Proseguir" />
    </VStack>
  );
}
