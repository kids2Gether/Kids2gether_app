import React from "react";
import { styles } from "./styles";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import FormAuth from "./FormAuth";
import Header from "../../components/Header";

export default function Recovery({ onLayout }) {
  const navigation = useNavigation();

  return (
    <Animated.View
    entering={SlideInLeft.duration(500)}
    exiting={SlideInLeft.duration(500)}
      fadeDuration={500}
      style={styles.container}
      onLayout={onLayout}
    >
      <Header
        icon={true}
        title={"RECUPERAR SENHA"}
        color={"#fff"}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.align_content}>
        <FormAuth />
      </View>
    </Animated.View>
  );
}
