import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  form_container: {
    gap: 15,
    width: "100%",
    alignItems: "center",
  },
  actions_button: {
    backgroundColor: "#FDB72E",
    padding: 15,
    width: "100%",
    marginTop: 30,
  },
  actions_text: {
    fontSize: 16,
    fontFamily: "FredokaOne",
    textAlign: "center",
    color: "#fff",
  },
  form_input_container: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  form_input: {
    width: "86%",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    fontSize: 16,
    color: "#fff",
    paddingVertical: 10,
  },
  label_status: {
    color: "red",
    position: "absolute",
    right: 0,
  },
  text_info: {
    color: "#FFF",
    paddingBottom: 30,
    textAlign: 'justify'
  },
});
