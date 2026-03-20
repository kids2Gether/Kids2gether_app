import React, { useContext, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { TextInput, View } from "react-native";
import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../reducer/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../../contexts/AppContext";
import {
  auth,
  getIdTokenResult,
  signInWithEmailAndPassword,
} from "../../../services/firebase";
import { useNavigation } from "@react-navigation/native";

export default function FormAuth({ onBlur, onChange, value }) {
  const user = useSelector((state) => state.user);
  const {
    setLoaderController,
    setKErrorController,
    setKError,
    authRedirectIntent,
    setAuthRedirectIntent,
  } = useContext(AppContext);
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleSignIn = async (data) => {
    Keyboard.dismiss();
    setEmailStatus("");
    setPasswordStatus("");
    let email = data.email.toLowerCase();
    let password = data.password;
    let regexEmail =
      /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

    if (!email) {
      return setEmailStatus("E-mail é obrigatório");
    }


    if (!regexEmail.test(email)) {
      return setEmailStatus("E-mail inválido");
    }
    if (!password) {
      return setPasswordStatus("Senha é obrigatória");
    }

    try {
      setLoaderController(true);
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const tokenResult = await getIdTokenResult(credential.user, true);
      const tokenExpires = Date.parse(tokenResult.expirationTime);

      const firebaseUser = {
        token: tokenResult.token,
        user_id: credential.user.uid,
        user_email: credential.user.email,
        user_display_name: credential.user.displayName || email,
        user_nicename: credential.user.displayName || email,
        membership: false,
        token_expires: tokenExpires || null,
      };

      dispatch(setUser(firebaseUser));
      await AsyncStorage.setItem("K2G", JSON.stringify(firebaseUser));

      if (authRedirectIntent?.source?.startsWith("maps-")) {
        setAuthRedirectIntent(null);
        navigation.navigate("map-routes", { screen: "map" });
      }
    } catch (error) {
      const errorCode = error?.code || "";
      if (errorCode.includes("auth/user-not-found")) {
        setKError("Usuario nao encontrado. Cadastre-se ou redefina sua senha.");
        setKErrorController(true);
        return;
      }
      if (errorCode.includes("auth/wrong-password")) {
        setKError("Login ou senha invalidos. Tente novamente.");
        setKErrorController(true);
        return;
      }
      if (errorCode.includes("auth/too-many-requests")) {
        setKError("Muitas tentativas. Tente novamente mais tarde.");
        setKErrorController(true);
        return;
      }
      setKError("Problemas de conexao. Verifique sua internet e tente novamente.");
      setKErrorController(true);
    } finally {
      setLoaderController(false);
    }
  };

  return (
    <View style={styles.form_container}>
      <View style={styles.form_input_container}>
        <Icon name="user" size={20} color="#fff" />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.form_input}
                placeholderTextColor={"#fff"}
                onBlur={onBlur}
                onFocus={() => setEmailStatus("")}
                onChangeText={onChange}
                value={value}
                placeholder="E-mail"
              />
              <Text style={styles.label_status}>{emailStatus}</Text>
            </>
          )}
        />
      </View>
      <View style={styles.form_input_container}>
        <Icon name="lock" size={20} color="#fff" />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#fff' }}>
                <TextInput
                  style={[styles.form_input, { flex: 1, width: undefined, borderBottomWidth: 0 }]}
                  placeholderTextColor={"#fff"}
                  onBlur={onBlur}
                  onFocus={() => setPasswordStatus("")}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Senha"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(p => !p)} style={{ paddingHorizontal: 4, paddingVertical: 10 }}>
                  <Icon name={showPassword ? "eye" : "eye-slash"} size={18} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={styles.label_status}>{passwordStatus}</Text>
            </>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.actions_button}
        onPress={handleSubmit(handleSignIn)}
      >
        <Text style={styles.actions_text}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}
