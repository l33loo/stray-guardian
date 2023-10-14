import { useState } from 'react';
import { Button, Image, Modal, Text, TextInput, View } from 'react-native';
import { Card, Icon, Tab } from "@rneui/base";
import ImagePicker from 'expo-image-picker';

export function Form() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [observationsField, setObservationsField] = useState<string>('');
    const [emailField, setEmailField] = useState<string>('');
    const [phoneField, setPhoneField] = useState<string>('');
    const [lastSeenDateField, setLastSeenDateField] = useState<string>('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            // setShowAppOptions(true);
        } else {
            alert('You did not select any image.');
        }
    };
    
    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            // setShowAppOptions(true);
        } else {
            alert('You did not select any image.');
        }
    };

    return (
        <Modal
            visible={isFormOpen}
            animationType="slide"
            onRequestClose={() => setIsFormOpen(false)}
            style={{display: 'flex'}}
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
            <View>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            </View>
            <View>
                <View style={{position:"relative", alignItems:"center"}}>
                    {/* <Image
                        style={{ height: 300, width: 300 }}
                        resizeMode="contain"
                        source={{ uri: modalContent ? modalContent.photoUrl : '' }}
                    /> */}
                </View>
                <View style={{padding: 20}}>
                    { tabIndex === 0 &&
                        (<>
                            <Text>Last seen on:</Text>
                                <TextInput
                                // style={styles.input}
                                onChangeText={setLastSeenDateField}
                                value={lastSeenDateField}
                            />
                        </>
                        )
                    }

                    <Text>Observations:</Text>
                    <TextInput
                        // style={styles.input}
                        onChangeText={setObservationsField}
                        value={observationsField}
                    />
                    <Text>Email:</Text>
                    <TextInput
                        // style={styles.input}
                        onChangeText={setEmailField}
                        value={emailField}
                    />
                    <Text>Phone:</Text>
                    <TextInput
                        // style={styles.input}
                        onChangeText={setPhoneField}
                        value={phoneField}
                    />
                </View>
            </View>
            <Button
                // onPress={onPressLearnMore}
                title="Submit"
                color="#841584"
            />
        </Modal>
    )
}

