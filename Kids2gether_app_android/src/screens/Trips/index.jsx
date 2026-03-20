import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
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
import HeaderCustom from "../../components/HeaderCustom";
import { ICON_TYPES } from "../../components/TypeIcon/utils/iconTypes";
import Animated, { FadeIn } from "react-native-reanimated";
import ScrollToTop from "../../components/ScrollToTop";
import { useRef } from "react";

export default function Trips() {
  const { setLoading, setLoaderController } = useContext(AppContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [local, setLocal] = useState("");
  const route = useRoute();
  const route_data = route.params;
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
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

    const getTrips = async (id_local, id_category) => {
      let optionsCategory;
      if (id_local === 119) {
        optionsCategory = {
          method: "GET",
          url: `https://www.kids2gether.com.br/wp-json/wp/v2/posts?tags=119&per_page=100&_embed=1`,
        };
      } else {
        optionsCategory = {
          method: "GET",
          url: `https://www.kids2gether.com.br/wp-json/wp/v2/posts?categories=${id_category}&tags=${id_local}&per_page=100&_embed=1`,
        };
      }

      try {
        //Getting the locals
        setLoaderController(true);
        const trips = await axios.request(optionsCategory);
        setData(trips.data);
        setLoaderController(false);
      } catch (error) {
        console.error(error);
        setLoaderController(false);
      }
    };
    setLocal(route_data.id_local);
    getTrips(route_data.id_local, route_data.id_category);
    setColor(
      ICON_TYPES.filter((item) => item.name === route_data.name)[0].color
    );
  }, [route_data]);

  const handleNavigate = (item, local_name, name) => {
    navigation.navigate("categories-routes", {
      screen: "trip",
      params: { item, local_name, name },
    });
  };

  return (
    <>
      {data.length > 0 && (
        <Animated.ScrollView
          entering={FadeIn}
          style={styles.view_container}
          ref={scrollViewRef}
          onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
        >
          <HeaderCustom
            image={
              local === 119
                ? "https://www.kids2gether.com.br/wp-content/uploads/2019/04/kids2gether-marrakesh-09.jpg"
                : route_data.local_imagen
            }
            category={route_data.name}
            title={route_data.local_name}
            subTitle={`${data.length} artigos`}
            color={color}
          />
          <View style={styles.card_list}>
            {data.map((item, index) => (
              <CategoryCard
                verticalMargin={10}
                color={color}
                backgroundImage={{
                  uri:
                    item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    item?.yoast_head_json?.og_image?.[0]?.url ||
                    "",
                }}
                onPress={() =>
                  handleNavigate(item, route_data.local_name, route_data.name)
                }
                key={index}
                title={item.title.rendered}
              />
            ))}
          </View>
        </Animated.ScrollView>
      )}
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
