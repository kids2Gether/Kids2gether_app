import React from "react";
import { Pressable, View } from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
} from "react-native-reanimated";
import { styles } from "./styles";

import MapInfo from "../../screens/Map/components/MapInfo";
import CreatePin from "../../screens/Map/components/CreatePin";
import PremiumInfo from "../../screens/Offers/PremiumInfo";
import RecoveryModal from "../../screens/Recovery/RecoveryModal";
import DeleteModal from "../../screens/Profile/DeleteModal";
import CreditCard from "../../screens/Premium/CreditCard";
import Confirmacao from "../../screens/Premium/Confirmacao";
import MarkerFilter from "../../screens/Map/components/MarkerFilter";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import PaymentConfirm from "../../screens/Premium/PaymentConfirm";

export default function Modal({ variant }) {
  const { closeMapOverlays } = useContext(AppContext);

  const handleOverlayClose = () => {
    if (variant === "map" || variant === "map-filter" || !variant || variant === "pin") {
      closeMapOverlays();
    }
  };

  return (
    <View style={styles.modal_container}>
      <Pressable style={styles.modal_overlay_touchable} onPress={handleOverlayClose}>
        <Animated.View entering={FadeIn} style={styles.modal_overlay} pointerEvents="none" />
      </Pressable>
      <Animated.View
        entering={SlideInDown}
        style={styles.modal_content}
      >
        <View style={styles.modal_main}>
          {variant === "map" ? (
            <MapInfo />
          ) : variant === "map-filter" ? (
            <MarkerFilter />
          ) : /* variant === "offers" ? (
            <PremiumInfo />
          ) : */ variant === "recovery_error" ? (
            <RecoveryModal type="error" />
          ) : variant === "recovery_ok" ? (
            <RecoveryModal type="ok" />
          ) : variant === "delete_account" ? (
            <DeleteModal type="delete" />
          ) : variant === "cancel_subcription" ? (
            <DeleteModal type="cancel" />
          ) : variant === "credit_card" ? (
            <CreditCard />
          ) : variant === "confirm_card" ? (
            <Confirmacao />
          ) : variant === "payment_confirm" ? (
            <PaymentConfirm />
          ) : variant === "pin" ? (
            <CreatePin />
          ) : (
            <CreatePin />
          )}
        </View>
      </Animated.View>
    </View>
  );
}