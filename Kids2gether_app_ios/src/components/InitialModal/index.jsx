import React from "react";
import { View } from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
} from "react-native-reanimated";
import { styles } from "./styles";
import FirstModal from "../../screens/Home/components/firstModal";

export default function InitialModal() {
  return (
    <View style={styles.modal_container}>
      <Animated.View entering={FadeIn} style={styles.modal_overlay} />
      <Animated.View
        entering={SlideInDown}
        style={styles.modal_content}
      >
        <FirstModal />
      </Animated.View>
    </View>
  );
}
