import React, { useRef, useState } from "react";
import { Text, useWindowDimensions, View, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { styles } from "../Tip/styles";
import Header from "../../components/Header";
import ScrollToTop from "../../components/ScrollToTop";
import HTML from "react-native-render-html";
import { tagsStyles, classesStyles, defaultTextProps, renderersProps, computeEmbeddedMaxWidth, ignoredStyles, systemFonts } from "../../utils/htmlStyles";

export default function EcoTurismo() {
  const navigation = useNavigation();
  const ecoturismo = useSelector((state) => state.ecoturismo);
  const data = ecoturismo.data;
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { width } = useWindowDimensions();

  const getImageUrl = (item) => {
    const embeddedUrl = item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (embeddedUrl) return embeddedUrl;
    const yoastUrl = item?.yoast_head_json?.og_image?.[0]?.url;
    if (yoastUrl) return yoastUrl;
    return null;
  };

  // Se não há dados, mostrar mensagem (caso raro - navegação direta sem Home)
  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Header
          icon={true}
          title={"ECOTURISMO"}
          color={"#000"}
          onBack={() => navigation.goBack()}
        />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView 
        style={styles.view_container} 
        ref={scrollViewRef} 
        onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
      >
        <View>
          <View style={styles.background_overlay}></View>
          <View style={styles.header_content}>
            <Header
              icon={true}
              title={"ECOTURISMO"}
              color={"#fff"}
              onBack={() => navigation.goBack()}
            />
          </View>
          <ImageBackground
            source={{ uri: getImageUrl(data) }}
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
            computeEmbeddedMaxWidth={computeEmbeddedMaxWidth(width - 20)}
            enableExperimentalMarginCollapsing={true}
            ignoredStyles={ignoredStyles}
            systemFonts={systemFonts}
          />
        </View>
      </ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
