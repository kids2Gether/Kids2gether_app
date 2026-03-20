import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    insert_container: {
        backgroundColor: '#fff',
        width: "90%",
        gap: 10,
        paddingBottom: 30,
        paddingTop: 10,
        alignItems: 'center'
    },
    input_content: {
        gap: 10,
        width: '100%'
    },
    insert_input: {
        width: "100%",
        height: 90,
        borderColor: '#00000030',
        borderWidth: 1,
        fontSize: 16,
        paddingBottom: 60,
        paddingHorizontal: 10,
    },
    radio_group_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radio_content: {
        flexDirection: 'row-reverse',
    },
    button_content: {
        width: '100%',
        alignItems: 'flex-end',
        marginTop: 20
    },
    actions_button: {
        backgroundColor: '#FDB72E',
        padding: 15,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    actions_text: {
        fontSize: 16,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
        color: '#fff',
    },
});