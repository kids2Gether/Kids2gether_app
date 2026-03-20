import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import Marketplaces from "../../screens/Marketplaces";
import Marketplace from "../../screens/Marketplace";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Search from "../../screens/Search";
import MarketplaceDetails from "../../screens/MarketplaceDetails";
import MarketplaceSearch from "../../screens/MarketplaceSearch";

const Stack = createNativeStackNavigator();

export default function StackCategorieRoutes({ navigation, route }) {
    const [user, setUser] = useState(true);

    // to hide tab bar on specific stack screens 
    useLayoutEffect(() => {
        const tabHiddenRoutes = ["details"];

        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="marketplace"
                component={Marketplaces}
                options={screenAnimationLeft} />
            <Stack.Screen name="selected-marketplace"
                component={Marketplace}
                options={screenAnimationRight} />
            <Stack.Screen
                name="search"
                component={Search}
                options={screenAnimationRight} />
            <Stack.Screen
                name="details"
                component={MarketplaceDetails}
                options={screenAnimationLeft} />
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