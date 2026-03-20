import React from "react";
import { ActivityIndicator, View } from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { styles } from "./styles";

export default function Loader() {
  return (
    <View style={styles.modal_container} pointerEvents="none">
      <Animated.View entering={FadeIn} style={styles.modal_overlay} pointerEvents="none" />
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={styles.modal_content}
        pointerEvents="none"
      >
        <View style={styles.modal_main}>
          <ActivityIndicator size="large" color="green" />
        </View>
      </Animated.View>
    </View>
  );
}
