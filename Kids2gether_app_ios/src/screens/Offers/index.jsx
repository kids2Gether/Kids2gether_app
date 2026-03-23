import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import backgroundImagePath from "../../../assets/virtualbg.jpg";
import { Text, View, ScrollView } from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../contexts/AppContext";
import PostCard from "../../components/PostCard";
import axios from "axios";
import { setMembership } from "../../reducer/userReducer";
import { useRef } from "react";
import ScrollToTop from "../../components/ScrollToTop";

export default function Offers() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { setLoading, setAwaitLoading, setOffersController } =
    useContext(AppContext);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getData = async () => {
    const token = user?.user?.token;
    const options = {
      method: "GET",
      url: "https://us-central1-kids2gether-4ca94.cloudfunctions.net/wpProxy/posts",
      params: {
        tags: 89,
        _embed: 1,
        "status[]": ["publish", "private"],
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.request(options);
      setData(response.data);
      setAwaitLoading(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setAwaitLoading(false);
      setLoading(false);
    }
  };

  const handleNavigate = (item) => {
    navigation.navigate("offers-routes", {
      screen: "selected-offer",
      params: item,
    });
  };

  useEffect(() => {
    if (isFocused) {
      if (user.user === null) {
        setOffersController(true);
        setData([]);
      } else {
        //We have a user logged
        if (!user.user.token) {
          setOffersController(true);
          setData([]);
          return;
        }
        setAwaitLoading(true);
        setLoading(true);
        (async () => {
          const options = {
            method: "GET",
            url: `https://us-central1-kids2gether-4ca94.cloudfunctions.net/users/membership/${user.user.user_id}`,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };

          try {
            let response = await axios.request(options);
            if (response.data.membership) {
              dispatch(setMembership(true));
              if (data.length === 0) {
                getData();
              } else {
                setAwaitLoading(false);
                setLoading(false);
              }
            } else {
              setAwaitLoading(false);
              setLoading(false);
              dispatch(setMembership(false));
              setData([]);
              setOffersController(true);
            }
          } catch (error) {
            console.log(error);
            setData([]);
            setAwaitLoading(false);
            setLoading(false);
            dispatch(setMembership(false));
            setOffersController(true);
          }
        })();
      }
    } else {
      setOffersController(false);
    }
  }, [isFocused]);

  const handleWordRemoval = (word) => {
    let result;
    let key = 'Privado: Parceiro do APP:';
    if(word.includes(key)){
      result = word.replace(key, "");
    }else if(word.includes("Privado:")){
      result = word.replace("Privado:", "");
    }
    return result;
  };

  return (
    <>
      <ScrollView
        style={[styles.tips_container]}
        ref={scrollViewRef}
        onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
      >
        <View style={styles.header_content}>
          <Text style={styles.page_title}></Text>
          <View style={styles.background_overlay}></View>
          <ImageBackground
            source={backgroundImagePath}
            style={styles.background_image}
          ></ImageBackground>
          <View style={styles.align_title}>
            <Text style={styles.bg_title}>PARCERIAS</Text>
            <Text style={styles.sub_title}>{data.length} artigos</Text>
          </View>
        </View>
        <View style={styles.main_content}>
          {data.map((item) => (
            <PostCard
              onPress={() => handleNavigate(item)}
              key={item.id}
              setStyle={styles.post_card}
              setTitleStyle={{
                marginTop: 100,
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
              }}
              cardBottom={true}
              title={handleWordRemoval(item.title.rendered)}
              backgroundImage={{
                uri: item?.yoast_head_json?.og_image?.[0]?.url,
              }}
            />
          ))}
        </View>
      </ScrollView>
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
