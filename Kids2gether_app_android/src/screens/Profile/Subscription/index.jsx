import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Header from "../../../components/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton";
import { UserContext } from "../../../contexts/UserContext";
import { useSelector } from "react-redux";
import axios from "axios";
import { AppContext } from "../../../contexts/AppContext";

export default function Subscription() {
  const navigation = useNavigation();
  const [plan, setPlan] = useState("Assinatura Especial");
  const [expirationDate, setExpirationDate] = useState("Sem data de expiração");
  const { setCancelSubcriptionController } = useContext(UserContext);
  const { setLoading, setAwaitLoading } = useContext(AppContext);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);
  const userData = user?.user;
  const userId = userData?.user_id;
  const userToken = userData?.token;
  const getPlanName = (plan) => {
    if (plan === "semiannual" || plan === "6") {
      return "Plano Semestral";
    } else if (plan === "annual" || plan === "12") {
      return "Plano Anual";
    } else if (plan === "price_1LpvlAGVnaoDv2sRct3uKjan") {
      return "Plano Semestral";
    } else if (plan === "price_1LpvlAGVnaoDv2sRTVkWSn1E") {
      return "Plano Anual";
    } else {
      return "Plano Mensal";
    }
  };

  const getExpiresDate = (timestampSeconds) => {
    if (!timestampSeconds) {
      return "Sem data de expiração";
    }

    const expiresDate = new Date(Number(`${timestampSeconds}000`))
      .toLocaleDateString("pt-br");
    let dateSplited = expiresDate.split("/");
    let day = dateSplited[0];
    let month = dateSplited[1];
    let year = dateSplited[2];
    let months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    let myMonth = months[parseInt(month) - 1];
    return `${day} de ${myMonth} de ${year}`;
  };

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

    if (!userId || !userToken) {
      stopLoading();
      setPlan("Assinatura Especial");
      setExpirationDate("Sem data de expiração");
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
        let membershipInfo = response.data;

        if (membershipInfo.membership) {
          let plan = getPlanName(membershipInfo.subscription_plan);
          let expires = getExpiresDate(
            membershipInfo.subscription_current_period_end
          );
          setPlan(plan);
          setExpirationDate(expires);
        } else {
          setPlan("Assinatura Especial");
          setExpirationDate("Sem data de expiração");
        }
      } catch (error) {
        if (!active) return;

        setPlan("Assinatura Especial");
        setExpirationDate("Sem data de expiração");

        if (error?.response?.status !== 404) {
          Alert.alert("", "Ocorreu um erro.");
        }
      } finally {
        stopLoading();
      }
    })();

    return () => {
      active = false;
      setAwaitLoading(false);
      setLoading(false);
    };
  }, [isFocused, userId, userToken, setAwaitLoading, setLoading]);
  return (
    <View style={styles.container}>
      <Header
        icon={true}
        title={"ASSINATURA"}
        color={"#000"}
        onBack={() => navigation.goBack('profile-routes', {screen: "logged"})}
      />
      <View style={styles.align_container}>
        <View style={styles.align_content}>
          <Text style={styles.info_label}>Plano</Text>
          <Text style={styles.info_data}>{plan}</Text>
        </View>
        <View style={styles.align_content}>
          <Text style={styles.info_label}>Validade</Text>
          <Text style={styles.info_data}>{expirationDate}</Text>
        </View>
        <CustomButton
          value={"CANCELAR ASSINATURA"}
          onPress={() => setCancelSubcriptionController(true)}
          sx={{ backgroundColor: "#f00" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  footer_content: {
    paddingVertical: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  actions_button: {
    backgroundColor: "#FDB72E",
    padding: 15,
    width: "100%",
  },
  align_container: {
    width: "80%",
    gap: 15,
    marginTop: 30,
  },
  align_content: {
    gap: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#00000050",
  },
  info_label: {
    paddingBottom: 5,
  },
  info_data: {
    paddingLeft: 5,
  },
});
