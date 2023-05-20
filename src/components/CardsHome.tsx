import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  IPressableProps,
  Text,
  Icon,
  Box,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = IPressableProps & {
  name: string;
  route: string;
  iconName: string;
};

export default function CardsHome({ name, route, iconName, ...rest }: Props) {
  const { navigate } = useNavigation();

  function navigateRoute(route: string) {}

  return (
    <Pressable
      {...rest}
      onPress={() => navigateRoute(route)}
      w="20"
      h="32"
      justifyContent="center"
      alignItems="center"
      mx="2"
    >
      <VStack justifyContent="center" alignItems="center">
        <Box
          bg="personColors.100"
          w="16"
          h="16"
          rounded="full"
          justifyContent="center"
          alignItems="center"
        >
          <Icon
            ml="2"
            size={8}
            as={MaterialCommunityIcons}
            position="absolute"
            color="personColors.50"
            name={iconName}
          />
        </Box>
        <Box h="16" alignItems="center">
          <Text color="personColors.200" fontFamily="body" textAlign="center">
            {name}
          </Text>
        </Box>
      </VStack>
    </Pressable>
  );
}
