import { styles } from "./styles";
import { Image, Text, View } from "react-native";
import card from "../../../../assets/card.png";
import CustomButton from "../../../components/CustomButton";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { AppContext } from "../../../contexts/AppContext";
import { pagar } from "../util/paymentFunction";

export default function Confirmacao() {
  const { paymentInfo, setPaymentInfo } = useContext(UserContext);
  const { setCardController, setCardConfirmController } =
    useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MÉTODO DE PAGAMENTO</Text>
      <Image source={card} style={styles.imagen} resizeMode="contain" />
      <View>
        <CustomButton
          value={
            "CARTÃO '" +
            paymentInfo.card.brand.toUpperCase() +
            "' TERMINADO EM '" +
            paymentInfo.card.last4 +
            "'"
          }
          sx={{ marginBottom: 20 }}
          onPress={async () => {
            await pagar(paymentInfo);
            setCardConfirmController(false);
          }}
        />
      </View>
      <View>
        <CustomButton
          value={"UTILIZAR OUTRO CARTÃO"}
          onPress={() => {
            delete paymentInfo.card;
            setCardConfirmController(false);
            setCardController(true);
          }}
        />
      </View>
    </View>
  );
}
