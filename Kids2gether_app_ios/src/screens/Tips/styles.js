import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tips_container: {
        flex: 1,
    },
    header_content: {
        marginTop: 20,
        height: 300,
    },
    page_title: {
        fontFamily: "FredokaOne",
        color: "#fff",
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        zIndex: 3,
    },
    background_image: {
        width: "100%",
        height: 300,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    background_overlay: {
        position: "absolute",
        zIndex: 1,
        opacity: 0.4,
        width: "100%",
        height: 300,
        backgroundColor: "#000",
    },
    align_title: {
        position: "absolute",
        zIndex: 5,
        width: "100%",
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    bg_title: {
        fontFamily: "FredokaOne",
        color: "#fff",
        fontSize: 24,
        textAlign: 'center',
        marginTop: 20,
        textShadowRadius: 5,
        textShadowColor: "#000",
        textShadowOffset: { width: 0, height: 0 },
    },
    main_content: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    },
    post_card: {
        width: 380,
        height: 280,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
})