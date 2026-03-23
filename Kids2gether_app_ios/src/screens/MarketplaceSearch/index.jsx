import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Text } from "react-native";
import CategoryCard from "../../components/CategoryCard";
import Header from "../../components/Header";
import axios from "axios";
import { CommonActions } from "@react-navigation/native";
import { styles } from "./styles";
import { MARKETPLACE_ICON } from "../../components/TypeIcon/utils/iconTypes";
import { AppContext } from "../../contexts/AppContext";
import { useRef } from "react";
import ScrollToTop from "../../components/ScrollToTop";

export default function MarketplaceSearch() {
  const navigation = useNavigation();
  const route = useRoute();
  const route_data = route.params;
  const { setLoading, setAwaitLoading } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [finished, setFinished] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const flatRef = useRef(null);
  const [scroll, setScroll] = useState(0);

  const getColor = (id) => {
    let color = MARKETPLACE_ICON.filter((item) => item.id === id);
    if (!color.length) {
      return "#80CAA7";
    } else {
      return color[0] === undefined ? "#80CAA7" : color[0].color;
    }
  };

  const getCategory = (id) => {
    let category = MARKETPLACE_ICON.filter((item) => item.id === id);
    if (!category.length) {
      return "other";
    } else {
      return category[0] === undefined ? "other" : category[0].name;
    }
  };

  const getPost = async (page) => {
    let optionsCategory;
    optionsCategory = {
      method: "GET",
      url: `https://www.kids2gether.com.br/wp-json/wp/v2/posts?search=${route_data.value}&page=${page}&per_page=10&_embed=1`,
    };
    try {
      //Getting the locals
      const trips = await axios.request(optionsCategory);
      setData([...data, ...trips.data]);
      setSearched(true);
    } catch (error) {
      setFinished(true);
    }
  };

  useEffect(() => {
    getPost(page);
  }, [page]);

  useEffect(() => {
    if (searched) {
      setAwaitLoading(false);
      setLoading(false);
    }
  }, [searched]);

  const handleNavigate = (item, local_name, name) => {
    navigation.navigate("marketplace-routes", {
      screen: "details",
      params: { item, local_name, name },
    });
  };

  const Loader = () => {
    return (
      !finished && (
        <View>
          <ActivityIndicator size="large" color="green" />
        </View>
      )
    );
  };

  const FlatHeader = ({ status }) => {
    return (
      <>
        <Header
          icon={true}
          color={"#333"}
          title={"RESULTADO DA BUSCA"}
          onBack={() => navigation.dispatch(CommonActions.goBack())}
        />
        <View style={styles.search_header}>
          <Text style={styles.search_value}>{`"${route_data.value}"`}</Text>
          <Text style={{ textAlign: "center" }}>
            {status
              ? "Os seguintes artigos foram encontrados"
              : "Não foram encontrados resultados para a sua busca"}
          </Text>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.card_list}>
        {data.length > 0 ? (
          <FlatList
            ref={flatRef}
            onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
            style={styles.list_container}
            ItemSeparatorComponent={() => (
              <View style={{ marginBottom: 20 }}></View>
            )}
            onEndReachedThreshold={0.2}
            ListFooterComponent={<Loader />}
            ListHeaderComponent={<FlatHeader status={true} />}
            onEndReached={() => {
              if (!finished) {
                setPage(page + 1);
              }
            }}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <CategoryCard
                  color={getColor(item.categories[0])}
                  backgroundImage={{
                    uri: item?.yoast_head_json?.og_image?.[0]?.url,
                  }}
                  onPress={() =>
                    handleNavigate(
                      item,
                      route_data.value,
                      getCategory(item.categories[0])
                    )
                  }
                  key={item.id}
                  title={item.title.rendered}
                />
              );
            }}
          ></FlatList>
        ) : (
          <FlatHeader status={false} />
        )}
      </View>
      <ScrollToTop controller={scroll} onPress={() => {flatRef.current?.scrollToOffset({ offset: 0, animated: true })}} />
    </>
  );
}
