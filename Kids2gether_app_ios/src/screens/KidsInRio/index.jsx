import React, { useEffect, useState, useRef } from "react";
import { Alert, Text, View, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import PostCard from "../../components/PostCard";
import Header from "../../components/Header";
import ScrollToTop from "../../components/ScrollToTop";
import { styles } from "../Tips/styles";

export default function KidsInRio() {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getKidsInRioImageUrl = (item) => {
    const embeddedUrl = item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (embeddedUrl) return embeddedUrl;
    const yoastUrl = item?.yoast_head_json?.og_image?.[0]?.url;
    if (yoastUrl) return yoastUrl;
    return null;
  };

  useEffect(() => {
    const loadKidsInRioPosts = async () => {
      try {
        const res = await axios.request({
          method: "GET",
          url: "https://www.kids2gether.com.br/wp-json/wp/v2/posts",
          params: { tags: "1198", per_page: "100", _embed: "1" },
        });
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        Alert.alert(
          "",
          "Houve um problema ao buscar os posts. Tente novamente mais tarde"
        );
        setLoading(false);
      }
    };
    loadKidsInRioPosts();
  }, []);

  const handleClickPost = (item) => {
    navigation.navigate("selected-tip", { id: item.id, postData: item });
  };

  return (
    <>
      <ScrollView
        style={[styles.tips_container]}
        ref={scrollViewRef}
        onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
      >
        <View style={styles.header_content}>
          <Header title={"KIDS IN RIO"} color={"#fff"} />
          <View style={styles.background_overlay}></View>
          <ImageBackground
            source={{
              uri: "https://www.kids2gether.com.br/wp-content/uploads/2019/06/IMG_8943.jpg",
            }}
            style={styles.background_image}
          ></ImageBackground>
          <View style={styles.align_title}>
            <Text style={styles.bg_title}>KIDS IN RIO</Text>
          </View>
        </View>
        <View style={styles.main_content}>
          {loading ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Carregando...
            </Text>
          ) : posts.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhum post encontrado.
            </Text>
          ) : (
            posts.map((item) => (
              <PostCard
                onPress={() => handleClickPost(item)}
                key={item.id}
                setStyle={styles.post_card}
                setTitleStyle={{
                  marginTop: 100,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#fff",
                }}
                cardBottom={true}
                title={item.title.rendered}
                backgroundImage={{
                  uri: getKidsInRioImageUrl(item),
                }}
              />
            ))
          )}
        </View>
      </ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
