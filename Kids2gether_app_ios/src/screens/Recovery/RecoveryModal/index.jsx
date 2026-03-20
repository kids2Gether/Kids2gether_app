import React, { useContext } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { styles } from "./styles";
import { AppContext } from "../../../contexts/AppContext";
import { useNavigation } from "@react-navigation/native";
import greenlock from "../../../../assets/greenlock.png";
import alert from "../../../../assets/alert.png";

export default function RecoveryModal({ type }) {
  const { setRecoveryOKController, setRecoveryErrorController } =
    useContext(AppContext);
  const navigation = useNavigation();

  const handleGoBack = () => {
    setRecoveryErrorController(false);
    setRecoveryOKController(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_content}>
        <Text style={styles.header_title}>RECUPERAÇÃO DE SENHA</Text>
      </View>
      <View>
        {type === "error" ? (
          <Image
            source={alert}
            style={{ ...styles.imagen_icon, width: 75, height: 70 }}
          />
        ) : (
          <Image source={greenlock} style={styles.imagen_icon} />
        )}
      </View>
      <View style={styles.main_content}>
        {type === "error" ? (
          <Text style={[styles.main_text]}>Usuario não encontrado</Text>
        ) : (
          <Text style={[styles.main_text]}>
            Sua solicitação foi enviada com sucesso.{"\n"} Por favor, verifique
            seu email.
          </Text>
        )}
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
  );
}
