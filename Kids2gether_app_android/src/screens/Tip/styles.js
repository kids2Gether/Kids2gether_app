import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view_container: {
    flex: 1,
  },
  header_content: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
    position: "absolute",
    zIndex: 6,
  },
  back_icon: {
    fontSize: 40,
    color: "white",
    marginRight: 30,
    height: 40,
  },
  navIconText: {
    fontSize: 18,
    color: "white",
    textAlignVertical: "center",
    height: 40,
  },
  background_overlay: {
    position: "absolute",
    zIndex: 1,
    opacity: 0.4,
    backgroundColor: "black",
    width: "100%",
    height: 320,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  bottom_bar: {
    width: "100%",
    height: 10,
  },
  align_content: {
    width: "100%",
    height: 320,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    zIndex: 5,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontFamily: "FredokaOne",
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 35,
    marginTop: 50,
  },
  iconPaseio: {
    width: 50,
    height: 50,
    position: "relative",
    marginBottom: 10,
  },
});
