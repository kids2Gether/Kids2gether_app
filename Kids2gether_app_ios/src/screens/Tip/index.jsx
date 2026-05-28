import React, { useEffect, useState } from "react";
import { Alert, Text, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/core";
import { styles } from "./styles";
import { ImageBackground } from "react-native";
import Header from "../../components/Header";
import ScrollToTop from "../../components/ScrollToTop";
import { useRef } from "react";
import HTML from "react-native-render-html";
import axios from "axios";
import { tagsStyles, classesStyles, defaultTextProps, renderersProps, computeEmbeddedMaxWidth, ignoredStyles, systemFonts } from "../../utils/htmlStyles";
import { htmlRenderers } from "../../utils/htmlRenderers";

export default function Tip() {
  const navigation = useNavigation();
  const tips = useSelector((state) => state.tips);
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const route_data = route.params || {};
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { width } = useWindowDimensions();

  const getTipImageUrl = (item) => {
    const embeddedUrl = item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (embeddedUrl) return embeddedUrl;
    const yoastUrl = item?.yoast_head_json?.og_image?.[0]?.url;
    if (yoastUrl) return yoastUrl;
    return null;
  };

  useEffect(() => {
    const loadTip = async () => {
      if (!route_data.id) {
        console.error("No ID provided in route_data");
        setLoading(false);
        return;
      }

      // Limpa o data anterior para forçar recarregamento
      setData(null);
      setLoading(true);

      if (route_data.postData) {
        setData(route_data.postData);
        setLoading(false);
        return;
      }

      const fromStore = tips.tips.find((item) => item.id === route_data.id);
      if (fromStore) {
        console.log("Found in store:", fromStore.id);
        setData(fromStore);
        setLoading(false);
        return;
      }

      const token = user?.user?.token;
      const isPage = route_data.isPage || false;
      const endpoint = isPage ? 'pages' : 'posts';

      console.log("Loading tip/page:", route_data.id, "endpoint:", endpoint);

      try {
        const useProxy = Boolean(token);
        const res = await axios.request({
          method: "GET",
          url: useProxy
            ? `https://us-central1-kids2gether-4ca94.cloudfunctions.net/wpProxy/${endpoint}/${route_data.id}`
            : `https://www.kids2gether.com.br/wp-json/wp/v2/${endpoint}/${route_data.id}`,
          params: {
            _embed: "1",
            ...(useProxy ? { "status[]": ["publish", "private"] } : {}),
          },
          ...(useProxy
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {}),
        });
        console.log("Tip/page loaded successfully:", res.data.id);
        setData(res.data);
      } catch (error) {
        console.error("Error loading tip/page:", error.message, error.response?.status);
        Alert.alert(
          "",
          "Houve um problema ao buscar esta dica. Tente novamente mais tarde"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTip();
  }, [route_data.id, route_data.isPage]);

  return (
    <>
      <ScrollView style={styles.view_container} ref={scrollViewRef} onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50 }}>
            <Text>Carregando...</Text>
          </View>
        ) : data ? (
          <>
            <View>
              <View style={styles.background_overlay}></View>
              <View style={styles.header_content}>
                <Header
                  icon={true}
                  title={"DICAS"}
                  color={"#fff"}
                  onBack={() => navigation.goBack()}
                />
              </View>
              <ImageBackground
                source={{ uri: getTipImageUrl(data) }}
                style={styles.image}
              ></ImageBackground>
              <View style={styles.align_content}>
                <Text style={styles.title}>{data.title.rendered}</Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 10, marginBottom: 100 }}>
              <HTML
                source={{ html: data.content.rendered }}
                contentWidth={width - 20}
                tagsStyles={tagsStyles}
                classesStyles={classesStyles}
                defaultTextProps={defaultTextProps}
                renderersProps={renderersProps}
                renderers={htmlRenderers}
                computeEmbeddedMaxWidth={computeEmbeddedMaxWidth(width - 20)}
                enableExperimentalMarginCollapsing={true}
                ignoredStyles={ignoredStyles}
                systemFonts={systemFonts}
              />
            </View>
            <View></View>
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
