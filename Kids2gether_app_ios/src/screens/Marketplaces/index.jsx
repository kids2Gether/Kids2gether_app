import React, { useContext, useState } from "react";
import { FlatList, Text, Image, View } from "react-native";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/core";
import { AppContext } from "../../contexts/AppContext";

import { styles } from "./styles";

import Icon from "react-native-vector-icons/FontAwesome";
import { MARKETPLACE_ICON } from "../../components/TypeIcon/utils/iconTypes";
import TypeIcon from "../../components/TypeIcon";
import Header from "../../components/Header";

export default function Marketplace() {
  // const [inputValue, setInputValue] = useState("");
  // const { setLoading, setAwaitLoading } = useContext(AppContext);
  const navigation = useNavigation();

  // const handleSearch = () => {
  //   let route_data = {
  //     value: inputValue,
  //   };
  //   navigation.navigate("marketplace-routes", {
  //     screen: "search",
  //     params: route_data,
  //   });
  //   setLoading(true);
  //   setAwaitLoading(true);
  // };

  const handleSelected = (id) => {
      let route_data = {
        name: MARKETPLACE_ICON.find((item) => item.id === id).name,
        color: MARKETPLACE_ICON.find((item) => item.id === id).color,
        id_local: id,
        id_category: id,
      };
      navigation.navigate('marketplace-routes', { screen: "selected-marketplace", params: route_data});
    };

  return (
    <Animated.View
      style={styles.container}
      exiting={SlideInLeft}
      entering={SlideInRight}
    > 
      <View style={styles.container_header}>
        <Header icon={false} title={"Kids2Gether em Paris"} color={"#000000"} />
      </View>
      <Icon />
      <View style={styles.align_content}>
        {/* <View> */}
          <Text style={styles.text}>Descubra e reserve serviços de Paris usados e recomendados pela Nath.</Text>
          {/* <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.search_input}
            autoCapitalize="none"
            keyboardType="web-search"
            placeholder="EX.: Bábas"
            placeholderTextColor="#a8b6c8"
          /> */}
        {/* </View> */}
        {/* <Icon
          name="search"
          size={14}
          color="#a8b6c8"
          style={styles.search_icon}
          onPress={handleSearch}
        /> */}
      </View>
      <FlatList
        data={MARKETPLACE_ICON}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TypeIcon
            onPress={(id) => handleSelected(item.id, item.name)}
            title={item.name}
            image={item.icon}
            color={item.color}
          />
        )}
        // columnWrapperStyle={{ justifyContent: "center" }} // dispara um erro pra essa organização
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
      />
    </Animated.View>
  );
}
