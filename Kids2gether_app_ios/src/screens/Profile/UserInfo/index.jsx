import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function UserInfo({ name, email }) {
    return (
        <View style={styles.container}>
            <View style={styles.align_content}>
                <Text style={styles.info_label}>Nome</Text>
                <Text style={styles.info_data}>{name ? name : null}</Text>
            </View>
            <View style={styles.align_content}>
                <Text style={styles.info_label}>E-mail</Text>
                <Text style={styles.info_data}>{email ? email : null}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        gap: 15,
        marginBottom: 10
    },
    align_content: {
        gap: 5,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#00000050"
    },
    info_label: {
        paddingBottom: 5
    },
    info_data: {
        paddingLeft: 5
    },
});