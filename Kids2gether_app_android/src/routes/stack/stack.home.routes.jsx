import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Home from "../../screens/Home";
import { FontsContext } from "../../contexts/FontsContext";

const Stack = createNativeStackNavigator();

export default function StackHomeRoutes({ navigation, route }) {
  const { onLayout } = useContext(FontsContext);

  // to hide tab bar on specific stack screens
  useLayoutEffect(() => {
    const tabHiddenRoutes = [];

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
    </Stack.Navigator>
  );
}

const screenAnimation = {
  animation: "slide_from_left",
  animationDuration: "1000",
};
