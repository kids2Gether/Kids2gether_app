import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Image } from "react-native";
import Header from '../../components/Header'

import { useNavigation, useRoute } from "@react-navigation/core";

import { ICON_TYPES } from "../../components/TypeIcon/utils/iconTypes";
import HTML from "react-native-render-html";
import { tagsStyles, classesStyles, defaultTextProps, renderersProps, computeEmbeddedMaxWidth, ignoredStyles, systemFonts } from "../../utils/htmlStyles";

import praia_icon from "../../components/TypeIcon/utils/imgs/icone_praia.png";
import neve_icon from "../../components/TypeIcon/utils/imgs/icone_neve.png";
import urbano_icon from "../../components/TypeIcon/utils/imgs/icone_urbano.png";
import exotico_icon from "../../components/TypeIcon/utils/imgs/icone_exotico.png";
import resort_icon from "../../components/TypeIcon/utils/imgs/icone_resort.png";
import parque_icon from "../../components/TypeIcon/utils/imgs/icone_parque.png";
import aventura_icon from "../../components/TypeIcon/utils/imgs/icone_aventura.png";
import viagem_icon from "../../components/TypeIcon/utils/imgs/icone_viagem.png";
import dicas_icon from "../../components/TypeIcon/utils/imgs/icone_dicas.png"

import { styles } from "./styles";
import { ImageBackground } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useRef } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import { useWindowDimensions } from "react-native";

export default function News() {
  const navigation = useNavigation();
  const news = useSelector((state) => state.news);
  const [data, setData] = useState(null);
  const [iconImage, setIconImage] = useState(null);
  const [color, setColor] = useState(null);
  const route = useRoute();
  const id = route.params.id;
  const icon = route.params.icon;
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const mydata = news.news.filter((item) => item.id === id);
    setData(mydata[0]);
  }, [id]);

  useEffect(() => {
    setIconImage(
      icon === "praia"
        ? praia_icon
        : icon === "neve"
          ? neve_icon
          : icon === "urbano"
            ? urbano_icon
            : icon === "exótico"
              ? exotico_icon
              : icon === "resort"
                ? resort_icon
                : icon === "parque"
                  ? parque_icon
                  : icon === "aventura"
                    ? aventura_icon
                    : icon === "dicas"
                      ? dicas_icon
                      : icon === "viagem virtual"
                        ? viagem_icon
                        : null
    );
    let getColor = ICON_TYPES.filter((item) => item.name === icon);
    setColor(getColor.length > 0 ? getColor[0].color : null);
  }, [icon]);

  return (
    <>
    <View style={styles.header_content}>
      <Header title={"NOVIDADES"} color={"#fff"} icon={true} onBack={() => navigation.goBack()} />
    </View>
      <Animated.ScrollView
        style={styles.view_container}
        entering={SlideInLeft}
        ref={scrollViewRef}
        onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
      >
        {data && (
          <>
            <View>
              <View
                style={[
                  styles.background_overlay,
                  { backgroundColor: color ? color : "#000" },
                ]}
              ></View>
              <ImageBackground
                source={{ uri: data.yoast_head_json.og_image[0].url }}
                style={styles.image}
              >
                <View
                  style={[
                    styles.bottom_bar,
                    { backgroundColor: color ? color : null },
                  ]}
                ></View>
              </ImageBackground>
              <View style={styles.align_content}>
                <Text></Text>
                <Text style={styles.title}>{data.title.rendered}</Text>
                <View>
                  {icon && iconImage !== undefined ? (
                    <Image source={iconImage} style={styles.iconPaseio} />
                  ) : null}
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
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
          </>
        )}
      </Animated.ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
