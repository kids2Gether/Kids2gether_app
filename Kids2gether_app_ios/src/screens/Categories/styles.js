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
        marginBottom: 15,
    },
    align_content: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 50,
        marginTop: 35,
        paddingHorizontal: 20,
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
});