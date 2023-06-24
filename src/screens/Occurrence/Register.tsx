import { Button, HStack, Text, VStack } from "native-base";
import Header from "../../components/Header";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

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
    formState: { errors },
  } = useForm<FormData>({});
  const [isOpenData, setIsOpenData] = useState(false);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const pickImage = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // No permissions request is necessary for launching the image library
    if(status === 'granted'){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        console.log(result.assets)
      }
    }else{
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
  };

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
                mt="2"
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="titulo"
        />
        <Controller
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
                ml="10"
                mt="6"
                alignSelf="flex-start"
              >
                Descrição
              </Text>
              <CustomInput
                bg="white"
                mt="2"
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="descricao"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
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
                    console.log(getValues("data_selecionada"));
                  }}
                />
              )}
            </>
          )}
          name="data_selecionada"
        />
        <Controller
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
              <CustomButton title="Selecionar foto" w="12" onPress={pickImage}/>
            </>
          )}
          name="fotos"
        />
        <VStack alignItems="center" justifyItems="center" mt="50%">
          <CustomButton title="Salvar" onPress={() => {}} />
        </VStack>
      </VStack>
    </VStack>
  );
}
