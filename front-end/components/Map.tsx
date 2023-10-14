import React, { useState, useEffect, useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Card, Icon, Image } from '@rneui/base';
import { getPins } from "../queries";
import * as Location from "expo-location";

export const Map = React.memo(() => {
  const [pins, setPins] = useState<Array<any>>([]);
  const [modalContent, setModalContent] = useState<Object | null>(null);
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
                        // title={marker.listingType}
                        // description={`${marker.animalType}, ${marker.color}`}
                        pinColor={marker.listingType === 'found' ? 'blue' : 'red'}
                        onPress={() => setModalContent(pins[index])}
                    />
                ))}
            </MapView>
            {modalContent && <Modal
                visible={modalContent !== null}
                animationType="slide"
                onRequestClose={() => setModalContent(null)}
                style={{display: 'flex'}}
            >
                <Icon 
                    name='close'
                    onPress={() => setModalContent(null)}
                    style={{alignSelf: 'flex-end', marginTop: 15, marginRight: 15}}
                />
                <Card.Title>
                    <Text style={styles.cardTitle}>
                        {`${modalContent ? modalContent.listingType : ""}`}
                    </Text>
                </Card.Title>
                <Card.Divider/>
                <View>
                    <View style={{position:"relative", alignItems:"center"}}>
                        <Image
                            style={{ height: 300, width: 300 }}
                            resizeMode="contain"
                            source={{ uri: modalContent ? modalContent.photoUrl : '' }}
                        />
                    </View>
                    <View style={{padding: 20}}>
                        <Text>Animal: {`${modalContent && modalContent.animalType}`}</Text>
                        <Text>Color: {`${modalContent ? modalContent.color : ""}`}</Text>
                        { modalContent && modalContent.listingType === 'lost' &&
                            (<Text>Last seen on: {`${modalContent ? modalContent.date : ""}`}</Text>)
                        }
                        { modalContent && modalContent.listingType === 'found' &&
                            (<Text>Seen on: {`${modalContent ? modalContent.date : ""}`}</Text>)
                        }
                        <Text>Observations: {`${modalContent && modalContent.observations}`}</Text>
                        <Text>Email: {`${modalContent && modalContent.email}`}</Text>
                        <Text>Phone: {`${modalContent ? modalContent.phone : ""}`}</Text>
                    </View>
                </View>
            </Modal>}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
    },
    cardTitle: {
        textTransform: 'uppercase',
    },
    cardIconWrap: {
        width: '100%',
        display: 'flex',
        alignContent: 'flex-end',
    },
});
