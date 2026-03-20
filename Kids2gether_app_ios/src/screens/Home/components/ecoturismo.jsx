import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

export default function EcoTurismo() {
  const navigation = useNavigation();

  function handleClickEcoturismo() {
    // Navega para a tela EcoTurismo dedicada
    navigation.navigate("home-routes", {
      screen: "ecoturismo"
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoTurismo</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={handleClickEcoturismo}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <Text style={styles.cardTitle}>Descubra o Brasil Sustentável</Text>
          <Text style={styles.cardSubtitle}>Experiências que transformam, preservam e permanecem</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: "FredokaOne",
    color: "black",
    fontSize: 26,
    marginBottom: 10,
  },
  card: {
    width: width - 30,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#7CB342',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cardTitle: {
    fontFamily: "FredokaOne",
    color: "white",
    fontSize: 24,
    marginBottom: 8,
  },
  cardSubtitle: {
    color: "white",
    fontSize: 15,
  },
});
