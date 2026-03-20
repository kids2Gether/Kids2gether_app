import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/native";
import { Button, Linking, Pressable, Text } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import HTML from "react-native-render-html";
import { styles } from "./styles";
import { marketplaceTagsStyles, classesStyles, defaultTextProps, renderersProps, computeEmbeddedMaxWidth, ignoredStyles, systemFonts } from "../../utils/htmlStyles";
import { ImageBackground } from "react-native";
import { Image } from "react-native";

import Header from "../../components/Header";
import { useRef } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import { useWindowDimensions } from "react-native";

import makeup_icon from "../../components/TypeIcon/utils/imgs/icone_makeup.png";
import bike_icon from "../../components/TypeIcon/utils/imgs/icone_bike.png";
import nannies_icon from "../../components/TypeIcon/utils/imgs/icone_nannies.png";
import hair_icon from "../../components/TypeIcon/utils/imgs/icone_hair.png";
import conci_icon from "../../components/TypeIcon/utils/imgs/icone_conci.png";

export default function MarketplaceDetails() {
  const routes = useRoute();
  const route_data = routes.params;
  const navigation = useNavigation();
  const [icon, setIcon] = useState(null);
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { width, heigth } = useWindowDimensions();
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(route_data.whatsapp);
    setIcon(
      route_data.category === "maquiagem"
        ? makeup_icon
        : route_data.category === "bike"
        ? bike_icon
        : route_data.category === "babás"
        ? nannies_icon
        : route_data.category === "cabeleireiro"
        ? hair_icon
        : route_data.category === "concierge"
        ? conci_icon
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
          <View
            style={{
              height: heigth,
            }}
          >
            <View>
              <View style={styles.background_overlay}></View>
              <View style={styles.header_content}>
                <Header
                  icon={true}
                  onBack={() => navigation.navigate("selected-marketplace")}
                />
              </View>
              <ImageBackground
                source={{
                  uri: `${route_data.item.yoast_head_json.og_image[0].url}`,
                }}
                style={styles.image}
              />
              <View style={styles.align_content}>
                <Text style={styles.title}>{route_data.name}</Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <HTML
                source={{ html: route_data.item.content.rendered }}
                contentWidth={width - 20}
                tagsStyles={marketplaceTagsStyles}
                classesStyles={classesStyles}
                defaultTextProps={defaultTextProps}
                renderersProps={renderersProps}
                computeEmbeddedMaxWidth={computeEmbeddedMaxWidth(width - 20)}
                enableExperimentalMarginCollapsing={true}
                ignoredStyles={ignoredStyles}
                systemFonts={systemFonts}
              />
            </View>
            <View style={styles.container_button}>
              <Pressable
                style={styles.button}
                onPress={() => Linking.openURL(link)}
              >
                <Text style={styles.text_button}>QUERO CONTRATAR</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
