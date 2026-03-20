import React, { useContext, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/core";
import { AppContext } from "../../contexts/AppContext";

import { styles } from "./styles";

import Icon from "react-native-vector-icons/FontAwesome";
import { ICON_TYPES } from "../../components/TypeIcon/utils/iconTypes";
import TypeIcon from "../../components/TypeIcon";
import Header from "../../components/Header";

export default function Categories() {
  const [inputValue, setInputValue] = useState("");
  const { setLoading, setAwaitLoading } = useContext(AppContext);
  const navigation = useNavigation();

  const handleSearch = () => {
    let route_data = {
      value: inputValue,
    };
    navigation.navigate("categories-routes", {
      screen: "search",
      params: route_data,
    });
    setLoading(true);
    setAwaitLoading(true);
  };

  const handleSelected = (id) => {
    if (id === 116) {
      let route_data = {
        name: ICON_TYPES.find((item) => item.id === id).name,
        color: ICON_TYPES.find((item) => item.id === id).color,
        id_local: 119,
        id_category: id,
      };
      navigation.navigate('categories-routes', { screen: "trips", params: route_data});
    } else {
      let route_data = {
        name: ICON_TYPES.find((item) => item.id === id).name,
        color: ICON_TYPES.find((item) => item.id === id).color,
        search: false,
        id_category: id,
      };
      navigation.navigate('categories-routes', { screen: "selected-category", params: route_data});
    }
  };

  return (
    <Animated.View
      style={styles.container}
      exiting={SlideInLeft}
      entering={SlideInRight}
    >
      <Header icon={false} title={"DESTINOS"} color={"#333"} />
      <View style={styles.align_content}>
        <View style={styles.input_container}>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.search_input}
            autoCapitalize="none"
            keyboardType="web-search"
            placeholder="EX.: Fernando de Noronha"
            placeholderTextColor="#a8b6c8"
          />
        </View>
        <Icon
          name="search"
          size={14}
          color="#a8b6c8"
          style={styles.search_icon}
          onPress={handleSearch}
        />
      </View>
      <FlatList
        data={ICON_TYPES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TypeIcon
            onPress={(id) => handleSelected(item.id, item.name)}
            title={item.name}
            image={item.icon}
            color={item.color}
          />
        )}
        columnWrapperStyle={{ justifyContent: "center" }}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
      />
    </Animated.View>
  );
}
