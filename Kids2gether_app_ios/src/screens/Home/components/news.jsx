import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import PostCard from "../../../components/PostCard";
import { getFooterColor } from "../../../components/TypeIcon/utils/iconTypes";
import { useNavigation } from "@react-navigation/core";

export default function News({ data }) {
  const navigation = useNavigation();

  const getNewsImageUrl = (item) => {
    // Prefer featured media from _embed (usually hosted on www.kids2gether.com.br)
    // Yoast og_image sometimes points to an IP host (certificate mismatch), which
    // can fail to load in React Native.
    return (
      item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      item?.yoast_head_json?.og_image?.[0]?.url ||
      ""
    );
  };

  const handleClickNews = (id, icon) => {
    navigation.navigate("home-routes", {
      screen: "news",
      params: { id, icon },
    });
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "FredokaOne",
          color: "black",
          fontSize: 26,
          marginLeft: 15,
          marginBottom: 5,
        }}
      >
        Novidades
      </Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              onPress={() =>
                handleClickNews(item.id, item._embedded[`wp:term`][0][0].slug)
              }
              id={item.id}
              title={item.title.rendered}
              backgroundImage={{
                uri: getNewsImageUrl(item),
              }}
              icon={item._embedded[`wp:term`][0][0].slug}
              iconSize={30}
              footerColor={getFooterColor(item._embedded[`wp:term`][0][0].slug)}
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={{ marginLeft: 15 }}>Nenhuma novidade no momento</Text>
      )}
    </View>
  );
}
