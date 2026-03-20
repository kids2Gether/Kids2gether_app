import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import PostCard from "../../../components/PostCard";
import { getFooterColor } from "../../../components/TypeIcon/utils/iconTypes";
import { useNavigation } from "@react-navigation/core";

export default function KidsInRio({ data }) {
  const navigation = useNavigation();

  const getKidsInRioImageUrl = (item) => {
    // Prefer featured media from _embed (usually hosted on www.kids2gether.com.br)
    // Yoast og_image sometimes points to an IP host (certificate mismatch), which
    // can fail to load in React Native.
    return (
      item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      item?.yoast_head_json?.og_image?.[0]?.url ||
      ""
    );
  };

  const handleClickKidsInRio = (item) => {
    navigation.navigate("home-routes", { screen: "selected-tip", params: { id: item.id, postData: item } });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "FredokaOne",
            color: "black",
            fontSize: 26,
            marginLeft: 15,
          }}
        >
          Kids in Rio
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("tips-routes", { screen: "kidsinrio" })}
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
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostCard
              onPress={() => handleClickKidsInRio(item)}
              id={item.id}
              title={item.title.rendered}
              backgroundImage={{
                uri: getKidsInRioImageUrl(item),
              }}
              icon={item._embedded?.[`wp:term`]?.[0]?.[0]?.slug || "urbano"}
              iconSize={30}
              footerColor={
                getFooterColor(
                  item._embedded?.[`wp:term`]?.[0]?.[0]?.slug
                ) || "#FF6B6B"
              }
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={{ marginLeft: 15 }}>
          Nenhum conteúdo Kids in Rio no momento
        </Text>
      )}
    </View>
  );
}
