import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_content: {
    width: '100%',
    height: 50,
    position: 'absolute',
    paddingHorizontal: 20,
    zIndex: 2,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_title: {
    fontFamily: "FredokaOne",
    color: "black",
    fontSize: 20,
    textTransform: "uppercase",
  },
  filter_icon: {
    position: 'absolute',
    zIndex: 2,
    marginTop: 40,
    right: 20,
  },
  map_view: {
    width: '100%',
    height: '100%',
  },
  gps_container: {
    zIndex: 2,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  gps_content: {
    backgroundColor: "white",
    borderRadius: 44,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center"
  },
})
