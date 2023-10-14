import { Dispatch, SetStateAction, useState } from 'react';
import { Image, Modal, Text, TextInput, View } from 'react-native';
import { Card, Icon, Tab } from "@rneui/base";
import ImagePicker from 'expo-image-picker';

export function Form() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [observationsField, setObservationsField] = useState<string>('');
    const [emailField, setEmailField] = useState<string>('');
    const [phoneField, setPhoneField] = useState<string>('');
    const [lastSeenDateField, setLastSeenDateField] = useState<string>('');

    // const pickImageAsync = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         quality: 1,
    //     });
    
    //     if (!result.canceled) {
    //         setSelectedImage(result.assets[0].uri);
    //         setShowAppOptions(true);
    //     } else {
    //         alert('You did not select any image.');
    //     }
    // };
    
    // const takeImageAsync = async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         allowsEditing: true,
    //         quality: 1,
    //     });
    
    //     if (!result.canceled) {
    //         setSelectedImage(result.assets[0].uri);
    //         setShowAppOptions(true);
    //     } else {
    //         alert('You did not select any image.');
    //     }
    // };

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
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
                >
                    <Tab.Item
                        title="Lost"
                        titleStyle={{ fontSize: 12 }}
                        icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                    />
                    <Tab.Item
                        title="Found"
                        titleStyle={{ fontSize: 12 }}
                        icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                    />
                </Tab>
            </Card.Title>
            <Card.Divider/>
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
        </Modal>
    )
}

