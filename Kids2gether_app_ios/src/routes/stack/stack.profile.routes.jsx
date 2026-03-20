import Login from "../../screens/SignIn";
import Profile from "../../screens/Profile";
import Premium from "../../screens/Premium";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Lobby from "../../screens/Lobby";
import Subscription from "../../screens/Profile/Subscription";
import Register from "../../screens/Register";
import Recovery from "../../screens/Recovery";
import PrivacyPolicy from "../../screens/PrivacyPolicy";

const Stack = createNativeStackNavigator();

export default function StackProfileRoutes({ navigation, route }) {
  const user = useSelector((state) => state.user);

  // to hide tab bar on specific stack screens
  useLayoutEffect(() => {
    if (user.user) {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
      return;
    }
    const tabHiddenRoutes = ["login", "register", "recovery"];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route, user.user]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.user ? (
        <>
          <Stack.Screen
            name="logged"
            component={Profile}
            options={screenAnimation}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="lobby" options={screenAnimation}>
            {() => <Lobby />}
          </Stack.Screen>
          <Stack.Screen name="login" options={screenAnimation}>
            {() => <Login />}
          </Stack.Screen>
          <Stack.Screen name="register" options={screenAnimation}>
            {() => <Register />}
          </Stack.Screen>
          <Stack.Screen name="recovery" options={screenAnimation}>
            {() => <Recovery />}
          </Stack.Screen>
        </>
      )}
      <Stack.Screen
        name="get-premium"
        component={Premium}
        options={screenAnimation}
      />
      <Stack.Screen
        name="subscription"
        options={screenAnimation}
        component={Subscription}
      ></Stack.Screen>
      <Stack.Screen
        name="privacy-policy"
        options={screenAnimation}
        component={PrivacyPolicy}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const screenAnimation = {
  animation: "slide_from_left",
  animationDuration: "10",
};
