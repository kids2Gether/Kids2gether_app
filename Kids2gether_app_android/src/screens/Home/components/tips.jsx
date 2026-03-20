import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import TipsCard from "../../../components/TipsCard";
import { useNavigation } from "@react-navigation/core";

export default function Tips({ data }) {
  const navigation = useNavigation();

  const curatedTitlesById = {
    73910: "VIAJANDO COM BEBÊS.",
    59759: "FERIADÃO NO RIO!",
    6847: "CARNAVAL EM FAMÍLIA.",
    6469: "VIAJAR É PRECISO!",
    130114: "RESORTS PARA FERIADOS.",
    5048: "FÉRIAS DE JULHO!",
    130166: "HOTÉIS PARA O FERIADO NA SERRA.",
    130079: "CRIE SEU ROTEIRO PERSONALIZADO.",
    5997: "FAZENDA CAPOAVA.",
    17607: "PÉ NA ESTRADA NO RIO DE JANEIRO.",
    32565: "PÉ NA ESTRADA EM SÃO PAULO.",
  };

  const getTipImageUrl = (item) => {
    const embeddedUrl = item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (embeddedUrl) return embeddedUrl;
    const yoastUrl = item?.yoast_head_json?.og_image?.[0]?.url;
    if (yoastUrl) return yoastUrl;
    return null;
  };

  const handleClickTips = (id) => {
    let route_data = {
      id: id
    }
    navigation.navigate("tips-routes", { screen: "selected-tip", params: route_data })
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "FredokaOne",
            color: "black",
            fontSize: 24,
            marginLeft: 15,
          }}
        >
          Nossas Dicas
        </Text>
        <TouchableOpacity
        onPress={() => navigation.navigate("tips-routes", { screen: 'tips', params: { fromTab: 'home-routes' } })}
        >
          <Text
            style={{
              fontFamily: "FredokaOne",
              color: "black",
              fontSize: 16,
              marginRight: 15,
            }}
          >
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TipsCard
            onPress={(e) => handleClickTips(item.id)}
            title={curatedTitlesById[item.id] || item.title.rendered}
            backgroundImage={{
              uri: getTipImageUrl(item),
            }}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
