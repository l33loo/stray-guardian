import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getPins } from '../queries';

const AzoresRegionCoords = {
    latitude: 37.75209753678696,
    latitudeDelta: 0.0025,
    longitude: -25.666963858295674,
    longitudeDelta: 0.0025,
};

export const Map = React.memo(() => {
    const [pins, setPins] = useState<Array<any>>([]);

    useEffect(() => {
        const pins = getPins()
        setPins(pins);
    }, []);

    const mapStyle = [
        {
            "featureType": "all",
            "stylers": [
                { "visibility": "on" }
            ]
        },{
            "featureType": "landscape.man_made",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                { "visibility": "off" }
            ]
        },
        {
            "featureType": "transit.station.bus",
            "stylers": [
                { "visibility": "off" }
            ]
        }
    ];

    return (
        <View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={AzoresRegionCoords}
                customMapStyle={mapStyle}
                minZoomLevel={9.3}
            >
                {pins.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.listingType}
                        description={`${marker.animalType}, ${marker.color}`}
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
    map:{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
    }
});