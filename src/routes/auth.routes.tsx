import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import CheckList from "../screens/CheckList";
import Home from "../screens/Home";
import PointCreate from "../screens/PointCreate";
import { EquipamentCreate } from "../screens/EquipamentCreate";
import PostService from "../screens/PostService";
import Occurrence from "../screens/Occurrence";
import RegisterOccurrence from "../screens/Occurrence/Register";
import { Round } from "../screens/Round";
import { useAuth } from "../contexts/AuthContext";

export function AuthRoutes() {
  const { Screen, Navigator, Group } = createNativeStackNavigator();
  const { usuario } = useAuth();

  return (
    <Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
      initialRouteName="Home"
    >
      {!!usuario && (
        <Group>
          <Screen name="CheckList" component={CheckList} />
          <Screen name="Home" component={Home} />
          <Screen name="PointCreate" component={PointCreate} />
          <Screen name="EquipamentCreate" component={EquipamentCreate} />
          <Screen name="PostService" component={PostService} />
          <Screen name="Occurrence" component={Occurrence} />
          <Screen name="RegisterOccurrence" component={RegisterOccurrence} />
          <Screen name="Round" component={Round} />
        </Group>
      )}
      <Group>{!usuario && <Screen name="Login" component={Login} />}</Group>
    </Navigator>
  );
}
