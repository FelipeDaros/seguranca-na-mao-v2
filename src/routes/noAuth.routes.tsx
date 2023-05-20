import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";

export function AuthRoutes() {
  const { Screen, Navigator } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
