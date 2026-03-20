import React, { useEffect, useRef } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Callout, MapMarker } from 'react-native-maps'
import pin_trip from '../../../../../assets/map/pin-trip.png'
import tick_icon from '../../../../../assets/map/icon_tick.png'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MarkerVisited({ coordinate, content, onPress }) {
    const markerRef = useRef(null);

    const hideCallout = () => {
        markerRef.current.hideCallout();
    };

    const handleSelected = () => {
        onPress()
    }

    return (
        <MapMarker
            coordinate={coordinate}
            tracksViewChanges={false}
            ref={markerRef}
        >

            <Image source={pin_trip} style={styles.content_image} />
            <Callout tooltip={true} onPress={() => handleSelected()}>
                <View style={styles.content_desc}>
                    <View style={styles.align_tick_icon}>
                        <Text style={{ width: '100%', height: '100%', textAlignVertical: "center", paddingBottom: 10 }}>
                            <Image source={tick_icon} style={styles.icon_tick} />
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
    align_tick_icon: {
        flex: 0,
        height: "100%",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    icon_tick: {
        width: 30,
        height: 23
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