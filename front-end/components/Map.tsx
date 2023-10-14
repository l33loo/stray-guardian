import React, { useState, useEffect, useMemo } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Card, Icon, Image } from "@rneui/base";
import { getPins } from "../queries";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

export const Map = React.memo((params: any) => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState<Array<any>>([]);
  const [modalContent, setModalContent] = useState(null);
  const [location, setLocation] = useState<Region>({
    latitude: 0,
    latitudeDelta: 0.0025,
    longitude: 0,
    longitudeDelta: 0.0025,
  });
  const { filter } = params;

  useMemo(() => {
    (async () => {
      setLoading(true);
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        latitudeDelta: 0.0025,
        longitude: location.coords.longitude,
        longitudeDelta: 0.0025,
      });
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const pins = await getPins(filter);
        setPins(pins);
      })();
    }, 1000);

    return () => clearInterval(interval);
  }, [filter]);

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

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Loading map...</Text>
      </View>
    );
  }

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
            coordinate={{ latitude: marker.lat, longitude: marker.lon }}
            // title={marker.listingType}
            // description={`${marker.animalType}, ${marker.color}`}
            pinColor={marker.color}
            onPress={() => setModalContent(pins[index])}
          />
        ))}
      </MapView>
      {modalContent && (
        <Modal
          visible={modalContent !== null}
          animationType="slide"
          onRequestClose={() => setModalContent(null)}
          style={{ display: "flex" }}
        >
          <SafeAreaView>
            <Icon
              name="close"
              onPress={() => setModalContent(null)}
              style={{ alignSelf: "flex-end", marginTop: 15, marginRight: 15 }}
            />
            <Card.Title>
              <Text style={styles.cardTitle}>
                {`${modalContent ? modalContent.type : ""}`}
              </Text>
            </Card.Title>
            <Card.Divider />
            <View>
              <View style={{ position: "relative", alignItems: "center" }}>
                <Image
                  style={{ height: 300, width: 300 }}
                  resizeMode="contain"
                  source={{ uri: modalContent ? modalContent.photoUrl : "" }}
                />
              </View>
              <View style={{ padding: 20 }}>
                <Text>Animal: {`${modalContent && modalContent.type}`}</Text>
                <Text>
                  Color: {`${modalContent ? modalContent.color : ""}`}
                </Text>
                {modalContent && modalContent.status === 0 && (
                  <Text>
                    Last seen on:{" "}
                    {`${modalContent ? modalContent.lastSeen : ""}`}
                  </Text>
                )}
                {modalContent && modalContent.listingType === 0 && (
                  <Text>
                    Seen on: {`${modalContent ? modalContent.lastSeen : ""}`}
                  </Text>
                )}
                <Text>
                  Observations: {`${modalContent && modalContent.observations}`}
                </Text>
                <Text>Email: {`${modalContent && modalContent.email}`}</Text>
                <Text>
                  Phone: {`${modalContent ? modalContent.phone : ""}`}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    alignSelf: "center",
  },
  cardTitle: {
    textTransform: "uppercase",
  },
  cardIconWrap: {
    width: "100%",
    display: "flex",
    alignContent: "flex-end",
  },
});
