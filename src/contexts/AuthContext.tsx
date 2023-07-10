import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../config/api";
import { IUsuario } from "../interfaces/IUsuario";

type AuthContextDataProps = {
  user: IUsuario | null;
  checked: boolean;
  signIn(nome: string, senha: string): Promise<void>;
  signOut(): Promise<void>;
};

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("@SEGMAO:user");

      if (storagedUser) {
        const userParsed = JSON.parse(storagedUser);
        api.defaults.headers["Authorization"] = `Bearer ${userParsed.token}`;
        setUser(userParsed);
      }
    }

    loadStoragedData();
  }, []);

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  async function signIn(nome: string, senha: string): Promise<void> {
    try {
      const { data } = await api.post("/auth", {
        nome,
        senha,
      });

      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

      if (data) {
        await AsyncStorage.setItem("@SEGMAO:user", JSON.stringify(data));
        setUser(data);
      }

      return;
    } catch (error) {}
  }

  return (
    <AuthContext.Provider value={{ user, checked: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthContextProvider };
