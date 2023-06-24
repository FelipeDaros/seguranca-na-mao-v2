import { Progress, Text, VStack } from "native-base";
import Header from "../../components/Header";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { api } from "../../config/api";

type FormData = {
  nome: string;
  posto_id: number;
  latitude: number;
  longitude: number;
};

export default function PointCreate() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({});

  const [progress, setProgress] = useState<number>(0);
  const [location, setLocation] = useState(null);

  async function buscarLocalizacao() {
    setProgress(25);
    let { status } = await Location.requestForegroundPermissionsAsync();
    setProgress(50);
    if (status !== "granted") {
      Alert.alert("Não autorizado!");
      return;
    }
    setProgress(75);
    let { coords } = await Location.getCurrentPositionAsync({});
    setValue("latitude", coords.latitude);
    setValue("longitude", coords.longitude);
    setProgress(100);
  }

  async function handleSave(data: any) {
    try {
      await api.post("/ponto", data);
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  const handleSelectItem = (item: any) => {
    setValue("posto_id", item);
  };

  const data = [
    {
      id: 1,
      nome: "teste",
    },
    {
      id: 2,
      nome: "teste",
    },
  ];

  useEffect(() => {
    buscarLocalizacao();
  }, []);

  return (
    <VStack>
      <Header back />
      <VStack alignItems="center" justifyItems="center" mt="4">
        <Text color="personColors.150" fontFamily="mono" fontSize="lg">
          Cadastrar ponto
        </Text>
        <VStack mt="20%">
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text color="personColors.150" fontFamily="body" fontSize="md">
                  Nome
                </Text>
                <CustomInput
                  bg="white"
                  mt="2"
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
            name="nome"
          />

          <Text
            color="personColors.150"
            mt="10%"
            fontFamily="body"
            fontSize="md"
          >
            Posto Vinculado
          </Text>
          <CustomSelect values={data} mt="2" selectItem={handleSelectItem} />
        </VStack>
        <VStack mt="12" alignItems="center">
          <Text fontFamily="mono">Geolocalização</Text>
          <Progress value={progress} mx="4" w="64" mt="4" />
        </VStack>
        <VStack alignItems="center" justifyItems="center" mt="40%">
          <CustomButton title="Salvar" onPress={handleSubmit(handleSave)} />
        </VStack>
      </VStack>
    </VStack>
  );
}
