import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function CustomButton({ onPress, sx, value }) {
    return (
        <TouchableOpacity
            style={[styles.actions_button, sx]}
            onPress={onPress}
            activeOpacity={0.4}
        >
            <Text style={styles.actions_text}>{value}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
});