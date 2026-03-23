import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import Tips from "../../screens/Tips";
import Tip from "../../screens/Tip";
import News from "../../screens/News";
import KidsInRio from "../../screens/KidsInRio";
import EcoTurismo from "../../screens/EcoTurismo";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function StackTipsRoutes({ navigation, route }) {
  const [user, setUser] = useState(true);

  // to hide tab bar on specific stack screens
  useLayoutEffect(() => {
    const tabHiddenRoutes = ["selected-tip", "news", "ecoturismo"];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }

    return () => {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tips" component={Tips} options={screenAnimation} />
      <Stack.Screen name="kidsinrio" component={KidsInRio} options={screenAnimation} />
      <Stack.Screen
        name="selected-tip"
        component={Tip}
        options={screenAnimation}
      />
      <Stack.Screen name="news" component={News} options={screenAnimation} />
      <Stack.Screen name="ecoturismo" component={EcoTurismo} options={screenAnimation} />
    </Stack.Navigator>
  );
}

const screenAnimation = {
  animation: "slide_from_left",
  animationDuration: "10",
};
