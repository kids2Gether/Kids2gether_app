import React, { useEffect, useState } from "react";
import { Alert, Text, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { styles } from "./styles";
import Header from "../../components/Header";
import ScrollToTop from "../../components/ScrollToTop";
import { useRef } from "react";
import HTML from "react-native-render-html";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tagsStyles, classesStyles, defaultTextProps, renderersProps, computeEmbeddedMaxWidth, ignoredStyles, systemFonts } from "../../utils/htmlStyles";
import { htmlRenderers } from "../../utils/htmlRenderers";

const PRIVACY_POLICY_PAGE_ID = 3;
const CACHE_KEY = '@privacy_policy_cache';

export default function PrivacyPolicy() {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const loadPrivacyPolicy = async () => {
      try {
        // Tenta carregar do cache primeiro
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);

          // Atualiza em background
          fetchFromAPI();
        } else {
          // Se não há cache, carrega da API
          await fetchFromAPI();
        }
      } catch (error) {
        console.error("Error loading from cache:", error);
        await fetchFromAPI();
      }
    };

    const fetchFromAPI = async () => {
      try {
        const res = await axios.request({
          method: "GET",
          url: `https://www.kids2gether.com.br/wp-json/wp/v2/pages/${PRIVACY_POLICY_PAGE_ID}`,
        });
        setData(res.data);

        // Salva no cache para próximas visitas
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(res.data));
      } catch (error) {
        console.error("Error loading privacy policy:", error.message, error.response?.status);
        if (!data) {
          Alert.alert(
            "",
            "Houve um problema ao carregar a política de privacidade. Tente novamente mais tarde"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadPrivacyPolicy();
  }, []);

  return (
    <>
      <ScrollView style={styles.view_container} ref={scrollViewRef} onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50 }}>
            <Text>Carregando...</Text>
          </View>
        ) : data ? (
          <>
            <View style={styles.header_content}>
              <Header
                icon={true}
                title={""}
                color={"#333"}
                onBack={() => navigation.goBack()}
              />
            </View>
            <Text style={styles.title}>{data.title.rendered}</Text>
            <View style={{ paddingHorizontal: 20, marginBottom: 100 }}>
              <HTML
                source={{ html: data.content.rendered }}
                contentWidth={width - 40}
                tagsStyles={tagsStyles}
                classesStyles={classesStyles}
                defaultTextProps={defaultTextProps}
                renderersProps={renderersProps}
                renderers={htmlRenderers}
                computeEmbeddedMaxWidth={computeEmbeddedMaxWidth(width - 40)}
                enableExperimentalMarginCollapsing={true}
                ignoredStyles={ignoredStyles}
                systemFonts={systemFonts}
              />
            </View>
          </>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50 }}>
            <Text>Nenhum conteúdo encontrado.</Text>
          </View>
        )}
      </ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
