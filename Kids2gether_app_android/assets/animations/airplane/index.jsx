import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import airplane from "./animation-plane.json";

export default function AirplaneAnimation({ onAnimationFinish }) {
  return (
    <AnimatedLottieView
      source={airplane}
      autoPlay={true}
      loop={false}
      style={styles.airplane_animation}
      onAnimationFinish={onAnimationFinish}
      duration={1000}
    />
  );
}

const styles = StyleSheet.create({
  airplane_animation: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 2.0 }, { rotate: "-90deg" }],
  },
});
