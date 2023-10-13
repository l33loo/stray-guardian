import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { getPins } from "../queries";
import * as Location from "expo-location";

export const Map = React.memo(() => {
  const [pins, setPins] = useState<Array<any>>([]);
  const [location, setLocation] = useState<Region>({
    latitude: 0,
    latitudeDelta: 0.0025,
    longitude: 0,
    longitudeDelta: 0.0025,
  });

  useEffect(() => {
    const pins = getPins();
    setPins(pins);
  }, []);

  useMemo(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation({
        latitude: location.coords.latitude,
        latitudeDelta: 0.0025,
        longitude: location.coords.longitude,
        longitudeDelta: 0.0025,
      });
    })();
  }, []);

  const mapStyle = [
    {
      featureType: "all",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "landscape.man_made",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit.station.bus",
      stylers: [{ visibility: "off" }],
    },
  ];

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={location}
        customMapStyle={mapStyle}
        minZoomLevel={9.3}
      >
        {pins.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.listingType}
            description={`${marker.animalType}, ${marker.color}`}
            pinColor={marker.listingType === 'found' ? 'blue' : 'red'}
          />
        ))}
      </MapView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    alignSelf: "center",
  },
});
