import { Center, Icon, Text, VStack } from "native-base";
import CustomInput from "../../components/CustomInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";

export default function Login() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <VStack justifyContent="center" alignItems="center" position="absolute" top={0} mt="30%">
        <Text fontFamily="heading" fontSize="xl" color="personColors.200">
          Bem vindo
        </Text>
        <Text fontFamily="mono" color="personColors.150" mt="4">
          Efetue o login para continuar
        </Text>
      </VStack>
      <VStack mt="10%">
        <CustomInput
          placeholder="informe seu usuário"
          InputLeftElement={
            <Icon
              ml="2"
              size="md"
              as={MaterialCommunityIcons}
              position="absolute"
              color="personColors.150"
              name="account"
            />
          }
          textAlign="center"
          _focus={{ textAlign: "center" }}
          my="6"
        />
        <CustomInput
          placeholder="Insira sua senha"
          InputRightElement={
            <Icon
              ml="2"
              size="md"
              as={MaterialCommunityIcons}
              position="absolute"
              color="personColors.150"
              name="lock-outline"
            />
          }
          textAlign="center"
          _focus={{ textAlign: "center" }}
          my="6"
          secureTextEntry
        />
      </VStack>
      <CustomButton title="Entrar" />
    </VStack>
  );
}
