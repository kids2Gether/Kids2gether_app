import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { ImageBackground } from "react-native";
import HTML from "react-native-render-html";

export default function TipsCard({ backgroundImage, title, onPress }) {
  const [iconImage, setIconImage] = useState(null);

  return (
    <View style={styles.card_container} onTouchEndCapture={onPress}>
      <ImageBackground source={backgroundImage} style={styles.bg_image}>
        {title && <Text style={styles.title_post}>{title}</Text>}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card_container: {
    width: 170,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  bg_image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title_post: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 800,
    textAlign: "center",
    fontFamily: "Roboto_bold_italic",
    padding: 5,
    textShadowRadius: 5,
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 0 },
  },
});
