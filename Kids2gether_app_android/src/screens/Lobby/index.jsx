import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import Permissions from "../../components/Permissions";

export default function Lobby() {
  const navigation = useNavigation();

  return (
    <Animated.View
      entering={SlideInLeft.duration(500)}
      exiting={SlideInLeft.duration(500)}
      style={styles.container}
    >
      <View style={styles.align_content}>
        <Text style={styles.page_title}>PERFIL</Text>
        <Permissions />
        <View style={styles.membership_content}>
          <Text>Assinatura</Text>
          <TouchableOpacity
            style={styles.actions_button}
            onPress={() => navigation.navigate('profile-routes', { screen: "get-premium" })}
          >
            <Text style={styles.actions_text}>ASSINAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.align_content}>
        <View style={styles.signin_content}>
          <TouchableOpacity onPress={() => navigation.navigate('profile-routes', { screen: 'privacy-policy' })}>
            <Text>Termos de Uso e Políticas de Privacidade</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actions_button}
            onPress={() => navigation.navigate('profile-routes', { screen: "login" })}
          >
            <Text style={styles.actions_text}>LOGAR ou CRIAR CONTA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
