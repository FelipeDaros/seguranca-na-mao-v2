import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { NoAuthRoutes } from "./noAuth.routes";
import { AuthContextProvider, useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export function Routes() {
  return (
    <Box flex={1} bg="white">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
