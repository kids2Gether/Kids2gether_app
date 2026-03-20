import React from "react";
import { ImageBackground } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";

export default function HeaderCustom({
  category,
  image,
  title,
  subTitle,
  color,
  onBack,
}) {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.navigation_content}>
        <Icon
          name="angle-left"
          color={"#fff"}
          size={40}
          onPress={
            onBack ? onBack : () => navigation.dispatch(CommonActions.goBack())
          }
          style={styles.back_icon}
        />
        <Text style={styles.header_title}>{category}</Text>
        {/* align element \/ ignore  */}
        <Text></Text>
      </View>
      <ImageBackground source={{ uri: image }} style={styles.header_background}>
        <View
          style={[
            styles.bottom_bar,
            { backgroundColor: color ? color : "#000" },
          ]}
        ></View>
      </ImageBackground>
      <View style={styles.background_content_align}>
        <Text style={styles.header_title}>{title}</Text>
        <Text style={[styles.header_subtitle]}>{subTitle}</Text>
      </View>
      <View
        style={[
          styles.background_overlay,
          { backgroundColor: color ? color : "#000" },
        ]}
      ></View>
    </View>
  );
}
