import React, { useEffect, useRef } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Callout, MapMarker } from 'react-native-maps'
import pin_plan from '../../../../../assets/map/pin-plan.png'
import heart_icon from '../../../../../assets/map/icon_heart.png'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MarkerWant({ coordinate, content, onPress, onTouchContent }) {
    const markerRef = useRef(null);

    const hideCallout = () => {
        markerRef.current.hideCallout();
    };

    return (
        <MapMarker
            coordinate={coordinate}
            tracksViewChanges={false}
            ref={markerRef}
        >

            <Image source={pin_plan} style={styles.content_image} />
            <Callout tooltip={true} onPress={onPress}>
                <View style={styles.content_desc}>
                    <View style={styles.align_heart_icon}>
                        <Text style={{ width: '100%', height: '100%', textAlignVertical: "center", paddingBottom: 10 }}>
                            <Image source={heart_icon} style={styles.icon_heart} />
                        </Text>
                    </View>
                    <View style={styles.align_text}>
                        <Text style={styles.content_text}>{content}</Text>
                    </View>
                    <View style={styles.align_edit_icon}>
                        <Icon name="edit" size={20} color="grey" />
                    </View>
                </View>
            </Callout>
        </MapMarker>
    )
}

const styles = StyleSheet.create({
    content_image: {
        width: 27,
        height: 34
    },
    content_desc: {
        flexDirection: "row",
        width: 290,
        height: 85,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        padding: 5,
        marginBottom: 5,
        backgroundColor: "#FFF"
    },
    align_heart_icon: {
        flex: 0,
        height: "100%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    icon_heart: {
        width: 30,
        height: 23,
        objectFit: 'contain'
    },
    align_text: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    content_text: {
        fontFamily: "FredokaOne",
        fontSize: 15,
        color: "#222",
    },
    align_edit_icon: {
        flex: 0,
        height: "100%",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8
    }
})