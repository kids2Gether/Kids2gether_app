import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#ffffff",
    },
    page_title: {
        fontFamily: "FredokaOne",
        color: "#000",
        fontSize: 20,
        textAlign: "center",
    },
    align_content: {
        marginBottom: 20,
        marginTop: 10,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "FredokaRegular",
    },
    input_container: {
        width: "100%",
        borderRadius: 1,
        borderWidth: 1,
        borderColor: "#ececec",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 40,
    },
    search_input: {
        flex: 1,
        color: "#a8b6c8",
        fontSize: 14,
        fontFamily: "Roboto_regular",
        backgroundColor: "#ffffff",
        padding: 10,
    },
    search_icon: {
        position: "absolute",
        right: 20,
        marginRight: 10,
    },
    logo_paris: {
      width: 90,
      height: 90,
      right: 60,
    },
    container_header: {
      display: 'flex',
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "center",
      marginTop: 30,
    },
    argolas: {
      width: 150,
      height: 200,
      position: 'absolute'
    },
    details: {
        width: 474,
        height: 461,
        position: 'absolute',
        top: 300,
        left: 100,
      },
});