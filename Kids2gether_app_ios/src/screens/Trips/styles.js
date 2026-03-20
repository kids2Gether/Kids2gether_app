import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view_container: {
    flex: 1,
    paddingTop: 20
  },
  navigation_content: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  back_icon: {
    fontSize: 40,
    color: "#fff",
  },
  header_content: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  header_background: {
    height: 300,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
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
  align_title_icon: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  title_icon: {
    width: 65,
    height: 65,
    backgroundColor: "#333",
  },
  card_list: {
    alignItems: "center",
    justifyContent: "center",
  },
});
