import { Avatar, HStack, Icon, Text, VStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  back?: boolean;
};

export default function Header({ back }: Props) {
  return (
    <VStack h="24">
      <HStack
        mt="10"
        justifyContent={back ? "space-between" : "flex-end"}
        px="6"
        alignItems="center"
      >
        {back && (
          <Icon
            ml="2"
            size="lg"
            as={MaterialCommunityIcons}
            color="personColors.150"
            name="arrow-left"
          />
        )}
        <HStack alignItems="center">
          <Text color="personColors.150" mr="6"fontFamily="mono">
            Olá Felipe
          </Text>
          <Avatar />
        </HStack>
      </HStack>
    </VStack>
  );
}
