import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  offcanvas_container: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 500,
    alignItems: "center",
  },
  offcanvas_overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  offcanvas_content: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 501,
    bottom: 0,
  },
  offcanvas_header: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "flex-end",
    marginBottom: -40,
    zIndex: 1000,
  },
  separator_line: {
    width: "105%",
    borderBottomWidth: 1,
    borderBottomColor: "#00000020",
    paddingTop: 10,
  },
});
