import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Notifications from 'expo-notifications'
import { Switch } from 'react-native-paper'
import * as Location from 'expo-location'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        // notification sound 
        shouldPlaySound: true,
        // notification count 
        shouldSetBadge: true,
        // notification alert
        shouldShowAlert: true,
    }),
})

export default function Permissions() {
    const [enableNotification, setEnableNotification] = useState(false);
    const [enableGeolocation, setEnableGeolocation] = useState(false);
    const notificationRef = useRef(null);
    const geolocationRef = useRef(null);

    const handleToggleSwitch = (e) => {
        if (e === 'notification') {
            handleRequestNotification();
        } else {
            handleRequestGeolocation();
        }
    };

    const handleRequestNotification = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status == 'granted' && enableNotification == false) {
            setEnableNotification(true);
            return
        } 
        else if (status == 'granted' && enableNotification == true){
            setEnableNotification(false);
            return
        };
        setEnableNotification(!enableNotification);
    }

    const handleRequestGeolocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status == 'granted' && enableGeolocation == false) {
            setEnableGeolocation(true);
        } else if (status != "granted"){
            setEnableGeolocation(false);
        }
        else if (status == 'granted' && enableGeolocation == true){
            setEnableGeolocation(false);
        };
    };

    return (
        <View style={styles.permission_content}>
            <View style={styles.align_toggle_content} ref={notificationRef}>
                <Text>Permitir Notifications</Text>
                <Switch
                    value={enableNotification}
                    onValueChange={(e) => handleToggleSwitch("notification")}
                    color='#008877'
                />
            </View>
            <View style={styles.align_toggle_content} ref={geolocationRef}>
                <Text>Permitir Geolocalização</Text>
                <Switch
                    value={enableGeolocation}
                    onValueChange={(e) => handleToggleSwitch("geolocation")}
                    color='#008877'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    permission_content: {
        width: '80%',
        paddingTop: 10,
    },
    align_toggle_content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})