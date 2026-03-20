import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationAccuracy,
  watchPositionAsync,
} from "expo-location";
import { styles } from "./styles";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppContext } from "../../contexts/AppContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setUserMarkers } from "../../reducer/mapReducer";
import axios from "axios";
import MarkerContent from "./components/MarkerContent";
import MarkerVisited from "./components/MarkerVisited";
import MarkerWant from "./components/MarkerWant";

export default function Map() {
  const {
    mapController,
    mapFilterController,
    pinController,
    offCanvasController,
    popUpController,
    setMapController,
    setOffCanvasController,
    setOffCanvasVariant,
    setPinController,
    setPinData,
    setMapFilterController,
    setPopUpController,
    showContentMarker,
    showVisitedMarker,
    showWantMarker,
  } = useContext(AppContext);
  const FALLBACK_LOCATION = {
    coords: {
      accuracy: 46.96900177001953,
      altitude: 37.400001525878906,
      altitudeAccuracy: 6.70107364654541,
      heading: 302.0387268066406,
      latitude: -22.9489938430059,
      longitude: -43.211185549432386,
      speed: 0.10521680116653442,
    },
    mocked: false,
    timestamp: 1692460254005,
  };

  const [location, setLocation] = useState(FALLBACK_LOCATION);
  const mapRef = useRef(null);
  const user = useSelector((state) => state.user);
  const { contentMarkers, userMarkers } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { setLoaderController } = useContext(AppContext);
  const isBlockingOverlayOpen =
    mapController ||
    mapFilterController ||
    pinController ||
    offCanvasController ||
    popUpController;

  const requestLocationPermission = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition ?? FALLBACK_LOCATION);
      } else {
        setLocation(FALLBACK_LOCATION);
      }
    } catch (error) {
      setLocation(FALLBACK_LOCATION);
    }
  };

  const handleCenterUserPosition = async () => {
    try {
      await watchPositionAsync(
        {
          accuracy: LocationAccuracy.High,
          timeOut: 1000,
          distanceInterval: 1,
        },
        (newPosition) => {
          setLocation(newPosition);
          mapRef.current?.animateCamera({
            center: newPosition.coords,
            pitch: 0,
          });
        }
      );
    } catch (error) {
      setLocation({
        coords: {
          accuracy: 46.96900177001953,
          altitude: 37.400001525878906,
          altitudeAccuracy: 6.70107364654541,
          heading: 302.0387268066406,
          latitude: -22.9489938430059,
          longitude: -43.211185549432386,
          speed: 0.10521680116653442,
        },
        mocked: false,
        timestamp: 1692460254005,
      });
    }
  };

  const getUserMarkers = async () => {
    const options = {
      method: "GET",
      url: `https://us-central1-kids2gether-4ca94.cloudfunctions.net/usermarkers/${user.user.user_id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.user.token}`,
      },
    };
    try {
      const USER_MARKERS = await axios.request(options);
      dispatch(setUserMarkers(USER_MARKERS.data));
    } catch (error) {
      console.error(error);
    }
  };

  const selectedPin = (index) => {
    setOffCanvasController(true);
    setOffCanvasVariant("edit-pin");
    const data = userMarkers.filter((item) => item.id === index);
    setPinData(data);
  };

  const onContentPinClick = (id) => {
    navigation.navigate("map-routes", { screen: "map-trip", params: id });
  };

  const handleLongPress = (location) => {
    mapRef.current?.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.03,
    });
    if (user.user === null) {
      setPinController(true);
    } else {
      setPinData(location);
      setOffCanvasController(true);
      setOffCanvasVariant("create-pin");
    }
  };

  const onFilterPress = () => {
    setMapFilterController(true);
  };

  const closeMapOverlays = () => {
    setMapController(false);
    setMapFilterController(false);
    setPinController(false);
    setOffCanvasController(false);
    setPopUpController(false);
    setLoaderController(false);
  };

  useEffect(() => {
    let mounted = true;

    // Keep map overlays in a known state on initial enter.
    closeMapOverlays();
    setLoaderController(true);

    const timeoutId = setTimeout(() => {
      if (!mounted) return;
      setLocation((prev) => prev ?? FALLBACK_LOCATION);
      setLoaderController(false);
    }, 8000);

    (async () => {
      setMapController(true);
      await requestLocationPermission();
      if (mounted) setLoaderController(false);
    })();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      setLoaderController(false);
    };
  }, []);

  useEffect(() => {
    if (!isFocused) return;

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const hasOverlay =
          mapController ||
          mapFilterController ||
          pinController ||
          offCanvasController ||
          popUpController;

        if (!hasOverlay) return false;

        closeMapOverlays();
        return true;
      }
    );

    return () => subscription.remove();
  }, [
    isFocused,
    mapController,
    mapFilterController,
    offCanvasController,
    pinController,
    popUpController,
  ]);

  useEffect(() => {
    if (user.user !== null) {
      getUserMarkers();
    }
  }, [user.user]);

  useEffect(() => {
    if (isFocused) return;

    // Ensure map-scoped overlays never leak to other tabs/screens.
    closeMapOverlays();
  }, [
    isFocused,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header_content}>
        <Text style={styles.header_title}>Mapa</Text>
      </View>
      <TouchableOpacity
        style={styles.filter_icon}
        onPress={() => onFilterPress()}
      >
        <Icon name="filter-alt" size={30} color="#000" />
      </TouchableOpacity>
      {location && (
        <>
          <MapView
            ref={mapRef}
            style={styles.map_view}
            initialRegion={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsMyLocationButton={false}
            showsUserLocation={true}
            followsUserLocation={false}
            toolbarEnabled={false}
            showsCompass={false}
            scrollEnabled={!isBlockingOverlayOpen}
            zoomEnabled={!isBlockingOverlayOpen}
            rotateEnabled={!isBlockingOverlayOpen}
            pitchEnabled={!isBlockingOverlayOpen}
            onLongPress={(coordinate) => {
              handleLongPress(coordinate.nativeEvent.coordinate);
            }}
          >
            {showVisitedMarker &&
              userMarkers !== null &&
              userMarkers.map(
                (item) =>
                  item.type === "visited" && (
                    <MarkerVisited
                      key={item.id}
                      coordinate={item.coordinates}
                      content={item.content}
                      onPress={(e) => selectedPin(item.id)}
                    />
                  )
              )}
            {showWantMarker &&
              userMarkers !== null &&
              userMarkers.map(
                (item) =>
                  item.type === "want" && (
                    <MarkerWant
                      key={item.id}
                      coordinate={item.coordinates}
                      content={item.content}
                      onPress={(e) => selectedPin(item.id)}
                    />
                  )
              )}
            {contentMarkers !== null &&
              contentMarkers.map((item) => (
                <MarkerContent
                  key={item.id}
                  coordinate={item.coordinates}
                  content={item.content}
                  onPress={(e) => onContentPinClick(item.id)}
                />
              ))}
          </MapView>
          <TouchableOpacity
            onPress={() => handleCenterUserPosition()}
            style={styles.gps_container}
          >
            <View style={styles.gps_content}>
              <Icon name={"gps-fixed"} size={22} color="#000" />
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
