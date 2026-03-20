import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Header({ icon, iconColor, onBack, title, color }) {
    return (
        <View style={styles.header_content} >
            <TouchableOpacity onPress={onBack} style={styles.back_icon_align}>
                {icon ?
                    <Icon name="angle-left" style={[styles.back_icon, { color: iconColor ? iconColor : color ? color : "#fff" }]} />
                    : null
                }
            </TouchableOpacity>
            <Text style={[styles.title, { color: color ? color : "#fff" }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header_content: {
        height: 50,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        marginTop: 5,
    },
    title: {
        paddingTop: 5,
        fontSize: 20,
        fontFamily: "FredokaOne"
    },
    back_icon_align: {
        position: 'absolute',
        left: 10,
        padding: 5
    },
    back_icon: {
        fontSize: 40,
    },

});