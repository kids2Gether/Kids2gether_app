import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import startup_logo from "../../../assets/icon.png";
import { AppContext } from "../../contexts/AppContext";
import AirplaneAnimation from "../../../assets/animations/airplane";
import Animated, { BounceIn, FadeOut } from "react-native-reanimated";

export default function LoadingScreen() {
  const {
    loading,
    setLoading,
    awaitLoading,
    setAwaitLoading,
    isStartupLoading,
    setIsStartupLoading,
  } = useContext(AppContext);

  const endAnimation = () => {
    setLoading(false);
    if (isStartupLoading) {
      setIsStartupLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) return;

    // Failsafe: never keep the full-screen overlay forever.
    const timeoutId = setTimeout(() => {
      setAwaitLoading(false);
      setLoading(false);
      setIsStartupLoading(false);
    }, 12000);

    return () => clearTimeout(timeoutId);
  }, [loading, setAwaitLoading, setLoading, setIsStartupLoading]);

  useEffect(() => {
    if (!loading && isStartupLoading) {
      setIsStartupLoading(false);
    }
  }, [isStartupLoading, loading, setIsStartupLoading]);

  const logoSource = startup_logo;
  const containerStyle = isStartupLoading
    ? styles.loading_container_startup
    : styles.loading_container;

  return (
    <>
      {loading && (
        <Animated.View
          style={[containerStyle]}
          exiting={FadeOut}
          pointerEvents="none"
        >
          <AirplaneAnimation
            onAnimationFinish={() => {
              if (!awaitLoading) endAnimation();
            }}
          />
          <Animated.Image
            entering={BounceIn.delay(500)}
            fadeDuration={200}
            exiting={FadeOut}
            source={logoSource}
            style={styles.app_logo}
          />
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loading_container: {
    flex: 1,
    backgroundColor: "#80CAA7",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    width: "100%",
    height: "100%",
  },
  loading_container_startup: {
    flex: 1,
    backgroundColor: "#80CAA7",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    width: "100%",
    height: "100%",
  },
  app_logo: {
    width: 170,
    height: 170,
    objectFit: "contain",
    position: "absolute",
    zIndex: 1000,
  },
});
