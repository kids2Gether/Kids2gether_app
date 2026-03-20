import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useIsFocused } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import HTML from "react-native-render-html";
import { styles } from "./styles";
import { tagsStyles, classesStyles, defaultTextProps, renderersProps, computeEmbeddedMaxWidth, ignoredStyles, systemFonts } from "../../utils/htmlStyles";
import { ImageBackground } from "react-native";

import Header from "../../components/Header";
import { useSelector } from "react-redux";
import ScrollToTop from "../../components/ScrollToTop";
import { useRef } from "react";
import { useState } from "react";
import { useWindowDimensions } from "react-native";

export default function Offer() {
  const routes = useRoute();
  const route_data = routes.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isFocused) {
      if (user.user === null || !user.user.membership) {
        navigation.navigate("home");
      } else {
        if (user.user.membership) {
          //here we can evalue if membership expiration date is lower than Date.now(),
          // then we do an automatic logout and navigate to home
        }
      }
    }
  }, [isFocused]);

  const handleWordRemoval = (word) => {
    let result;
    let key = 'Privado: Parceiro do APP:';
    if(word.includes(key)){
      result = word.replace(key, "");
    }else if(word.includes("Privado:")){
      result = word.replace("Privado:", "");
    }
    return result;
  };

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
                  title={"Privado"}
                  color={"#fff"}
                  onBack={() => navigation.dispatch(CommonActions.goBack())}
                />
              </View>
              <ImageBackground
                source={{
                  uri: route_data.yoast_head_json.og_image[0].url,
                }}
                style={styles.image}
              ></ImageBackground>
              <View style={styles.align_content}>
                <Text></Text>
                <Text style={styles.title}>{handleWordRemoval(route_data.title.rendered)}</Text>
                <View></View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 10, marginBottom: 100  }}>
              <HTML
                source={{ html: route_data.content.rendered }}
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
            <View></View>
          </>
        )}
      </ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
