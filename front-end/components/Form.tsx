import { useState, useEffect } from 'react';
import { Button, Image, Modal, ScrollView, Text, TextInput, View } from 'react-native';
import { Card, Icon, Tab } from "@rneui/base";
import { makeStyles } from "@rneui/themed";
import * as ImagePicker from 'expo-image-picker';
import { setPin } from '../queries';
import * as Location from 'expo-location';

export function Form() {
    const styles = useStyles();

    const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [observationsField, setObservationsField] = useState<string>('');
    const [emailField, setEmailField] = useState<string>('');
    const [phoneField, setPhoneField] = useState<string>('');
    const [lastSeenDateField, setLastSeenDateField] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<any>(null);

    const pickImage = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (granted) {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
                // exif: true,
            });
        
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            } else {
                alert('You did not select any image.');
            }
        };
    };

    //     let location = await Location.getCurrentPositionAsync({});
    //     console.log("LOCATION <3 ");
    //     console.dir(location);
    //     setLocation({
    //     latitude: location.coords.latitude,
    //     latitudeDelta: 0.0025,
    //     longitude: location.coords.longitude,
    //     longitudeDelta: 0.0025,
    //     });
    // };
    
    const takeImage = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                // allowsEditing: true,
                quality: 1,
            });
        
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
                // setShowAppOptions(true);
            } else {
                alert('You did not select any image.');
            }
        }
    };

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
    }, []);

    const setPinOnSubmit = async () => {
        if (!selectedImage) {
            return;
        }
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        let body = new FormData();
        body.append('file', blob);
        body.append('status', tabIndex as any);
        body.append('lastSeen', lastSeenDateField as any);
        body.append('email', emailField)
        body.append('phone', phoneField as any);
        body.append('lat', location.latitude);
        body.append('long', location.longitude);

        const resp = await setPin(body);
    }

    return (
        <Modal
            visible={isFormOpen}
            animationType="slide"
            onRequestClose={() => setIsFormOpen(false)}
            // style={{display: 'flex'}}
        >
            <Icon 
                name='close'
                onPress={() => setIsFormOpen(false)}
                style={{alignSelf: 'flex-end', marginTop: 15, marginRight: 15}}
            />
            <Card.Title>
                <Tab
                    value={tabIndex}
                    onChange={(e) => setTabIndex(e)}
                    indicatorStyle={{
                        backgroundColor: 'grey',
                        height: 3,
                    }}
                    variant="default"
                >
                    <Tab.Item
                        title="Lost"
                    />
                    <Tab.Item
                        title="Found"
                    />
                </Tab>
            </Card.Title>
            <Card.Divider/>
            <ScrollView>
                <View>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    <Button title="Take an image" onPress={takeImage} />
                </View>
                <View>
                    <View style={{position:"relative", alignItems:"center"}}>
                        {selectedImage &&
                            <Image 
                                source={{ uri: selectedImage }}
                                style={{ width: 300, height: 600 }}
                                resizeMode="contain"
                            />
                        }
                    </View>
                    <View style={{padding: 20}}>
                        { tabIndex === 0 &&
                            (<>
                                <Text>Last seen on:</Text>
                                <TextInput
                                style={styles.input}
                                onChangeText={setLastSeenDateField}
                                value={lastSeenDateField}
                                />
                            </>
                            )
                        }

                        <Text>Observations:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setObservationsField}
                            value={observationsField}
                        />
                        <Text>Email:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmailField}
                            value={emailField}
                        />
                        <Text>Phone:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setPhoneField}
                            value={phoneField}
                        />
                    </View>
                </View>
                <Button
                // const [selectedImage, setSelectedImage] = useState<string | null>(null);
                // const [observationsField, setObservationsField] = useState<string>('');
                // const [emailField, setEmailField] = useState<string>('');
                // const [phoneField, setPhoneField] = useState<string>('');
                // const [lastSeenDateField, setLastSeenDateField] = useState<string>('');
            
                    onPress={setPinOnSubmit}
                    title="Submit"
                    color="#841584"
                />
            </ScrollView>
        </Modal>
    );
}

const useStyles = makeStyles(() => ({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
}));