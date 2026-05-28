import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/native";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import HTML from "react-native-render-html";
import { styles } from "./styles";
import { tagsStyles, classesStyles, defaultTextProps, renderersProps, computeEmbeddedMaxWidth, ignoredStyles, systemFonts } from "../../utils/htmlStyles";
import { htmlRenderers } from "../../utils/htmlRenderers";
import { ImageBackground } from "react-native";
import { Image } from "react-native";

import icon_praia from "../../components/TypeIcon/utils/imgs/icone_praia.png";
import icon_aventura from "../../components/TypeIcon/utils/imgs/icone_aventura.png";
import icon_urbano from "../../components/TypeIcon/utils/imgs/icone_urbano.png";
import icon_exotico from "../../components/TypeIcon/utils/imgs/icone_exotico.png";
import icon_neve from "../../components/TypeIcon/utils/imgs/icone_neve.png";
import icon_resort from "../../components/TypeIcon/utils/imgs/icone_resort.png";
import icon_parque from "../../components/TypeIcon/utils/imgs/icone_parque.png";
import icon_viagem from "../../components/TypeIcon/utils/imgs/icone_viagem.png";
import Header from "../../components/Header";
import { useRef } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import { useWindowDimensions } from "react-native";

export default function Trip() {
  const routes = useRoute();
  const route_data = routes.params;
  const navigation = useNavigation();
  const [icon, setIcon] = useState(null);
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { width, heigth } = useWindowDimensions();

  useEffect(() => {
    setIcon(
      route_data.name === "praia"
        ? icon_praia
        : route_data.name === "neve"
        ? icon_neve
        : route_data.name === "urbano"
        ? icon_urbano
        : route_data.name === "exótico"
        ? icon_exotico
        : route_data.name === "resort"
        ? icon_resort
        : route_data.name === "parque"
        ? icon_parque
        : route_data.name === "aventura"
        ? icon_aventura
        : route_data.name === "viagem virtual"
        ? icon_viagem
        : null
    );
  }, [route_data]);

  return (
    <>
      <ScrollView
        style={styles.view_container}
        ref={scrollViewRef}
        onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
      >
        {route_data && (
          <>
            <View>
              <View style={styles.background_overlay}></View>
              <View style={styles.header_content}>
                <Header
                  icon={true}
                  title={
                    route_data.local_name === undefined
                      ? "VIAGEM VIRTUAL"
                      : route_data.local_name.toUpperCase()
                  }
                  color={"#fff"}
                  onBack={() => navigation.dispatch(CommonActions.goBack())}
                />
              </View>
              <ImageBackground
                source={{
                  uri: route_data?.item?.yoast_head_json?.og_image?.[0]?.url,
                }}
                style={styles.image}
              ></ImageBackground>
              <View style={styles.align_content}>
                <Text></Text>
                <Text style={styles.title}>
                  {route_data.item.title.rendered}
                </Text>
                <View>
                  {icon && route_data.name !== undefined ? (
                    <Image source={icon} style={styles.iconPaseio} />
                  ) : null}
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 10, marginBottom: 100  }}>
              <HTML
                source={{ html: route_data.item.content.rendered }}
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
        )}
      </ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
