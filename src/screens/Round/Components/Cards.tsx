import { Box, HStack, Icon, Text, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";



export function Cards(props:any){
  console.log(props)
  return(
    <HStack mt="8" alignItems="center" justifyContent="center" w="3/5" alignSelf="center">
      <Box bg="personColors.100" h="12" w="12" rounded="full" justifyContent="center" alignItems="center">
      <Icon
            size={8}
            as={MaterialCommunityIcons}
            color="personColors.50"
            name="home"
          />
      </Box>
      <VStack ml="4">
        <Text color="personColors.150" fontFamily="heading">{props.item.ponto}</Text>
        <Text color="personColors.150" fontFamily="body">Você tem até {dayjs(props.item.horarioMaximo).format('DD/MM/YYYY HH:mm:ss')} para bater esse ponto</Text>
      </VStack>
    </HStack>
  )
}