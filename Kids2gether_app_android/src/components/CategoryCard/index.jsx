import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { ImageBackground } from "react-native";
import { styles } from "./styles";

export default function CategoryCard({ backgroundImage, title, onPress, color, verticalMargin }) {
  return (
    <View style={[styles.card_container, { marginVertical: verticalMargin ? verticalMargin : 0}]} onTouchEnd={onPress}>
      <ImageBackground
        source={backgroundImage}
        style={styles.bg_image}
      ></ImageBackground>
      <View style={[styles.bg_overlay, { backgroundColor: "#000"}]} />
      <View style={styles.title_align_container}>
        {title && <Text style={styles.title_post}>{title}</Text>}
      </View>
    </View>
  );
}
