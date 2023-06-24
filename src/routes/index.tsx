import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
