import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import LoadingScreen from "./src/components/LoadingScreen";
import AppProvider from "./src/contexts/AppContext";
import FontsProvider from "./src/contexts/FontsContext";
import Routes from "./src/routes";
import UserProvider from "./src/contexts/UserContext";

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          <AppProvider>
            <NavigationContainer>
              <FontsProvider>
                <StatusBar backgroundColor="#111" style={"light"} />
                <Routes />
                <LoadingScreen />
              </FontsProvider>
            </NavigationContainer>
          </AppProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}