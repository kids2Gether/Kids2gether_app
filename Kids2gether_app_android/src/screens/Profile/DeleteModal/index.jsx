import React, { useContext } from "react";
import { Alert, Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { styles } from "./styles";
import { AppContext } from "../../../contexts/AppContext";
import alert from "../../../../assets/alert.png";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import { delUser } from "../../../reducer/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { clearUserMarkers } from "../../../reducer/mapReducer";

export default function DeleteModal({ type }) {
  const { setLoaderController } = useContext(AppContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { setDeleteAccountController, setCancelSubcriptionController } =
    useContext(UserContext);

  const getApiErrorMessage = (error) => {
    const status = error?.response?.status;

    if (!status) {
      return "Problemas de conexão. Verifique sua internet e tente novamente.";
    }

    if (status === 401 || status === 403) {
      return "Sua sessão expirou. Faça login novamente para continuar.";
    }

    if (status === 404) {
      return "Conta não encontrada. Atualize o app e tente novamente.";
    }

    if (status >= 500) {
      return "Erro no servidor. Tente novamente em instantes.";
    }

    return "Não foi possível concluir a operação. Tente novamente.";
  };

  const handleDeleteAccount = async () => {
    const token = user?.user?.token;

    if (!token) {
      Alert.alert("", "Sua sessão expirou. Faça login novamente para continuar.");
      return;
    }

    try {
      const options = {
        method: "POST",
        url: "https://us-central1-kids2gether-4ca94.cloudfunctions.net/users/delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          token: token,
        },
      };

      await axios.request(options);
      Alert.alert("", "Conta excluída com sucesso.");

      dispatch(delUser());
      dispatch(clearUserMarkers());
      await AsyncStorage.removeItem("K2G");
      setDeleteAccountController(false);
    } catch (error) {
      Alert.alert("", getApiErrorMessage(error));
    }
  };

  const handleCancelMembership = async () => {
    const token = user?.user?.token;
    const myuser = user?.user?.user_id;

    if (!token || !myuser) {
      Alert.alert("", "Sua sessão expirou. Faça login novamente para continuar.");
      return;
    }

    try {
      const options = {
        method: "POST",
        url: "https://us-central1-kids2gether-4ca94.cloudfunctions.net/subscriptions/cancel",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          user: myuser,
        },
      };

      await axios.request(options);
      setCancelSubcriptionController(false);
    } catch (error) {
      Alert.alert("", getApiErrorMessage(error));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_content}>
        <Text style={styles.header_title}>ATENÇÃO!</Text>
      </View>
      <View>
        <Image
          source={alert}
          style={{ ...styles.imagen_icon, width: 75, height: 70 }}
        />
      </View>
      <View style={styles.main_content}>
        {type === "delete" ? (
          <Text style={[styles.main_text]}>
            Você está prestes a excluir sua conta no Kids2Gether. Essa operação
            não poderá ser desfeita. Tem certeza de que deseja continuar?
          </Text>
        ) : (
          <Text style={[styles.main_text]}>
            Você está prestes a cancelar sua assinatura no Kids2Gether. Essa
            ação é irreversível. Tem certeza de que deseja continuar?
          </Text>
        )}
      </View>
      <View style={styles.footer_content}>
        <TouchableOpacity
          style={{ ...styles.actions_button, backgroundColor: "#f00" }}
          onPress={async () => {
            setLoaderController(true);
            if (type === "delete") {
              await handleDeleteAccount();
            } else {
              await handleCancelMembership();
            }
            setLoaderController(false);
          }}
        >
          {type === "delete" ? (
            <Text style={styles.actions_text}>APAGAR CONTA</Text>
          ) : (
            <Text style={styles.actions_text}>CANCELAR ASSINATURA</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actions_button}
          onPress={() =>
            type === "delete"
              ? setDeleteAccountController(false)
              : setCancelSubcriptionController(false)
          }
        >
          <Text style={styles.actions_text}>CANCELAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
