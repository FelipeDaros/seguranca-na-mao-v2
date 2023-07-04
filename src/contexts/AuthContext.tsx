import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "./UserType";

type AuthContextDataProps = {
  usuario: UserType;
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextDataProps);

function AuthContextProvider({ children }: AuthContextDataProps) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function isLogado() {
      const user = await AsyncStorage.getItem("usuario");
      setUsuario(user);
    }

    isLogado();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthContextProvider };
