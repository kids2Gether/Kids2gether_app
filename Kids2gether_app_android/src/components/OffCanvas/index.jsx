import React, { useContext, useEffect, useState } from "react";
import { Keyboard, TouchableOpacity, View, Pressable } from "react-native";
import { styles } from "./styles";
import Animated, { SlideInDown } from "react-native-reanimated";
import { AppContext } from "../../contexts/AppContext";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import PopUp from "../PopUp";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function OffCanvas({ children, variant }) {
  const {
    offCanvasController,
    popUpController,
    closeMapOverlays,
  } =
    useContext(AppContext);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleClose = () => {
    closeMapOverlays();
  };

  const handlePopupClose = () => {
    closeMapOverlays();
  };

  if (variant == "map") {
    return (
      <>
        {offCanvasController && (
          <View style={styles.offcanvas_container}>
            <Pressable style={styles.offcanvas_overlay} onPress={handleClose} />
            {children && (
              <View style={[styles.offcanvas_content, { bottom: keyboardHeight }]}>
                <Animated.View entering={SlideInDown} style={{ width: '100%' }}>
                  <View style={styles.offcanvas_header}>
                    <TouchableOpacity onPress={() => handleClose()}>
                      <Text>Fechar</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.separator_line}></View>
                  {children}
                </Animated.View>
              </View>
            )}
          </View>
        )}
      </>
    );
  } else if (variant == "popup") {
    return (
      <>
        {popUpController && (
          <View style={[styles.offcanvas_container]}>
            <Pressable style={styles.offcanvas_overlay} onPress={handlePopupClose} />
            <Animated.View
              entering={SlideInDown}
              style={popup_styles.container}
            >
              <View style={styles.offcanvas_header}>
                <TouchableOpacity onPress={handlePopupClose}>
                  <Icon name="close" color="#333" size={32} />
                </TouchableOpacity>
              </View>
              <PopUp />
            </Animated.View>
          </View>
        )}
      </>
    );
  }
}

export const popup_styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: "#fff",
    height: "85%", // Height of the popup
    width: "80%", // Width of the popup
    position: "absolute",
    zIndex: 502,
    top: "7%",
    alignSelf: "center",
  },
});
