import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal_container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  modal_overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "#80CAA790",
  },
  modal_content: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 499,
  },
  modal_header: {
    marginBottom: 10,
    paddingVertical: 10,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginHorizontal: 20,
    width: 280,
  },
  header_content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  header_title: {
    fontSize: 16,
    fontFamily: "FredokaOne",
  },
  main_content: {
    gap: 10,
  },
  main_text: {
    fontSize: 16,
    fontFamily: "FredokaOne",
    textAlign: "center",
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
  actions_text: {
    fontSize: 16,
    fontFamily: "FredokaOne",
    textAlign: "center",
    color: "#fff",
    width: "100%",
  },
  imagen_icon: {
    marginTop: 25,
    marginBottom: 25,
    height: 70,
    width: 50,
  },
  actions_back_text: {
    textDecorationLine: "underline",
  },
});
