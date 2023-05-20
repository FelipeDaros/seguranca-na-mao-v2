import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import CheckList from "../screens/CheckList";
import Home from "../screens/Home";

export function AuthRoutes() {
  const { Screen, Navigator } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Login" component={Login} />
      <Screen name="CheckList" component={CheckList} />
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
