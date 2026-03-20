import React from "react";
import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import FormAuth from "./FormAuth";
import Header from "../../components/Header";

export default function Register({ onLayout }) {
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
        title={"CRIAR CONTA"}
        color={"#fff"}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.align_content}>
        <FormAuth />
        <Text style={[styles.app_terms, { textDecorationLine: "none" }]}>
          Ao criar uma conta no Kids2Gether você concorda com nossos{" "}
          <TouchableOpacity onPress={() => navigation.navigate('profile-routes', { screen: 'privacy-policy' })}>
            <Text style={styles.app_terms}>
              Termos de Uso e Políticas de Privacidade
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </Animated.View>
  );
}
