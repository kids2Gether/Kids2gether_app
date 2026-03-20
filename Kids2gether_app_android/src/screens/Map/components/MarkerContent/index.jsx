import React, { useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Callout, MapMarker } from "react-native-maps";
import pin_content from "../../../../../assets/map/pin-content.png";
import plane_icon from "../../../../../assets/map/icon_plane.png";
import Icon from "react-native-vector-icons/Feather";

export default function MarkerContent({
  coordinate,
  content,
  onPress,
}) {
  const markerRef = useRef(null);

  const hideCallout = () => {
    markerRef.current.hideCallout();
  };

  const handleSelected = () => {
    onPress();
  };

  return (
    <MapMarker
      coordinate={coordinate}
      tracksViewChanges={false}
      ref={markerRef}
    >
      <Image source={pin_content} style={styles.content_image} />
      <Callout tooltip={true} onPress={() => handleSelected()}>
        <View style={styles.content_desc}>
          <View style={styles.align_plane_icon}>
            <Text
              style={{
                width: "100%",
                height: "100%",
                textAlignVertical: "center",
                paddingBottom: 10,
              }}
            >
              <Image source={plane_icon} style={styles.icon_plane} />
            </Text>
          </View>
          <View style={styles.align_text}>
            <Text style={styles.content_text}>{content}</Text>
          </View>
          <View style={styles.align_arrow_icon}>
            <Icon name="chevron-right" size={32} color="white" />
          </View>
        </View>
      </Callout>
    </MapMarker>
  );
}

const styles = StyleSheet.create({
  content_image: {
    width: 27,
    height: 34,
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
    backgroundColor: "#FDBF13",
  },
  align_plane_icon: {
    flex: 0,
    height: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon_plane: {
    width: 43,
    height: 25,
  },
  align_text: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content_text: {
    fontFamily: "FredokaOne",
    fontSize: 15,
    color: "white",
  },
  align_arrow_icon: {
    flex: 0,
    height: "100%",
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});
