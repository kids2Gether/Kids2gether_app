import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background_overlay: {
    position: 'absolute',
    zIndex: 1,
    height: 300,
    width: "100%",
    opacity: 0.5,
  },
  navigation_content: {
    position: 'absolute',
    zIndex: 5,
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  header_background: {
    height: 300,
    width: "100%",
    justifyContent: 'flex-end',
  },
  bottom_bar: {
    width: "100%",
    height: 15,
  },
  background_content_align: {
    position: 'absolute',
    zIndex: 2,
    height: 300,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_title: {
    fontSize: 22,
    color: '#fff',
    fontFamily: "FredokaOne",
    textTransform: "uppercase",
  },
  header_subtitle: {
    fontSize: 14, 
    textTransform: 'lowercase',
    color: '#fff',
    fontFamily: "Roboto_bold",
  },
});