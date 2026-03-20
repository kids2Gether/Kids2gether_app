import React, { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { styles } from "./styles";
import { ImageBackground } from "react-native";
import PostCard from "../../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import { useRef } from "react";
import { useState } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import axios from "axios";
import { setTips } from "../../reducer/tipsReducer";

export default function Tips() {
  const tips = useSelector((state) => state.tips);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const fromTab = route.params?.fromTab;
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);

  const tipsInclude = "73910,59759,6847,6469,130114,5048,130166,130079,5997,17607,32565";
  const curatedTitlesById = {
    73910: "VIAJANDO COM BEBÊS.",
    59759: "FERIADÃO NO RIO!",
    6847: "CARNAVAL EM FAMÍLIA.",
    6469: "VIAJAR É PRECISO!",
    130114: "RESORTS PARA FERIADOS.",
    5048: "FÉRIAS DE JULHO!",
    130166: "HOTÉIS PARA O FERIADO NA SERRA.",
    130079: "CRIE SEU ROTEIRO PERSONALIZADO.",
    5997: "FAZENDA CAPOAVA.",
    17607: "PÉ NA ESTRADA NO RIO DE JANEIRO.",
    32565: "PÉ NA ESTRADA EM SÃO PAULO.",
  };

  const getTipImageUrl = (item) => {
    const embeddedUrl = item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (embeddedUrl) return embeddedUrl;
    const yoastUrl = item?.yoast_head_json?.og_image?.[0]?.url;
    if (yoastUrl) return yoastUrl;
    return null;
  };

  useEffect(() => {
    const loadTipsIfNeeded = async () => {
      if (tips.tips.length > 0) return;
      try {
        const res = await axios.request({
          method: "GET",
          url: "https://www.kids2gether.com.br/wp-json/wp/v2/posts",
          params: { include: tipsInclude, orderby: "include", per_page: "100", _embed: "1" },
        });
        dispatch(setTips(res.data));
      } catch (error) {
        Alert.alert(
          "",
          "Houve um problema ao buscar as dicas. Tente novamente mais tarde"
        );
      }
    };
    loadTipsIfNeeded();
  }, [dispatch, tips.tips.length]);

  const handleClickTips = (id) => {
    navigation.navigate("tips-routes", {screen: 'selected-tip', params: { id: id }});
  };

  return (
    <>
      <ScrollView
        style={[styles.tips_container]}
        ref={scrollViewRef}
        onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
      >
        <View style={styles.header_content}>
          <Header
            title={"DICAS"}
            color={"#fff"}
            icon={!!fromTab}
            onBack={fromTab ? () => navigation.navigate(fromTab) : undefined}
          />
          <View style={styles.background_overlay}></View>
          <ImageBackground
            source={{
              uri: "https://cf.ltkcdn.net/family/images/orig/200821-2121x1414-family.jpg",
            }}
            style={styles.background_image}
          ></ImageBackground>
          <View style={styles.align_title}>
            <Text style={styles.bg_title}>NOSSAS DICAS</Text>
          </View>
        </View>
        <View style={styles.main_content}>
          {tips.tips.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhuma dica encontrada.
            </Text>
          ) : (
            tips.tips.map((item) => (
              <PostCard
                onPress={() => handleClickTips(item.id)}
                key={item.id}
                setStyle={styles.post_card}
                setTitleStyle={{
                  marginTop: 100,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#fff",
                }}
                cardBottom={true}
                title={curatedTitlesById[item.id] || item.title.rendered}
                backgroundImage={{
                  uri: getTipImageUrl(item),
                }}
              />
            ))
          )}
        </View>
      </ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
