import { Button, HStack, Text, VStack, useToast } from "native-base";
import Header from "../../components/Header";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useNavigation } from "@react-navigation/native";

type FormData = {
  titulo: string;
  descricao: string;
  data_selecionada: Date;
  fotos: any[];
};

export default function RegisterOccurrence() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    getFieldState,
    formState: { errors },
  } = useForm<FormData>({});
  const toast = useToast();
  const [isOpenData, setIsOpenData] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // No permissions request is necessary for launching the image library
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setValue("fotos", result.assets);
      }
    } else {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
  };

  async function salvarOcorrencia({data_selecionada, descricao, fotos, titulo}: FormData){
    try {
      await api.post('/ocorrencia', {
        descricao,
        titulo,
        usuario_id: 'da88f629-8804-4dd8-9207-807a7a346765',
        dataOcorrencia: data_selecionada
      });
      navigation.goBack();
      toast.show({
        title: "Ocorrência registrada com sucesso!",
        duration: 3000,
        bg: "green.400",
        placement: "top",
      });
      return;
    } catch (error) {
      toast.show({
        title: "Erro ao registrar ocorrência!",
        duration: 3000,
        bg: "error.500",
        placement: "top",
      });
      return;
    }
  }
  
  useEffect(() => {
    if(!getValues('data_selecionada') && !getValues('descricao') && !getValues('titulo')){
      setIsDisabled(true);
    }else{
      setIsDisabled(false);
    }
    console.log(getFieldState('data_selecionada'));
  },[])

  return (
    <VStack flex={1}>
      <Header back />
      <VStack alignItems="center" justifyItems="center" mt="6">
        <Text color="personColors.150" fontFamily="body" fontSize="2xl" mb="10">
          Registrar Ocorrência
        </Text>
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
            minLength: 6
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text
                color="personColors.150"
                fontFamily="body"
                fontSize="md"
                ml="10"
                alignSelf="flex-start"
              >
                Título
              </Text>
              <CustomInput
                bg="white"
                borderColor={errors.titulo && 'error.500'}
                mt="2"
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="titulo"
        />
        {errors.titulo && <Text color={"error.500"} my="2">Campo é obrigatório</Text>}
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
            minLength: 6
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text
                color="personColors.150"
                fontFamily="body"
                fontSize="md"
                ml="10"
                mt="6"
                alignSelf="flex-start"
              >
                Descrição
              </Text>
              <CustomInput
                bg="white"
                borderColor={errors.descricao && 'error.500'}
                mt="2"
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="descricao"
        />
        {errors.descricao && <Text color={"error.500"} my="2">Campo é obrigatório</Text>}
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Button w="60%" mt="6" onPress={() => setIsOpenData(true)}>
                Selecionar data
              </Button>
              {value && (
                <HStack>
                  <Text color="personColors.150">
                    Data selecionada: {value.getDay()}-{value.getMonth()}-
                    {value.getFullYear()}
                  </Text>
                </HStack>
              )}
              {isOpenData && (
                <RNDateTimePicker
                  mode="datetime"
                  value={value ? new Date(value) : new Date()}
                  onChange={(event, selectedDate) => {
                    setIsOpenData(false);
                    if (event?.type === "set" && selectedDate) {
                      onChange(selectedDate);
                    }
                  }}
                />
              )}
            </>
          )}
          name="data_selecionada"
        />
        {errors.data_selecionada && <Text color={"error.500"} my="2">Campo é obrigatório</Text>}
        {/* <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text
                color="personColors.150"
                fontFamily="body"
                fontSize="md"
                mt="6"
                alignSelf="center"
              >
                Adicionar Fotos
              </Text>
              {value?.length && (
                <Text color="personColors.150" fontFamily="body" my="4">
                  Você selecionou {value?.length} fotos
                </Text>
              )}
              <Button onPress={pickImage}>Selecionar foto</Button>
            </>
          )}
          name="fotos"
        /> */}
        
      </VStack>
      <VStack alignItems="center" justifyItems="center" position="relative" flex={1}>
        <CustomButton title="Salvar" isDisabled={isDisabled} onPress={handleSubmit(salvarOcorrencia)} />
      </VStack>
    </VStack>
  );
}
