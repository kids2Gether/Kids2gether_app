import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modal_container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal_overlay_touchable: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    modal_overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: '#80CAA790',
    },
    modal_content: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 2,
        elevation: 20,
    },
    modal_header: {
        marginBottom: 10,
        paddingVertical: 10,
    },
});
