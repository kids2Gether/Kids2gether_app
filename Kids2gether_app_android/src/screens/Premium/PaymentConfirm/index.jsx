import React, { useContext } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import logo from "../../../../assets/logo.png";
import { UserContext } from "../../../contexts/UserContext";

export default function PaymentConfirm() {
  const { setPaymentConfirmController } = useContext(UserContext);
  const navigation = useNavigation();

  const handleGoBack = () => {
    setPaymentConfirmController(false);
    navigation.goBack();
  };

  return (
    <View style={styles.modal_container}>
      <Animated.View entering={FadeIn} style={styles.modal_overlay} />
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={styles.modal_content}
      >
        <View style={styles.container}>
          <View style={styles.header_content}>
            <Text style={styles.header_title}>CONFIRMAÇÃO DE ASSINATURA</Text>
          </View>
          <View>
            <Image
              source={logo}
              style={{ ...styles.imagen_icon, width: 105, height: 70 }}
            />
          </View>
          <View style={styles.main_content}>
            <Text
              style={{ ...styles.main_text, fontSize: 18, marginBottom: 15 }}
            >
              Seja bem-vindo!
            </Text>
          </View>
          <View style={styles.main_content}>
            <Text style={[styles.main_text]}>
            A partir de agora, você terá acesso a todo o conteúdo premium e a vantagens exclusivas Kids2gether.
            </Text>
          </View>
          <View style={styles.footer_content}>
            <TouchableOpacity
              style={styles.actions_button}
              onPress={() => handleGoBack()}
            >
              <Text style={styles.actions_text}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modal_main}></View>
      </Animated.View>
    </View>
  );
}
