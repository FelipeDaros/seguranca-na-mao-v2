import { Avatar, HStack, Icon, Pressable, Text, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  back?: boolean;
};

export default function Header({ back }: Props) {
  const navigation = useNavigation();

  return (
    <VStack h="24">
      <HStack
        mt="10"
        justifyContent={back ? "space-between" : "flex-end"}
        px="6"
        alignItems="center"
      >
        {back && (
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              ml="2"
              size="lg"
              as={MaterialCommunityIcons}
              color="personColors.150"
              name="arrow-left"
            />
          </Pressable>
        )}
        <HStack alignItems="center">
          <Text color="personColors.150" mr="6" fontFamily="mono">
            Olá Felipe
          </Text>
          <Avatar />
        </HStack>
      </HStack>
    </VStack>
  );
}
