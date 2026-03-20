import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Text } from "react-native";
import News from "./components/news";
import Categories from "./components/categories";
import Tips from "./components/tips";
import KidsInRio from "./components/kidsinrio";
import EcoTurismo from "./components/ecoturismo";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNews } from "../../reducer/newsReducer";
import { setTips } from "../../reducer/tipsReducer";
import { setEcoTurismo } from "../../reducer/ecoturismoReducer";
import Animated, { SlideInRight } from "react-native-reanimated";
import { AppContext } from "../../contexts/AppContext";

export default function Home({ onLayout }) {
  const news = useSelector((state) => state.news);
  const tips = useSelector((state) => state.tips);
  const dispatch = useDispatch();
  const { setLoading, setAwaitLoading, setPopUpController } = useContext(AppContext);
  const [kidsInRioData, setKidsInRioData] = useState([]);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const tipsInclude = "73910,59759,6847,6469,130114,5048,130166,130079,5997,17607,32565";
      const optionsNews = {
        method: "GET",
        url: "https://www.kids2gether.com.br/wp-json/wp/v2/posts",
        params: { per_page: "5", _embed: "1" },
      };
      const optionsTips = {
        method: "GET",
        url: "https://www.kids2gether.com.br/wp-json/wp/v2/posts",
        params: { include: tipsInclude, orderby: "include", per_page: "100", _embed: "1" },
      };
      const optionsKidsInRio = {
        method: "GET",
        url: "https://www.kids2gether.com.br/wp-json/wp/v2/posts",
        params: { tags: "1198", per_page: "10", _embed: "1" },
      };
      const optionsEcoTurismo = {
        method: "GET",
        url: "https://www.kids2gether.com.br/wp-json/wp/v2/posts/182280",
        params: { _embed: "1" },
      };
      try {
        // One failed endpoint should not block the whole Home screen.
        const [newsRes, tipsRes, kidsInRioRes, ecoTurismoRes] =
          await Promise.allSettled([
            axios.request(optionsNews),
            axios.request(optionsTips),
            axios.request(optionsKidsInRio),
            axios.request(optionsEcoTurismo),
          ]);

        if (!mounted) return;

        dispatch(
          setNews(newsRes.status === "fulfilled" ? newsRes.value.data : [])
        );
        dispatch(
          setTips(tipsRes.status === "fulfilled" ? tipsRes.value.data : [])
        );
        setKidsInRioData(
          kidsInRioRes.status === "fulfilled" ? kidsInRioRes.value.data : []
        );
        dispatch(
          setEcoTurismo(
            ecoTurismoRes.status === "fulfilled" ? ecoTurismoRes.value.data : []
          )
        );

        const failedCount = [newsRes, tipsRes, kidsInRioRes, ecoTurismoRes].filter(
          (item) => item.status === "rejected"
        ).length;
        if (failedCount > 0) {
          console.warn(`Home loaded with ${failedCount} failed request(s)`);
        }
      } catch (error) {
        if (mounted) {
          dispatch(setNews([]));
          dispatch(setTips([]));
          setKidsInRioData([]);
          dispatch(setEcoTurismo([]));
          console.warn("Home load failed:", error?.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setAwaitLoading(false);
        }
      }
    };
    getData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Animated.ScrollView
        entering={SlideInRight}
        onLayout={onLayout}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.app_logo}>Kids2Gether</Text>
        <View style={{ marginTop: 30 }}>
          <News data={news.news} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Categories />
        </View>
        <View style={{ marginTop: 20 }}>
          <KidsInRio data={kidsInRioData} />
        </View>
        <View style={{ marginTop: 20 }}>
          <EcoTurismo />
        </View>
        <View style={{ marginTop: 20 }}>
          <Tips data={tips.tips.slice(0, 8)} />
        </View>
      </Animated.ScrollView>
    </>
  );
}
