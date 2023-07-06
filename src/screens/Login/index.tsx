import { Center, Icon, Text, VStack, useToast } from "native-base";
import CustomInput from "../../components/CustomInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
 
export default function Login() {
  const toast = useToast();
  const {signIn} = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      senha: "",
    },
  });

  async function login(form: any) {
    try {
      await signIn(form.nome, form.senha)
      toast.show({
        title: "Login efetuado com sucesso!",
        duration: 3000,
        bg: "green.500",
        placement: "top",
      });
      return;
    } catch (error) {
      toast.show({
        title: "Usuário ou senha incorretos!",
        duration: 3000,
        bg: "error.500",
        placement: "top",
      });
      return;
    }
  }

  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <VStack justifyContent="center" alignItems="center" flex={1}>
        <Text fontFamily="heading" fontSize="2xl" color="personColors.200">
          Bem vindo
        </Text>
        <Text fontFamily="mono" color="personColors.150" mt="4">
          Efetue o login para continuar
        </Text>
      </VStack>
      <VStack>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="informe seu usuário"
              onChangeText={(text) => onChange(text)}
              borderColor={errors.nome && 'error.500'}
              borderWidth={errors.nome && '1'}
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
          )}
          name="nome"
        />
        {errors.nome && <Text color={"error.500"} fontSize={10} mb="2">Campo é obrigatório</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              placeholder="Insira sua senha"
              onChangeText={(text) => onChange(text)}
              borderColor={errors.senha && 'error.500'}
              borderWidth={errors.senha && '1'}
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
          )}
          name="senha"
        />
        {errors.senha && <Text color={"error.500"} fontSize={10} mb="2">Campo é obrigatório</Text>}
      </VStack>
      <VStack
        alignItems="center"
        justifyItems="center"
        position="relative"
        flex={1}
      >
        <CustomButton title="Entrar" onPress={handleSubmit(login)} />
      </VStack>
    </VStack>
  );
}
