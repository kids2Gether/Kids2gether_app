import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { ImageBackground } from "react-native";

import praia_icon from "../TypeIcon/utils/imgs/icone_praia.png";
import neve_icon from "../TypeIcon/utils/imgs/icone_neve.png";
import urbano_icon from "../TypeIcon/utils/imgs/icone_urbano.png";
import exotico_icon from "../TypeIcon/utils/imgs/icone_exotico.png";
import resort_icon from "../TypeIcon/utils/imgs/icone_resort.png";
import parque_icon from "../TypeIcon/utils/imgs/icone_parque.png";
import aventura_icon from "../TypeIcon/utils/imgs/icone_aventura.png";
import viagem_icon from "../TypeIcon/utils/imgs/icone_viagem.png";
import { TouchableOpacity } from "react-native";

export default function PostCard({
  onPress,
  icon,
  iconSize,
  color,
  title,
  date,
  small,
  premium,
  member,
  cardWidth,
  cardHeight,
  backgroundImage,
  footerColor,
  setStyle,
  setTitleStyle,
  cardBottom,
}) {
  const [iconImage, setIconImage] = useState(null);

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
                    : icon === "viagem virtual"
                      ? viagem_icon
                      : null
    );
  }, [icon]);

  return (
    <TouchableOpacity>
      <View
        onTouchEndCapture={onPress}
        style={[
          styles.card_container,
          setStyle ? setStyle : { width: 260, height: 180 },
        ]}
      >
        <ImageBackground
          source={backgroundImage}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></ImageBackground>
        <View style={styles.card_content}>
          {icon && iconImage !== undefined ? (
            <Image source={iconImage} style={{ width: 50, height: 50 }} />
          ) : null}
          <Text style={[styles.title_post, setTitleStyle ? setTitleStyle : null]}>{title}</Text>
        </View>
        {footerColor && (
          <View
            style={[styles.footer_overlay, { backgroundColor: footerColor }]}
          ></View>
        )}
        <View
          style={[
            styles.card_overlay,
            { backgroundColor: footerColor !== "#000" ? footerColor : null },
          ]}
        ></View>
        {cardBottom && (
          <View
            style={{ height: 10, width: "100%", backgroundColor: color ? color : "#000" }}
          ></View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card_container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  card_overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    opacity: 0.5,
  },
  card_content: {
    position: "absolute",
    alignItems: "center",
    zIndex: 2,
  },
  title_post: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontFamily: "FredokaOne",
    textShadowRadius: 5,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 0 },
    marginBottom: 75,
  },
  footer_overlay: {
    width: "100%",
    height: 20,
  },
});
