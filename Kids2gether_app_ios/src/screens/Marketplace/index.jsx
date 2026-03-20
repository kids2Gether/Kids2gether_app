import React, { useContext, useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  Button,
  Pressable,
} from "react-native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import { setMembership } from "../../reducer/userReducer";
import { useRef } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import { CommonActions } from "@react-navigation/native";
import HTML from "react-native-render-html";
import { useWindowDimensions, Linking } from "react-native";
import { marketplaceTagsStyles, classesStyles, defaultTextProps, renderersProps, computeEmbeddedMaxWidth, ignoredStyles, systemFonts } from "../../utils/htmlStyles";

import { MARKETPLACE_ICON } from "../../components/TypeIcon/utils/iconTypes";
import Header from "../../components/Header";
import CategoryCard from "../../components/CategoryCard";

import makeup_icon from "../../components/TypeIcon/utils/imgs/icone_makeup.png";
import bike_icon from "../../components/TypeIcon/utils/imgs/icone_bike.png";
import nannies_icon from "../../components/TypeIcon/utils/imgs/icone_nannies.png";
import hair_icon from "../../components/TypeIcon/utils/imgs/icone_hair.png";
import conci_icon from "../../components/TypeIcon/utils/imgs/icone_conci.png";
import { mapHtml } from "../../utils/mapHtml";

export default function Marketplace() {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [data, setData] = useState([]);
  const [marketplaceLinks, setMarketplaceLinks] = useState([]);
  const route = useRoute();
  const route_data = route.params;
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const { setLoading, setAwaitLoading /* , setOffersController */ } =
    useContext(AppContext);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);
  const { width, heigth } = useWindowDimensions();
  const dispatch = useDispatch();

  const getData = async () => {
    // previousURL = "https://www.kids2gether.com.br/wp-json/wp/v2/posts?tags=89&_embed=1&status[]=publish&status[]=private"
    const options = {
      method: "GET",
      url: "https://www.kids2gether.com.br/wp-json/wp/v2/posts?tags=89&_embed=1&status[]=publish",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${user.user.token}`,
      },
    };
    try {
      const response = await axios.request(options);
      const filteredResponse = response.data.filter((cat) =>
        cat.categories.includes(route_data.id_local)
      );
      const mappedLinks = mapHtml(filteredResponse);
      setData(mappedLinks.data);
      setMarketplaceLinks(mappedLinks.linksArray);
      setAwaitLoading(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setAwaitLoading(false);
      setLoading(false);
    }
  };

  const handleSelected = (item, id, category, name) => {
    const correctLink = marketplaceLinks.find(
      (sup) => sup.name.trim().toLowerCase() === name.toLowerCase()
    );
    navigation.navigate("marketplace-routes", {
      screen: "details",
      params: { item, id, category, name, whatsapp: correctLink?.whatsapp },
    });
  };

  useEffect(() => {
    if (isFocused) {
      if (user.user != null) {
        //We have a user logged
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
            if (data.length === 0) {
              getData();
            } else {
              setAwaitLoading(false);
              setLoading(false);
            }
            if (response.data.membership) {
              dispatch(setMembership(true));
            } else {
              dispatch(setMembership(false));
            }
          } catch (error) {
            setData([]);
            setAwaitLoading(false);
            setLoading(false);
            dispatch(setMembership(false));
          }
        })();
      } else {
        if (data.length === 0) {
          getData();
        } else {
          setAwaitLoading(false);
          setLoading(false);
        }
      }
    }

    if (route_data) {
      setColor(
        MARKETPLACE_ICON.filter((item) => item.name === route_data.name)[0]
          .color
      );
      setTitle(route_data.name);
      setIcon(
        route_data.name === "maquiagem"
          ? makeup_icon
          : route_data.name === "bike"
          ? bike_icon
          : route_data.name === "babás"
          ? nannies_icon
          : route_data.name === "cabeleireiro"
          ? hair_icon
          : route_data.name === "concierge"
          ? conci_icon
          : null
      );
    }
  }, [route_data, isFocused]);

  const handleLinkButton = (name) => {
    const correctLink = marketplaceLinks.find(
      (sup) => sup.name.trim().toLowerCase() === name.toLowerCase()
    );
    Linking.openURL(correctLink.whatsapp);
  };

  if (data.length === 1) {
    return (
      <>
        <ScrollView
          style={styles.view_one_container}
          ref={scrollViewRef}
          onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
        >
          {data && (
            <>
              <View>
                <View style={styles.background_overlay}></View>
                <View style={styles.header_content}>
                  <Header
                    icon={true}
                    onBack={() => navigation.dispatch(CommonActions.goBack())}
                  />
                </View>
                <ImageBackground
                  source={{
                    uri: `${data[0].yoast_head_json.og_image[0].url}`,
                  }}
                  style={styles.image}
                />
                <View style={styles.align_content}>
                  <Text></Text>
                  <Text style={styles.title}>
                    {data[0].yoast_head_json.title.split("|")[0].trim()}
                  </Text>
                  <View></View>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 15,
                  marginTop: 15,
                  marginBottom: 10,
                }}
              >
                <HTML
                  source={{ html: data[0].content.rendered }}
                  contentWidth={width - 20}
                  tagsStyles={marketplaceTagsStyles}
                  classesStyles={classesStyles}
                  defaultTextProps={defaultTextProps}
                  renderersProps={renderersProps}
                  computeEmbeddedMaxWidth={computeEmbeddedMaxWidth(width - 20)}
                  enableExperimentalMarginCollapsing={true}
                  ignoredStyles={ignoredStyles}
                  systemFonts={systemFonts}
                />
              </View>
              <View style={styles.container_button}>
                <Pressable
                  style={styles.button}
                  onPress={() =>
                    handleLinkButton(
                      data[0].yoast_head_json.title.split("|")[0].trim()
                    )
                  }
                >
                  <Text style={styles.text_button}>QUERO CONTRATAR</Text>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
        <ScrollToTop reference={scrollViewRef} controller={scroll} />
      </>
    );
  }

  return (
    <>
      {data.length > 1 && (
        <ScrollView
          style={styles.view_container}
          ref={scrollViewRef}
          onScroll={(event) => setScroll(event.nativeEvent.contentOffset.y)}
        >
          <Header
            iconColor={"#333"}
            icon={true}
            title={title.toUpperCase()}
            color={"#333"}
            onBack={() => navigation.dispatch(CommonActions.goBack())}
          />
          <View style={styles.card_list}>
            {data.map((item, index) => (
              <CategoryCard
                color={color}
                verticalMargin={15}
                onPress={() =>
                  handleSelected(
                    item,
                    item.id,
                    item.title.rendered,
                    item.title.rendered
                  )
                }
                backgroundImage={{
                  uri: `${item.yoast_head_json.og_image[0].url}`,
                }}
                key={index}
                title={item.title.rendered}
              />
            ))}
          </View>
        </ScrollView>
      )}
      <ScrollToTop reference={scrollViewRef} controller={scroll} />
    </>
  );
}
