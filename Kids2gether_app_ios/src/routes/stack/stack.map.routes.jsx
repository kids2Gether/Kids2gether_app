import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Map from "../../screens/Map";
import MapTrip from "../../screens/Map/components/MapTip";

const Stack = createNativeStackNavigator();

export default function StackMapRoutes({ navigation, route }) {

  // to hide tab bar on specific stack screens
  useLayoutEffect(() => {
    const tabHiddenRoutes = ['map-trip'];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="map" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="map" component={Map} options={screenAnimation} />
      <Stack.Screen name="map-trip" component={MapTrip} options={screenAnimation} />
    </Stack.Navigator>
  );
}

const screenAnimation = {
  animation: "slide_from_left",
  animationDuration: "10",
};
