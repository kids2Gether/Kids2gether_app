import React, { useContext, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { TextInput, View } from "react-native";
import { styles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../../reducer/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../../contexts/AppContext";
import {
  auth,
  createUserWithEmailAndPassword,
  getIdTokenResult,
  updateProfile,
} from "../../../services/firebase";
import { useNavigation } from "@react-navigation/native";

export default function FormAuth({ onBlur, onChange, value }) {
  const {
    setLoaderController,
    setKErrorController,
    setKError,
    setPopUpController,
    authRedirectIntent,
    setAuthRedirectIntent,
  } = useContext(AppContext);
  const user = useSelector((state) => state.user);
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [nomeStatus, setNomeStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleRegister = async (data) => {
    Keyboard.dismiss();
    setNomeStatus("");
    setEmailStatus("");
    setPasswordStatus("");

    let name = data.name;
    let email = data.email.toLowerCase();
    let password = data.password;
    let confirm_password = data.confirm_password;

    let regexEmail =
      /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

    if (!name) {
      return setNomeStatus("Insira um nome de usuário");
    }
    if (!email) {
      return setEmailStatus("Insira um email");
    }
    if (!regexEmail.test(email)) {
      return setEmailStatus("E-mail inválido");
    }
    if (password.length < 6) {
      return setPasswordStatus("Minimo 6 caracteres");
    }
    if (password !== confirm_password) {
      return setPasswordStatus("Confirmação não coincide");
    }

    try {
      setLoaderController(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credential.user, { displayName: name });
      const tokenResult = await getIdTokenResult(credential.user, true);
      const tokenExpires = Date.parse(tokenResult.expirationTime);

      const firebaseUser = {
        token: tokenResult.token,
        user_id: credential.user.uid,
        user_email: credential.user.email,
        user_display_name: name,
        user_nicename: name,
        membership: false,
        token_expires: tokenExpires || null,
      };

      dispatch(setUser(firebaseUser));
      await AsyncStorage.setItem("K2G", JSON.stringify(firebaseUser));
      
      //Here do the registration in firebase
      let fire_id = credential.user.uid;
      const optionsRegisterFirebase = {
        method: "POST",
        url: `https://us-central1-kids2gether-4ca94.cloudfunctions.net/users/${fire_id}`,
        headers: { "Content-Type": "application/json" },
        data: {
          id: fire_id,
          name: name,
          email: email,
          premium: false,
        },
      };
      
      try {
        const responseRegisterFirebase = await axios.request(optionsRegisterFirebase);
      } catch (err) {
        throw new Error(`ETAPA 3 - Registro Firebase falhou: ${err.message}`);
      }

      if (authRedirectIntent?.source?.startsWith("maps-")) {
        setAuthRedirectIntent(null);
        navigation.navigate("map-routes", { screen: "map" });
      }
      
      setLoaderController(false);
      // Popup de marketing desativado.
    } catch (error) {
      // Mostrar erro detalhado no Alert para debug
      const errorDetails = error.response 
        ? `Status: ${error.response.status}\nMensagem: ${JSON.stringify(error.response.data)}`
        : `Erro de rede: ${error.message}`;
      
      Alert.alert("DEBUG - Erro no Registro", errorDetails);
      
      setLoaderController(false);
      const errorCode = error?.code || "";
      if (errorCode.includes("auth/email-already-in-use")) {
        setKError("E-mail ja cadastrado. Recupere sua senha ou use outro e-mail.");
        setKErrorController(true);
        return;
      }
      if (errorCode.includes("auth/invalid-email")) {
        setKError("E-mail invalido.");
        setKErrorController(true);
        return;
      }
      if (errorCode.includes("auth/weak-password")) {
        setKError("Senha fraca. Use pelo menos 6 caracteres.");
        setKErrorController(true);
        return;
      }
      if (!error.response) {
        setKError("Problemas de conexao. Verifique sua internet e tente novamente.");
        setKErrorController(true);
        return;
      }
      setKError("Falha ao criar conta. Tente novamente mais tarde.");
      setKErrorController(true);
    }
  };

  return (
    <View style={styles.form_container}>
      <View style={styles.form_input_container}>
        <Icon name="user" size={20} color="#fff" />
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={styles.form_input}
                placeholderTextColor={"#fff"}
                onBlur={onBlur}
                onFocus={() => setNomeStatus("")}
                onChangeText={onChange}
                value={value}
                placeholder="Nome"
              />
              <Text style={styles.label_status}>{nomeStatus}</Text>
            </>
          )}
        />
      </View>
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
                placeholder="Email"
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
      <View style={styles.form_input_container}>
        <Icon name="lock" size={20} color="#fff" />
        <Controller
          control={control}
          name="confirm_password"
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
                  placeholder="Confirmação da Senha"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(p => !p)} style={{ paddingHorizontal: 4, paddingVertical: 10 }}>
                  <Icon name={showConfirmPassword ? "eye" : "eye-slash"} size={18} color="#fff" />
                </TouchableOpacity>
              </View>
              <Text style={styles.label_status}>{passwordStatus}</Text>
            </>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.actions_button}
        onPress={handleSubmit(handleRegister)}
      >
        <Text style={styles.actions_text}>CRIAR</Text>
      </TouchableOpacity>
    </View>
  );
}
