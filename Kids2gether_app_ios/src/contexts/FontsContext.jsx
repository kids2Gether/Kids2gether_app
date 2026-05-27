import { useFonts } from "expo-font";
import { createContext, useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import FredokaOne from "../../assets/fonts/Fredoka_One/FredokaOne-Regular.ttf";
import Fredoka from "../../assets/fonts/Fredoka_One/Fredoka-VariableFont_wdth,wght.ttf";
import FredokaRegular from "../../assets/fonts/Fredoka_One/Fredoka-Regular.ttf";
import Roboto_bold from "../../assets/fonts/Roboto/Roboto-Bold.ttf";
import Roboto_bold_italic from "../../assets/fonts/Roboto/Roboto-BoldItalic.ttf";
import Roboto_italic from "../../assets/fonts/Roboto/Roboto-Italic.ttf";
import Roboto_regular from "../../assets/fonts/Roboto/Roboto-Regular.ttf";
// Fontes dos icones (react-native-vector-icons). No bare antigo eram registradas
// no Info.plist nativo; em managed precisam ser carregadas aqui, senao os icones
// (botao voltar, etc.) aparecem como "?".
import FontAwesomeFont from "react-native-vector-icons/Fonts/FontAwesome.ttf";
import FeatherFont from "react-native-vector-icons/Fonts/Feather.ttf";
import MaterialIconsFont from "react-native-vector-icons/Fonts/MaterialIcons.ttf";
import { setUser } from "../reducer/userReducer";
import { setContentMarkers } from "../reducer/mapReducer";
import { setLocals } from '../reducer/localsReducer';
import axios from "axios";

export const FontsContext = createContext({});

export default function FontsProvider({ children }) {
  const dispatch = useDispatch();

  const GET_CONTENT_MARKERS = async () => {
    const options = {
      method: 'GET',
      url: 'https://www.kids2gether.com.br/wp-json/k2g/map',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    try {
      const CONTENT_MARKERS = await axios.request(options);
      dispatch(setContentMarkers(CONTENT_MARKERS.data))
    } catch (error) {
      const status = error?.response?.status;
      if (status && status !== 404) {
        console.warn("Falha ao carregar marcadores de conteudo:", status);
      }
      dispatch(setContentMarkers([]))
    };
  }

  const GET_LOCALS = async () => {
    const options = {
      method: 'GET',
      url: 'https://www.kids2gether.com.br/wp-json/wp/v2/local',
      params: {per_page: '100'}
    };
    try {
      let response = await axios.request(options);
      dispatch(setLocals(response.data))
    } catch (error) {
    }
  }

  const [fontsLoaded] = useFonts({
    FredokaOne,
    Fredoka,
    FredokaRegular,
    Roboto_bold,
    Roboto_bold_italic,
    Roboto_italic,
    Roboto_regular,
    // As chaves precisam bater EXATAMENTE com a fontFamily que cada icon set usa:
    // FontAwesome -> "FontAwesome", Feather -> "Feather", MaterialIcons -> "Material Icons" (com espaco)
    FontAwesome: FontAwesomeFont,
    Feather: FeatherFont,
    "Material Icons": MaterialIconsFont,
  });

  useEffect(() => {
    GET_CONTENT_MARKERS();
    GET_LOCALS();

    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    //Here we can search for user in async storage
    async function getLocalUser() {
      try {
        const storage_user = await AsyncStorage.getItem("K2G");
        if (storage_user !== null) {
          const userData = JSON.parse(storage_user);
          // Verifica se o token expirou
          if (userData.token_expires) {
            const expirationTime =
              typeof userData.token_expires === "number"
                ? userData.token_expires
                : Date.parse(userData.token_expires);
            const currentTime = Date.now();
            if (expirationTime && currentTime >= expirationTime) {
              await AsyncStorage.removeItem("K2G");
              console.log("Token expirado, usuario deslogado");
              return;
            }
          }
          dispatch(setUser(userData));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getLocalUser();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FontsContext.Provider
      value={{
        onLayout,
      }}
    >
      {children}
    </FontsContext.Provider>
  );
}
