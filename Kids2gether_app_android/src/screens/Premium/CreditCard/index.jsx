import { useContext, useState } from "react";
import { styles } from "./styles";
import cardImg from "../../../../assets/card2.png";
import { UserContext } from "../../../contexts/UserContext";
import { AppContext } from "../../../contexts/AppContext";
import { Alert, Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { Keyboard } from "react-native";
import { addCard, pagar } from "../util/paymentFunction";
import { useSelector } from "react-redux";

export default function CreditCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const { paymentInfo, setPaymentInfo, setPaymentConfirmController } =
    useContext(UserContext);
  const {
    setCardController,
    setKErrorController,
    setKError,
    setLoaderController,
  } = useContext(AppContext);
  const user = useSelector((state) => state.user);

  // Formatar número do cartão com espaços
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.slice(0, 19);
  };

  // Formatar data de expiração MM/AA
  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Validar se todos os campos estão preenchidos
  const isCardComplete = () => {
    return (
      cardNumber.replace(/\s/g, "").length >= 13 &&
      cardName.length >= 3 &&
      cardExpiry.length === 5 &&
      cardCvv.length >= 3
    );
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!isCardComplete()) {
      Alert.alert(
        "",
        "Por favor, insira todos os dados do seu cartão corretamente."
      );
      return;
    }

    try {
      setCardController(false);
      setLoaderController(true);

      const token_user = user.user.token;
      const id_user = user.user.user_id;

      // Preparar dados do cartão para enviar ao backend
      const cardData = {
        card_number: cardNumber.replace(/\s/g, ""),
        card_holder_name: cardName.toUpperCase(),
        card_expiration_date: cardExpiry.replace("/", ""),
        card_cvv: cardCvv,
      };

      // Adicionar cartão via backend
      const cardResponse = await addCard(cardData, token_user, id_user);

      // Processar pagamento
      const paymentResponse = await pagar(
        {
          ...paymentInfo,
          card: {
            card_id: cardResponse.data.card_id,
          },
        },
        token_user,
        id_user
      );

      setLoaderController(false);
      setPaymentConfirmController(true);
    } catch (error) {
      console.log("Erro no pagamento:", error);
      setLoaderController(false);
      setKError(
        "Ops! Houve um problema ao processar o seu cartão, você não será cobrado."
      );
      setKErrorController(true);
    }
  };

  return (
    <View style={styles.title_container}>
      <Text style={styles.text_title}>PREENCHA O SEU CARTÃO</Text>

      <View style={{ width: "100%" }}>
        <Image
          source={cardImg}
          resizeMode="contain"
          style={{ width: "100%", height: 175 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Número do cartão"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={19}
            value={cardNumber}
            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
          />

          <TextInput
            style={styles.input}
            placeholder="Nome no cartão"
            placeholderTextColor="#999"
            autoCapitalize="characters"
            value={cardName}
            onChangeText={setCardName}
          />

          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/AA"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={5}
              value={cardExpiry}
              onChangeText={(text) => setCardExpiry(formatExpiry(text))}
            />

            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              value={cardCvv}
              onChangeText={setCardCvv}
            />
          </View>
        </View>

        <View style={styles.button_container}>
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.4}>
            <Text style={styles.button}>CONFIRMAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCardController(false)}
            activeOpacity={0.4}
          >
            <Text style={styles.button}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
