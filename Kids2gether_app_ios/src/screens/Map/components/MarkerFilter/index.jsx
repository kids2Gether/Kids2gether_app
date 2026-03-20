import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import pin_plan from "../../../../../assets/map/pin-plan.png";
import pin_trip from "../../../../../assets/map/pin-trip.png";
import pin_content from "../../../../../assets/map/pin-content.png";
import { useContext } from "react";
import { AppContext } from "../../../../contexts/AppContext";

const MarkerSwitch = ({ icon, text, state, onValueChange }) => {
  return (
    <View style={styles.marker_switch_container}>
      <View style={styles.marker_switch_content}>
        <Image
          source={icon}
          resizeMode="cover"
          style={{ width: 27, height: 34 }}
        />
        <Text style={styles.switch_text}>{text}</Text>
      </View>
      <Switch value={state} onValueChange={onValueChange} color="#008877" />
    </View>
  );
};

export default function MarkerFilter() {
  const {
    setShowContentMarker,
    setShowVisitedMarker,
    setShowWantMarker,
    showContentMarker,
    showVisitedMarker,
    showWantMarker,
    setMapFilterController,
  } = useContext(AppContext);

  const handleToggleSwitch = (e) => {
    if (e === "plan") {
      setShowWantMarker(!showWantMarker);
    } else {
      setShowVisitedMarker(!showVisitedMarker);
    }
  };

  return (
    <View style={styles.filter_container}>
      <Text style={styles.filter_title}>FILTRO</Text>
      <View style={styles.filter_align_content}>
        <Text
          style={[
            styles.filter_title,
            { textAlign: "left", fontSize: 14, marginBottom: 10 },
          ]}
        >
          Mostrar no mapa:
        </Text>
        <MarkerSwitch
          icon={pin_plan}
          text={"Lugares que queremos ir"}
          state={showWantMarker}
          onValueChange={(e) => handleToggleSwitch("plan")}
        />
        <MarkerSwitch
          icon={pin_trip}
          text={"Viagens que fizemos"}
          state={showVisitedMarker}
          onValueChange={(e) => handleToggleSwitch("trip")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filter_container: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  filter_title: {
    fontFamily: "FredokaOne",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
  filter_align_content: {
    flex: 0,
    flexDirection: "column",
    width: "100%",
    marginTop: 15,
    width: 300,
  },
  marker_switch_container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  marker_switch_content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  switch_text: {
    fontFamily: "FredokaOne",
    fontSize: 14,
    color: "#5C6979",
    marginLeft: 5,
  },
});
