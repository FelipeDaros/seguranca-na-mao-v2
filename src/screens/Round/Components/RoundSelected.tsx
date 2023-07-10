import dayjs from "dayjs";
import { Text, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";
import { BarCodeScanner, BarCodeScannerProps } from "expo-barcode-scanner";
import * as Location from "expo-location";

import { IRonda } from "../../../interfaces/IRonda";
import CustomButton from "../../../components/CustomButton";
import Header from "../../../components/Header";
import { useAuth } from "../../../contexts/AuthContext";
import { api } from "../../../config/api";
import { useNavigation } from "@react-navigation/native";

export function RoundSelected(props: any) {
  const toast = useToast();
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [statusCamera, setStatusCamera] = useState(false);
  const [statusLocation, setStatusLocation] = useState(false);
  const [dadosQrCode, setDadosQrCode] = useState(null);
  const [scanned, setScanned] = useState(false);
  const ronda = props.route.params as IRonda;

  async function handleVerificar() {
    setLoading(true);
    let { coords } = await Location.getCurrentPositionAsync();
    const latitidadeMenos = Number(coords.latitude) * 0.996;
    const latitidadeMais = Number(coords.latitude) * 1.002;

    try {
      if (
        Number(ronda.Ponto.latitude) >= latitidadeMenos &&
        Number(ronda.Ponto.latitude) <= latitidadeMais &&
        String(dadosQrCode).toUpperCase() ===
          String(ronda.Ponto.nome).toUpperCase()
      ) {
        await api.post(`/gerar-rondas/verificar-ronda-selecionada/${ronda.id}`);
        toast.show({
          title: "Ponto verificado!",
          duration: 3000,
          bg: "success.500",
          placement: "top",
        });
        navigation.goBack();
      } else {
        toast.show({
          title: "Você não está no local correto!",
          duration: 3000,
          bg: "error.500",
          placement: "top",
        });
      }
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
      setLoading(false);
    }
  }

  async function handlePermissions() {
    setLoading(true);
    const barCode = await BarCodeScanner.requestPermissionsAsync();
    setStatusCamera(barCode.granted);

    const location = await Location.requestForegroundPermissionsAsync();
    setStatusLocation(location.granted);
    setLoading(false);
  }

  const handleBarCodeScanned = ({ type, data, cornerPoints }) => {
    setScanned(true);
    setDadosQrCode(data);
  };

  useEffect(() => {
    handlePermissions();
  }, []);

  return (
    <VStack flex={1}>
      <Header back />
      <VStack alignItems="center" justifyContent="center">
        <VStack w="3/4" alignItems="center">
          <Text color="personColors.150">
            Nome do ponto: {ronda.Ponto.nome}
          </Text>
          <Text color="personColors.150">
            Você tem até:{" "}
            {dayjs(ronda.maximo_horario).format("DD/MM/YYYY HH:mm")} para bater
            esse ponto, após isso será gerado uma informação de atraso
          </Text>
        </VStack>
        {statusCamera && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ width: 300, height: 300, marginTop: 50 }}
          />
        )}
      </VStack>
      {scanned && (
        <CustomButton
          title="Enviar dados"
          onPress={handleVerificar}
          isLoading={loading}
          alignSelf="center"
        />
      )}
    </VStack>
  );
}
