import React from "react";
import { styles } from "./styles";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import FormAuth from "./FormAuth";
import FormFacebook from "./FormFacebook";
import { TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { useLink } from '../../hooks/useLink';

export default function Login({ onLayout }) {
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
        title={"ENTRAR"}
        color={"#fff"}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.align_content}>
        <FormAuth />

        <TouchableOpacity
          style={styles.align_text}
          onPress={() =>
            navigation.navigate("profile-routes", { screen: "recovery" })
          }
        >
          <Text style={styles.forgot_password}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <Separator />
        {/* <FormFacebook /> */}
        <TouchableOpacity
          style={styles.align_text}
          onPress={() =>
            navigation.navigate("profile-routes", { screen: "register" })
          }
        >
          <Text style={styles.create_account}>CRIAR UMA CONTA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => useLink('https://www.kids2gether.com.br/termos-de-uso-e-politicas-de-privacidade/')}
          style={styles.align_text}
        >
          <Text style={styles.app_terms}>
            Termos de Uso e Políticas de Privacidade
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const Separator = () => {
  return (
    <View style={styles.align_line_view}>
      <View style={styles.line_view} />
      <Text style={styles.line_text}>ou</Text>
      <View style={styles.line_view} />
    </View>
  );
};
