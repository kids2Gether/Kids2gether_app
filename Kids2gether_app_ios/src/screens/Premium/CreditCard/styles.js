import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  field: {
    height: 50,
    width: 320,
    color: "#449aeb",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
  button_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginRight: 10,
  },
  button: {
    color: "#538BAC",
    fontWeight: "bold",
  },
  text_title: {
    fontFamily: "FredokaOne",
    fontSize: 16,
    color: "#000000",
    marginTop: 30,
  },
  title_container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
});
