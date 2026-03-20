import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import Category from "../../screens/Category";
import Categories from "../../screens/Categories";
import Trips from "../../screens/Trips";
import Trip from "../../screens/Trip";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Search from "../../screens/Search";

const Stack = createNativeStackNavigator();

export default function StackCategorieRoutes({ navigation, route }) {
    const [user, setUser] = useState(true);

    // to hide tab bar on specific stack screens 
    useLayoutEffect(() => {
        const tabHiddenRoutes = ["trip", "trips"];

        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="categories"
                component={Categories}
                options={screenAnimationLeft} />
            <Stack.Screen name="selected-category"
                component={Category}
                options={screenAnimationRight} />
            <Stack.Screen
                name="search"
                component={Search}
                options={screenAnimationRight} />
            <Stack.Screen
                name="trips"
                component={Trips}
                options={screenAnimationLeft} />
            <Stack.Screen
                name="trip"
                component={Trip}
                options={screenAnimationRight} />
        </Stack.Navigator>
    )
}

const screenAnimationLeft = {
    animation: 'slide_from_left',
    animationDuration: '1',
}

const screenAnimationRight = {
    animation: 'slide_from_right',
    animationDuration: '1',
}