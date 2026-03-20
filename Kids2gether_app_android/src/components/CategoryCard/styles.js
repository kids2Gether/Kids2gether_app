import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card_container: {
      width: 390,
      height: 239,
      alignItems: "center",
      paddingHorizontal: 10,
    },
    bg_image: {
      width: 390,
      height: 239,
      objectFit: "cover",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "black",
      // opacity: 0.8
    },
    bg_overlay: {
      width: 390,
      height: 239,
      position: "absolute",
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      opacity: 0.4,
    },
    title_align_container: {
      height: 180,
      position: "absolute",
      zIndex: 3,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    title_post: {
      color: "#fff",
      fontSize: 20,
//      fontWeight: '800',
      fontFamily: "Roboto_bold_italic",
      textAlign: "center",
      padding: 5,
      textShadowRadius: 5,
      textShadowColor: "#000",
      textShadowOffset: { width: 0, height: 0 },
    },
  });
  