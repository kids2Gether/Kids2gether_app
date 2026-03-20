import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view_container: {
    flex: 1,
    paddingTop: 20,
  },
  view_one_container: {
    flex: 1,
  },
  align_title_icon: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  title_icon: {
    width: 65,
    height: 65,
  },
  card_list: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  header_content: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    paddingTop: 20,
    zIndex: 6,
  },
  back_icon: {
    fontSize: 40,
    color: "white",
    marginRight: 30,
    height: 40,
  },
  container_button: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
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
    width: "100%",
    height: 320,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "relative",
  },
  bottom_bar: {
    width: "100%",
    height: 10,
  },
  align_content: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "start",
    position: "absolute",
    zIndex: 5,
    top: 0,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontFamily: "FredokaOne",
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 35,
    marginTop: "4.5%",
  },
  iconPaseio: {
    width: 50,
    height: 50,
    position: "relative",
    marginBottom: 10,
  },
  button: {
    width: 336,
    height: 62,
    backgroundColor: "#80caa7",
  },
  text_button: {
    fontSize: 20,
    fontFamily: "FredokaOne",
    color: "white",
    textAlign: "center",
    top: 20,
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
  },
});
