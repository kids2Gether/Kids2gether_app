import React, { useContext } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../CustomButtonParis";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../contexts/AppContext";
import Animated, { BounceIn } from "react-native-reanimated";
import kids_logo from "../../../assets/logo.png";
import eiffel_tower from "../../../assets/popup/paris-imagem 1.png";

const TextField = ({ children }) => {
  return <Text style={styles.description}>{children}</Text>;
};

const MemberBenefits = ({ value }) => {
  return (
    <Animated.View
      entering={BounceIn.delay(200).duration(1000)}
      style={styles.benefits_container}
    >
      <Icon name="check-decagram" color="#01d566" size={30} />
      <Text style={styles.benefits_text}>{value}</Text>
    </Animated.View>
  );
};

const CardPlan = ({ image, color, time, price, description }) => {
  return (
    <Animated.View
      style={[styles.card_container]}
      entering={BounceIn.delay(300).duration(1500)}
    >
      <View style={[styles.card_container, { gap: 20 }]}>
        <View style={[styles.card_image_container, { backgroundColor: color }]}>
          <Image style={styles.image_icon} source={image} />
        </View>
        <View>
          <Text style={{ fontFamily: "Roboto_bold", fontSize: 18 }}>
            {time}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <Text
        style={{
          marginRight: 10,
          color: "#FDB72E",
          fontFamily: "Roboto_bold",
          fontSize: 18,
          letterSpacing: -0.5,
        }}
      >
        {price}
      </Text>
    </Animated.View>
  );
};

export default function PopUp() {
  const { setPopUpController, popUpController } = useContext(AppContext);
  const navigation = useNavigation();

  const onGetPremiumClicked = () => {
    navigation.navigate("marketplace-routes", { screen: "marketplace" });
    setPopUpController(false);
  };

  return (
    /*         <Animated.View style={{ width: '100%', resizeMode: 'contain' }}>
        </Animated.View> */
    <>
      <View style={styles.paris_cards}>
        <Image source={kids_logo} style={styles.kids_logo} />
      </View>
      <View
        style={{
          display: "flex",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
          width: "80%",
        }}
      >
        <Text style={[styles.title, { textAlign: "center", marginBottom: 10 }]}>
          Paris durante as Olimpíadas
        </Text>
        <Text style={[styles.benefits_text, { textAlign: "center" }]}>
          Serviços exclusivos recomendados pela Nath.
        </Text>
      </View>
      <View style={styles.button_image_container}>
        <CustomButton
          value={"QUERO CONHECER"}
          onPress={() => onGetPremiumClicked()}
          sx={{ marginTop: 50 }}
        />
        <Image
          source={eiffel_tower}
          style={{
            width: "100%",
            height: "70%",
            resizeMode: "cover",
            borderRadius: 18,
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  paris_cards: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  kids_logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
  },
  button_image_container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "66%",
  },
  pop_up_container: {
    width: "100%", // 80% da largura da tela
    height: "100%", // 50% da altura da tela
    position: "absolute", // Posiciona sobre outros elementos
    top: "25%", // Centraliza verticalmente
    left: "10%", // Centraliza horizontalmente
    backgroundColor: "white", // Fundo do pop-up
    borderRadius: 20, // Bordas arredondadas
    padding: 20, // Espaçamento interno
    alignItems: "center", // Alinha itens internos horizontalmente
    justifyContent: "center", //
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "Roboto_bold",
    height: 60,
  },
  description: {
    color: "#00000077",
    fontSize: 14,
  },
  benefits_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  benefits_text: {
    fontFamily: "Roboto",
    color: "#000000",
    fontSize: 15,
    marginBottom: -50,
  },
  card_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 2,
  },
  card_image_container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    padding: 15,
  },
  image_icon: {
    width: 35,
    height: 35,
    objectFit: "contain",
  },
});
