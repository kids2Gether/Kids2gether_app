import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    offcanvas_container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 500,
        alignItems: 'center',
    },
    offcanvas_overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    offcanvas_content: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 501,
        bottom: 0,
    },
    offcanvas_header: {
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'flex-end',
    },
    separator_line: {
        width: '105%',
        borderBottomWidth: 1,
        borderBottomColor: '#00000020',
        paddingTop: 10,
    },
});