import React, { useContext } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import TypeIcon from "../../../components/TypeIcon";
import { ICON_TYPES } from "../../../components/TypeIcon/utils/iconTypes";
import { useNavigation } from "@react-navigation/core";
import { AppContext } from "../../../contexts/AppContext";

export default function Categories() {
  const navigation = useNavigation();
  const { setLoading, loading } = useContext(AppContext);

  const handleSelected = (id) => {
    if (id === 116) {
      let route_data = {
        name: ICON_TYPES.find((item) => item.id === id).name,
        color: ICON_TYPES.find((item) => item.id === id).color,
        id_local: 119,
        id_category: id,
      };
      navigation.navigate("categories-routes", {
        screen: "trips",
        params: route_data,
      });
    } else {
      let route_data = {
        name: ICON_TYPES.find((item) => item.id === id).name,
        color: ICON_TYPES.find((item) => item.id === id).color,
        search: false,
        id_category: id,
      };
      navigation.navigate("categories-routes", {
        screen: "selected-category",
        params: route_data,
      });
    }
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "FredokaOne",
          color: "black",
          fontSize: 24,
          marginLeft: 15,
          marginBottom: 15,
        }}
      >
        Destinos
      </Text>
      <FlatList
        data={ICON_TYPES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TypeIcon
            onPress={(e) => handleSelected(item.id)}
            title={item.name}
            image={item.icon}
            color={item.color}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
