import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Home from "../../screens/Home";
import Tip from "../../screens/Tip";
import News from "../../screens/News";
import KidsInRio from "../../screens/KidsInRio";
import EcoTurismo from "../../screens/EcoTurismo";
import { FontsContext } from "../../contexts/FontsContext";

const Stack = createNativeStackNavigator();

export default function StackHomeRoutes({ navigation, route }) {
  const { onLayout } = useContext(FontsContext);

  // to hide tab bar on specific stack screens
  useLayoutEffect(() => {
    const tabHiddenRoutes = ["selected-tip", "news", "ecoturismo", "kidsinrio"];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={screenAnimation} >
        {() => <Home onLayout={() => onLayout()} />}
      </Stack.Screen>
      <Stack.Screen name="selected-tip" component={Tip} options={screenAnimation} />
      <Stack.Screen name="news" component={News} options={screenAnimation} />
      <Stack.Screen name="ecoturismo" component={EcoTurismo} options={screenAnimation} />
      <Stack.Screen name="kidsinrio" component={KidsInRio} options={screenAnimation} />
    </Stack.Navigator>
  );
}

const screenAnimation = {
  animation: "slide_from_left",
  animationDuration: "1000",
};
