import React, { useRef } from "react";
import * as Location from "expo-location";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tour1 from "../assets/tour1.png";
import tour2 from "../assets/tour2.png";
import tour3 from "../assets/tour3.png";
import tour4 from "../assets/tour4.png";
import tour5 from "../assets/tour5.png";
import tour6 from "../assets/tour6.png";
import plane from "../assets/plane-solid.png";
import { useState } from "react";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { useSelector } from "react-redux";
import axios from "axios";

export default function FirstModal() {
  const [tourCurrentIndex, setTourCurrentIndex] = useState(0);
  const [tourButtonLabel, setTourButtonLabel] = useState("PROXIMO");
  const [tourModalVisible, setTourModalVisible] = useState(true);
  const [suggestionModalVisible, setSuggestionModalVisible] = useState(false);
  const [loaderModalVisible, setLoaderModalVisible] = useState(false);
  const [acceptedModalVisible, setAcceptedModalVisible] = useState(false);

  const [destinoStatus, setDestinoStatus] = useState("");
  const [nomeStatus, setNomeStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const carouselRef = useRef(null);
  const { width, height } = Dimensions.get("window");
  const user = useSelector((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const { setFirstTimeController, onFirstModalClose } = useContext(AppContext);

  const tourContent = [
    {
      content: (
        <Text
          style={[
            {
              fontFamily: "FredokaOne",
              fontSize: 18,
              color: "white",
              textAlign: "center",
            },
          ]}
        >
          Que bom ter você aqui no Kids2gether, um guia de viagem para famílias
          que amam viajar juntas!
        </Text>
      ),
      backgroundColor: "#8dc9a7",
      image: (
        <Image
          source={tour1}
          resizeMode="contain"
          style={{ width: "100%", height: 175 }}
        />
      ),
    },
    {
      content: (
        <Text
          style={[
            {
              fontFamily: "FredokaOne",
              fontSize: 18,
              color: "white",
              textAlign: "center",
            },
          ]}
        >
          Aqui, você viaja o mundo com seus filhos e tem acesso a dicas kids
          friendly na palma da sua mão!{"\n"}São mais de 40 destinos.
        </Text>
      ),
      backgroundColor: "#fab81c",
      image: (
        <Image
          source={tour2}
          resizeMode="contain"
          style={{ width: "100%", height: 175, marginTop: 20 }}
        />
      ),
    },
    {
      content: (
        <Text
          style={[
            {
              fontFamily: "FredokaOne",
              fontSize: 18,
              color: "white",
              textAlign: "center",
            },
          ]}
        >
          Encontra dicas de hospedagem, restaurantes roteiros kids friendly e
          atividades locais recomendadas para crianças de todas as idades!
        </Text>
      ),
      backgroundColor: "#f7bcbb",
      image: (
        <Image
          source={tour3}
          resizeMode="contain"
          style={{ width: "100%", height: 175 }}
        />
      ),
    },
    {
      content: (
        <Text
          style={[
            {
              fontFamily: "FredokaOne",
              fontSize: 18,
              color: "white",
              textAlign: "center",
            },
          ]}
        >
          E também curte as nossas Viagens Virtuais - onde você e seus filhos se
          divertem aprendendo sobre a cultura dos países mundo afora com vídeos
          exclusivos, atividades temáticas por destino e muito mais!
        </Text>
      ),
      backgroundColor: "#ea5139",
      image: (
        <Image
          source={tour4}
          resizeMode="contain"
          style={{ width: "100%", height: 175 }}
        />
      ),
    },
    {
      content: (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={[
              {
                fontFamily: "FredokaOne",
                fontSize: 18,
                color: "white",
                textAlign: "center",
              },
            ]}
          >
            O Kids2gether vai usar a localização em segundo plano para lhe
            oferecer as melhores oportunidades de serviços, pertinho de você,
            mesmo quando o aplicativo estiver fechado.
          </Text>
        </View>
      ),
      backgroundColor: "#1c8fa2",
      image: (
        <Image
          source={tour6}
          resizeMode="contain"
          style={{ width: "100%", height: 200 }}
        />
      ),
    },
    {
      content: (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={[
              {
                fontFamily: "FredokaOne",
                fontSize: 22,
                color: "white",
                textAlign: "center",
              },
            ]}
          >
            Aperte os cintos e{"\n"}vamos nessa!
          </Text>
          <Image
            source={plane}
            resizeMode="cover"
            style={{ width: 25, height: 20, marginTop: 30, tintColor: "#fff" }}
          />
        </View>
      ),
      backgroundColor: "#8dc9a7",
      image: (
        <Image
          source={tour5}
          resizeMode="contain"
          style={{ width: "100%", height: 200 }}
        />
      ),
    },
  ];

  const renderContent = ({ item }) => {
    return (
      <View
        style={{
          ...styles.renderContainer,
          backgroundColor: item.backgroundColor,
        }}
      >
        <View style={styles.renderImageContainer}>{item.image}</View>
        <View style={styles.renderContentContainer}>{item.content}</View>
      </View>
    );
  };
  const handleSend = async (data) => {
    Keyboard.dismiss();
    setDestinoStatus("");
    setNomeStatus("");
    setEmailStatus("");
    let destino = data.destino;
    let nome = data.nome;
    let email = data.email;
    if (!destino) {
      return setDestinoStatus("Destino é obrigatório");
    }
    if (!nome) {
      return setNomeStatus("Nome é obrigatório");
    }

    let regexEmail =
      /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
    if (!email) {
      return setEmailStatus("E-mail é obrigatório");
    }
    if (!regexEmail.test(email)) {
      return setEmailStatus("E-mail invalido");
    }

    //loader
    setLoaderModalVisible(true);
    setSuggestionModalVisible(false);

    //Here send the suggestion
    const options = {
      method: "POST",
      url: "https://us-central1-kids2gether-4ca94.cloudfunctions.net/suggestions/",
      headers: { "Content-Type": "application/json" },
      data: {
        suggestion: destino,
        name: nome,
        email: email,
      },
    };
    try {
      await Promise.race([
        axios.request(options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Sugestao timeout")), 10000)
        ),
      ]);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoaderModalVisible(false);
        setSuggestionModalVisible(false);
        setAcceptedModalVisible(true);
      }, 500);
    }
  };
  const askGeolocationPermissions = async () => {
    //Este metodo tem que ser refatorado pra sua versao em IOS
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        await Location.getCurrentPositionAsync();
      }
    } catch (error) {}
  };

  snapToItem = (index) => {
    setTourCurrentIndex(index);
    if (carouselRef.current.currentIndex == tourContent.length - 1) {
      askGeolocationPermissions(); 
      setTourButtonLabel("OK");
    } else {
      setTourButtonLabel("PRÓXIMO");
    }
  };

  const closeTourModal = async () => {
    if (carouselRef.current.currentIndex == tourContent.length - 1) {
   await AsyncStorage.setItem("TOUR_OPENED", "ok");
      setTourModalVisible(false);
      setTimeout(() => {
        setSuggestionModalVisible(true);
      }, 500);
    } else {
      carouselRef.current.snapToNext();
    }
  };

  return (
    <>
      {tourModalVisible && (
        <View style={styles.modalContainer}>
          <View style={{ height: height * 0.5 }}>
            <Carousel
              ref={carouselRef}
              data={tourContent}
              removeClippedSubviews={false}
              renderItem={renderContent}
              sliderWidth={300}
              itemWidth={300}
              inactiveSlideOpacity={0.3}
              inactiveSlideScale={0.7}
              containerCustomStyle={{ flexGrow: 1 }}
              onSnapToItem={snapToItem}
              layout={"default"}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Pagination
              dotsLength={tourContent.length}
              activeDotIndex={tourCurrentIndex}
              containerStyle={{
                ...styles.paginationContainerStyle,
                maxWidth: width,
                width: width,
              }}
              dotContainerStyle={styles.paginationDotContainerStyle}
              dotStyle={styles.paginationDotStyle}
              inactiveDotOpacity={0.5}
              inactiveDotScale={0.7}
            />
          </View>
          <View
            style={{ width: 300, display: "flex", justifyContent: "center" }}
          >
            <TouchableOpacity
              style={styles.actions_button}
              onPress={() => closeTourModal()}
            >
              <Text style={styles.actions_text}>{tourButtonLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {suggestionModalVisible && (
        <View style={styles.modalContainer}>
          <Text style={styles.title_form}>QUEREMOS SABER DE VOCÊ</Text>
          <Text style={styles.subtitle_form}>
            Qual destino você gostaria de ver aqui no Kids2Gether?
          </Text>
          <View style={styles.form_input_container}>
            <Controller
              control={control}
              name="destino"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    style={styles.form_input}
                    placeholderTextColor="#CCC"
                    onBlur={onBlur}
                    onFocus={() => setDestinoStatus("")}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Ex.: Japão, Caribe, Bahia..."
                  />
                  <Text style={styles.label_status}>{destinoStatus}</Text>
                </>
              )}
            />
          </View>
          <View>
            <Text style={styles.label_input}>Nome</Text>
            <View style={styles.form_input_container}>
              <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={styles.form_input}
                      placeholderTextColor="#CCC"
                      onBlur={onBlur}
                      onFocus={() => setNomeStatus("")}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Ex.: Patricia Alves"
                    />
                    <Text style={styles.label_status}>{nomeStatus}</Text>
                  </>
                )}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label_input}>Email</Text>
            <View style={styles.form_input_container}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      style={styles.form_input}
                      placeholderTextColor="#CCC"
                      onBlur={onBlur}
                      onFocus={() => setEmailStatus("")}
                      onChangeText={onChange}
                      value={value}
                      placeholder="patricia@email.com.br"
                    />
                    <Text style={styles.label_status}>{emailStatus}</Text>
                  </>
                )}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{ ...styles.actions_button, width: 270 }}
            onPress={handleSubmit(handleSend)}
          >
            <Text style={styles.actions_text}>ENVIAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onFirstModalClose(user)}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#555",
                textAlign: "center",
                textDecorationLine: "underline",
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              PULAR
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {loaderModalVisible && (
        <View style={styles.modal_main}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}

      {acceptedModalVisible && (
        <View style={styles.modalContainer}>
          <Text style={styles.title_form}>QUEREMOS SABER DE VOCÊ</Text>
          <Text style={{ ...styles.subtitle_form, paddingHorizontal: 40 }}>
            Obrigado pela sua participação!
          </Text>
          <TouchableOpacity
            style={{ ...styles.actions_button, width: 270 }}
            onPress={() => onFirstModalClose(user)}
          >
            <Text style={styles.actions_text}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
