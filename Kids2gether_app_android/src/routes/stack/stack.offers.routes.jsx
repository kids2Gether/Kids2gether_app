import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Offers from "../../screens/Offers";
import Offer from "../../screens/Offer";

const Stack = createNativeStackNavigator();

export default function StackOffersRoutes({ navigation, route }) {
  // to hide tab bar on specific stack screens
  useLayoutEffect(() => {
    const tabHiddenRoutes = ["selected-offer"];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="offers"
        component={Offers}
        options={screenAnimation}
      />
      <Stack.Screen
        name="selected-offer"
        component={Offer}
        options={screenAnimation}
      />
    </Stack.Navigator>
  );
}

const screenAnimation = {
  animation: "slide_from_left",
  animationDuration: "10",
};
