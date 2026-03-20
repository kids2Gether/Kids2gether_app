import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import { styles } from "./styles";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Icon name="home" size={30} color={"#555"} onPress={() => navigation.navigate('home')} />
      <Icon name="globe" size={30} color={"#555"} />
      <Icon name="map-marker" size={30} color={"#555"} />
      <Icon name="handshake-o" size={30} color={"#555"}  />
      <Icon name="clipboard" size={30} color={"#555"} onPress={() => navigation.navigate('tips')} />
      <Icon name="user" size={30} color={"#555"} />
    </View>
  );
}
