import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";
import CategoryCard from "../../components/CategoryCard";
import axios from "axios";
import { AppContext } from "../../contexts/AppContext";

import icon_praia from "../../components/TypeIcon/utils/imgs/icone_praia.png";
import icon_aventura from "../../components/TypeIcon/utils/imgs/icone_aventura.png";
import icon_urbano from "../../components/TypeIcon/utils/imgs/icone_urbano.png";
import icon_exotico from "../../components/TypeIcon/utils/imgs/icone_exotico.png";
import icon_neve from "../../components/TypeIcon/utils/imgs/icone_neve.png";
import icon_resort from "../../components/TypeIcon/utils/imgs/icone_resort.png";
import icon_parque from "../../components/TypeIcon/utils/imgs/icone_parque.png";
import icon_viagem from "../../components/TypeIcon/utils/imgs/icone_viagem.png";
import { styles } from "./styles";
import { ICON_TYPES } from "../../components/TypeIcon/utils/iconTypes";
import Header from "../../components/Header";
import { useRef } from "react";
import ScrollToTop from "../../components/ScrollToTop";

export default function Category() {
  const { setLoading } = useContext(AppContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [search, setSearch] = useState(false);
  const route = useRoute();
  const route_data = route.params;
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);

  const handleSelected = (local) => {
    const routeParams = {
      name: route_data.name,
      id_local: local.id,
      // Vamos passar o ID de categoria do WordPress (mapeado) para o Trips
      id_category: local.categoryId,
      local_name: local.name,
      // Usamos a imagem do primeiro post encontrado para esse local (se existir)
      local_imagen: local.imageUrl,
    };
    navigation.navigate("categories-routes", { screen: "trips", params: routeParams });
  };

  const getWpCategoryId = (legacyId) => {
    // IDs antigos do app -> IDs atuais das categorias no WordPress
    const categoryMapping = {
      2: 130, // praia
      3: 121, // neve
      4: 127, // urbano
      5: 139, // exótico
      6: 133, // resort
      7: 146, // parque
      8: 128, // aventura
      116: 143, // viagem virtual
    };
    return categoryMapping[legacyId] || legacyId;
  };

  const getTagTermsFromPost = (post) => {
    const termGroups = post?._embedded?.["wp:term"];
    if (!Array.isArray(termGroups)) return [];

    // Normalmente: [ [categories], [tags] ]
    const tagGroup = termGroups.find(
      (group) => Array.isArray(group) && group.length > 0 && group[0]?.taxonomy === "post_tag"
    );
    return Array.isArray(tagGroup) ? tagGroup : [];
  };

  const getPostImageUrl = (post) => {
    return (
      post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      post?.yoast_head_json?.og_image?.[0]?.url ||
      ""
    );
  };

  useEffect(() => {
    setSearch(route_data.search);
    setTitle(route_data.name);
    setIcon(
      route_data.name === "praia"
        ? icon_praia
        : route_data.name === "neve"
          ? icon_neve
          : route_data.name === "urbano"
            ? icon_urbano
            : route_data.name === "exótico"
              ? icon_exotico
              : route_data.name === "resort"
                ? icon_resort
                : route_data.name === "parque"
                  ? icon_parque
                  : route_data.name === "aventura"
                    ? icon_aventura
                    : route_data.name === "viagem virtual"
                      ? icon_viagem
                      : null
    );
    const getLocalsFromCategory = async (legacyCategoryId) => {
      const wpCategoryId = getWpCategoryId(legacyCategoryId);
      const perPage = 100;
      let page = 1;
      const maxPages = 10;
      const posts = [];

      try {
        setIsFetching(true);
        setLoading(true);

        while (page <= maxPages) {
          const response = await axios.request({
            method: "GET",
            url: "https://www.kids2gether.com.br/wp-json/wp/v2/posts",
            params: {
              categories: wpCategoryId,
              per_page: perPage,
              page,
              _embed: 1,
            },
          });

          posts.push(...response.data);

          const totalPagesRaw = response.headers?.["x-wp-totalpages"];
          const totalPages = Number(totalPagesRaw || 0);
          if (!totalPages || page >= totalPages) break;
          page += 1;
        }

        // "Locais" agora são tags (taxonomia post_tag) associadas aos posts dessa categoria.
        const localsMap = new Map();
        for (const post of posts) {
          const tags = getTagTermsFromPost(post);
          const imageUrl = getPostImageUrl(post);
          for (const tag of tags) {
            if (!tag?.id || !tag?.name) continue;
            if (!localsMap.has(tag.id)) {
              localsMap.set(tag.id, {
                id: tag.id,
                name: tag.name,
                imageUrl,
                categoryId: wpCategoryId,
              });
            }
          }
        }

        const localsList = Array.from(localsMap.values()).sort((a, b) =>
          a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
        );
        setData(localsList);
      } catch (error) {
        console.error("Category locals API error:", error);
        setData([]);
      } finally {
        setIsFetching(false);
        setLoading(false);
      }
    };

    getLocalsFromCategory(route_data.id_category);
    setColor(
      ICON_TYPES.filter((item) => item.name === route_data.name)[0].color
    );
  }, [route_data]);

  return (
    <>
      <ScrollView
        style={styles.view_container}
        ref={scrollViewRef}
        onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
      >
        <Header
          iconColor={"#333"}
          icon={true}
          title={title.toUpperCase()}
          color={color}
          onBack={() => navigation.navigate("categories")}
        />
        <View style={styles.align_title_icon}>
          <Image source={icon} style={[styles.title_icon, { tintColor: color }]} />
        </View>

        <View style={styles.card_list}>
          {data.length > 0 ? (
            data.map((local) => (
              <CategoryCard
                key={local.id}
                color={color}
                verticalMargin={10}
                onPress={() => handleSelected(local)}
                backgroundImage={{ uri: local.imageUrl || "" }}
                title={local.name}
              />
            ))
          ) : isFetching ? (
            <Text style={{ color: "#999", textAlign: "center", marginTop: 20 }}>
              Carregando destinos...
            </Text>
          ) : (
            <Text style={{ color: "#999", textAlign: "center", marginTop: 20 }}>
              Nenhum destino encontrado.
            </Text>
          )}
        </View>
      </ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
