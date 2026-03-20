import React, { useContext, useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import UserInfo from "./UserInfo";
import Permissions from "../../components/Permissions";
import { useDispatch, useSelector } from "react-redux";
import { delUser, setMembership } from "../../reducer/userReducer";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { clearUserMarkers } from "../../reducer/mapReducer";

export default function Profile() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const userData = user?.user;
  const userId = userData?.user_id;
  const userToken = userData?.token;
  const dispatch = useDispatch();

  // membership temporary controller
  const [member, setMember] = useState(true);
  const { setLoading, setAwaitLoading } = useContext(AppContext);
  const { setDeleteAccountController } = useContext(UserContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    let active = true;

    const stopLoading = () => {
      if (!active) return;
      setAwaitLoading(false);
      setLoading(false);
    };

    if (!isFocused) {
      stopLoading();
      return () => {
        active = false;
      };
    }

    if (!userData || !userId) {
      stopLoading();
      return () => {
        active = false;
      };
    }

    if (!userToken) {
      stopLoading();
      Alert.alert("", "Sessão expirada. Por favor, faça login novamente.");
      navigation.navigate("home-routes", { screen: "home" });
      return () => {
        active = false;
      };
    }

    (async () => {
      const options = {
        method: "GET",
        url: `https://us-central1-kids2gether-4ca94.cloudfunctions.net/users/membership/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      try {
        const response = await axios.request(options);
        if (!active) return;
        const hasMembership = Boolean(response?.data?.membership);
        setMember(hasMembership);
        dispatch(setMembership(hasMembership));
      } catch (error) {
        if (!active) return;
        setMember(false);
        dispatch(setMembership(false));

        if (error?.response?.status === 404) {
          // New account fallback: backend membership record may not exist yet.
          return;
        }

        Alert.alert("", "Ocorreu um error");
        navigation.navigate("home-routes", { screen: "home" });
      } finally {
        stopLoading();
      }
    })();

    return () => {
      active = false;
      setAwaitLoading(false);
      setLoading(false);
    };
  }, [
    isFocused,
    userId,
    userToken,
    navigation,
    dispatch,
    setAwaitLoading,
    setLoading,
  ]);

  if (!userData) {
    return null;
  }

  return (
    <Animated.View
      exiting={SlideInLeft}
      entering={SlideInRight}
      style={styles.container}
    >
      <View style={styles.align_content}>
        <Header title={"PERFIL"} color={"#333"} />
        <UserInfo
          email={userData.user_email}
          name={userData.user_display_name}
        />
        <Permissions />
        <View style={styles.membership_content}>
          <Text>Assinatura</Text>
          {member ? (
            <CustomButton
              value={"GERENCIAR ASSINATURA"}
              onPress={() => navigation.navigate('profile-routes', { screen: "subscription" })}
            />
          ) : (
            <CustomButton
              value={"ASSINAR"}
              onPress={() => navigation.navigate('profile-routes', { screen: "get-premium" })}
            />
          )}
        </View>
      </View>
      <View style={styles.align_content}>
        <View style={styles.signin_content}>
          <TouchableOpacity
            onPress={() => navigation.navigate('profile-routes', { screen: 'privacy-policy' })}
          >
            <Text>Termos de Uso e Políticas de Privacidade</Text>
          </TouchableOpacity>
          <CustomButton
            value={"APAGAR CONTA"}
            onPress={() => setDeleteAccountController(true)}
            sx={{ backgroundColor: "#f00" }}
          />
          <CustomButton
            value={"DESCONECTAR"}
            onPress={async () => {
              dispatch(delUser());
              dispatch(clearUserMarkers());
              try {
                await AsyncStorage.removeItem("K2G");
              } catch (error) {
                console.log(error);
              }
              console.log("out");
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
}
