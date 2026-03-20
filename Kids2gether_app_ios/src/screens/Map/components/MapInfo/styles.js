import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    header_content: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    header_title: {
        fontSize: 20,
        fontFamily: 'FredokaOne',
        color: "#80CAA7",
    },
    main_content: {
        gap: 10,
    },
    main_text: {
        fontSize: 16,
        fontFamily: 'FredokaOne',
    },
    borded_text: {
        color: '#80CAA7',
        borderStyle: 'dashed',
        borderTopWidth: 3,
        borderColor: '#FDB72E90',
        paddingTop: 10,
    },
    pin_content: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image_container: {
        gap: 10,
        marginRight: 5,
    },
    pin_image: {
        objectFit: 'contain',
        width: 25,
        height: 25,
    },
    footer_content: {
        paddingVertical: 10,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        gap: 15,
    },
    actions_button: {
        backgroundColor: '#FDB72E',
        padding: 15,
        width: '100%',
    },
    actions_text: {
        fontSize: 16,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
        color: '#fff',
    },
    actions_back_text: {
        textDecorationLine: 'underline',
    }
});