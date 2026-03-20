import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackCategoriesRoutes from "./stack/stack.categorie.routes.jsx";
import StackMarketplaceRoutes from "./stack/stack.marketplace.routes.jsx";
import StackTipsRoutes from "./stack/stack.tips.routes.jsx";
import StackProfileRoutes from "./stack/stack.profile.routes.jsx";
import StackOffersRoutes from "./stack/stack.offers.routes.jsx";

import { Image } from "react-native";
import { View } from "react-native";
import { styles } from "./styles";

import home_icon from "../../assets/nav/home_icon.png";
import map_icon from "../../assets/nav/earth_icon.png";
import categories_icon from "../../assets/nav/explorar_icon.png";
import marketplace_icon from "../../assets/nav/marketplace_icon.png";
import offers_icon from "../../assets/nav/parcerias_icon.png";
import tips_icon from "../../assets/nav/dicas_icon.png";
import profile_icon from "../../assets/nav/perfil_icon.png";
import StackHomeRoutes from './stack/stack.home.routes';
import StackMapRoutes from './stack/stack.map.routes';
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const navigate = useNavigation();
  const user = useSelector((state) => state.user);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home-routes"
        component={StackHomeRoutes}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity onPress={() => navigate.navigate('home-routes', { screen: 'home' })}>
              <Image source={home_icon} style={styles.navigation_icon} />
            </TouchableOpacity>
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <View style={styles.selected_route}></View>
            ) : (
              <View style={styles.disable_route}></View>
            ),
        }}
      >
      </Tab.Screen>
      <Tab.Screen
        name="map-routes"
        component={StackMapRoutes}
        options={{
          tabBarIcon: () => (
            <Image source={map_icon} style={styles.navigation_icon} />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <View style={styles.selected_route}></View>
            ) : (
              <View style={styles.disable_route}></View>
            ),
        }}
      />

      <Tab.Screen
        name="marketplace-routes"
        component={StackMarketplaceRoutes}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity onPress={() => navigate.navigate('marketplace-routes', { screen: 'marketplace' })}>
              <Image source={marketplace_icon} style={styles.navigation_icon} />
            </TouchableOpacity>
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <View style={styles.selected_route}></View>
            ) : (
              <View style={styles.disable_route}></View>
            ),
        }}
      />
      
      <Tab.Screen
        name="categories-routes"
        component={StackCategoriesRoutes}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity onPress={() => navigate.navigate('categories-routes', { screen: 'categories' })}>
              <Image source={categories_icon} style={styles.navigation_icon} />
            </TouchableOpacity>
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <View style={styles.selected_route}></View>
            ) : (
              <View style={styles.disable_route}></View>
            ),
        }}
      />
      <Tab.Screen
        name="offers-routes"
        component={StackOffersRoutes}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity onPress={() => navigate.navigate('offers-routes', { screen: 'offers' })}>
              <Image source={offers_icon} style={styles.navigation_icon} />
            </TouchableOpacity>
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <View style={styles.selected_route}></View>
            ) : (
              <View style={styles.disable_route}></View>
            ),
        }}
      />
      <Tab.Screen
        name="tips-routes"
        component={StackTipsRoutes}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity onPress={() => navigate.navigate('tips-routes', { screen: 'tips' })}>
              <Image source={tips_icon} style={styles.navigation_icon} />
            </TouchableOpacity>
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <View style={styles.selected_route}></View>
            ) : (
              <View style={styles.disable_route}></View>
            ),
        }}
      />
      <Tab.Screen
        name="profile-routes"
        component={StackProfileRoutes}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity onPress={() => navigate.navigate('profile-routes', { screen: user?.user ? 'logged' : 'lobby' })}>
              <Image source={profile_icon} style={styles.navigation_icon} />
            </TouchableOpacity>
          ),
          tabBarLabel: ({ focused }) =>
            focused ? (
              <View style={styles.selected_route}></View>
            ) : (
              <View style={styles.disable_route}></View>
            ),
        }}
      />
    </Tab.Navigator>
  );
}
