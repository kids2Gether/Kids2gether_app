import React, { useContext, useRef } from "react";
import { Dimensions, Text } from "react-native";
import { View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../../components/CustomButton/index";
import { MEMBERSHIP_TYPES } from "./util/membershipTypes";
import { Carousel } from "react-native-snap-carousel";
import { AppContext } from "../../contexts/AppContext";
import { UserContext } from "../../contexts/UserContext";

export default function Premium() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const carouselRef = useRef(null);
  const { width } = Dimensions.get("window");
  const { setPaymentInfo } = useContext(UserContext);
  const { setCardController } = useContext(AppContext);

  const setPayment = async (plan) => {
    setPaymentInfo(plan);
    setCardController(true);
  };

  return (
    <View style={styles.container}>
      <Header color={"#333"} icon={true} onBack={() => navigation.navigate('profile-routes', { screen: user.user ? 'logged' : 'lobby' })} />
      <Text style={[styles.screen_title]}>ASSINATURA</Text>
      <Text style={[styles.screen_title, { color: "#327fb3", fontSize: 30 }]}>
        PREMIUM
      </Text>
      <View style={styles.align_text_content}>
        <TextComponent text={"Acesso a conteúdo exclusivo"} />
        <TextComponent text={"Clube de vantagens"} />
        <TextComponent text={"Notificações Geo-Localizadas"} />
      </View>
      <Carousel
        ref={carouselRef}
        firstItem={1}
        sliderWidth={width}
        data={MEMBERSHIP_TYPES}
        removeClippedSubviews={false}
        renderItem={({ item }) => (
          <CardComponent
            title={item.time}
            price={item.price}
            monthly={item.monthly}
            onPress={() => {
              if (user.user) {
                setPayment(item.plan);
              } else {
                navigation.navigate("login");
              }
            }}
          />
        )}
        itemWidth={220}
        inactiveSlideOpacity={0.3}
        inactiveSlideScale={0.7}
        containerCustomStyle={{ flexGrow: 1 }}
        layout={"default"}
      />
    </View>
  );
}

const TextComponent = ({ text }) => {
  return (
    <View style={styles.align_text}>
      <Icon name="user" size={20} />
      <Text style={styles.content_text}>{text}</Text>
    </View>
  );
};

const CardComponent = ({ title, price, monthly, onPress }) => {
  return (
    <View style={styles.align_card}>
      <Text style={styles.card_header}>{title}</Text>
      <Text style={styles.align_price}>
        R$ <Text style={styles.card_price}>{price}</Text>
      </Text>
      <Text style={styles.card_header}>Valor Mensal: {monthly}</Text>
      <CustomButton value={"ASSINAR"} sx={styles.card_btn} onPress={onPress} />
    </View>
  );
};
