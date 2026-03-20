import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000cc',
        alignItems: 'center',
        paddingTop: 25,
    },
    align_content: {
        width: '70%',
        alignItems: 'center',
    },
    forgot_password: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'FredokaOne',
        textAlign: 'right',
        width: '100%',
        marginTop: 20,
    },
    line_view: {
        backgroundColor: 'white',
        height: 1,
        flex: 1,
        alignSelf: 'center'
    },
    align_line_view: {
        flexDirection: 'row',
        marginTop: 25,
    },
    line_text: {
        color: 'white', 
        alignSelf: 'center', 
        paddingHorizontal: 5, 
        fontFamily: 'Roboto_regular',
        fontSize: 14
    },
    align_text: {
        marginTop: 50,
    },
    create_account: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'FredokaOne',
    },
    app_terms: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Roboto_regular',
        textDecorationLine: 'underline',
    },
});