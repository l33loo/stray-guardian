import {TextInput, View} from "react-native";
import {Icon, makeStyles, Dialog, Input} from "@rneui/themed";
import { Header, Text} from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Map } from "../components/Map";
import Filters from "../components/Filters";
import {Button} from "@rneui/base";
import { useState } from "react";


export default () => {
  const styles = useStyles();
  const [filter, setFilter] = useState({
    dog: false,
    cat: false,
    bird: false,
    bat: false,
    cow: false,
    rabbit: false,
    unicorn: false,
    found: false,
    lost: false,
  });
  const [name, setName] = useState('Stray Guardian');
  const [token, setToken] = useState('');
  const [showDialog, setShowDialog] = useState(false);


  const handleSubmit = () => {
    setShowDialog(false);
    token === '' ? setName('Stray Guardian') : setName(token);
  };

  const dialogue = () => {
    return (
        <View>
          <TextInput
              placeholder='Please input your token'
              value={token}
              onChangeText={text => setToken(text)}
          />
          <Button title="Submit" onPress={handleSubmit}/>
        </View>
    )
  };
  return (

    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          barStyle="default"
          centerContainerStyle={{}}
          centerComponent={{ text: name, style: { color: '#fff' }}}
          containerStyle={{ width: "100%" }}
          leftContainerStyle={{}}
          linearGradientProps={{}}
          placement="center"
          rightComponent={{ icon: "add", color: "#fff" }}
          leftComponent={<View style={styles.leftContainer}>
            <Icon type={"material-community"} name={"key"} color="#FFFF" onPress={() => setShowDialog(true)} />
        </View>}
        />
        <Filters filter={filter} setFilter={setFilter} />
        <Map filter={filter} />
        {showDialog && ( // Conditionally render the dialog when showDialog is true
            <Dialog>
              {dialogue()}
            </Dialog>
        )}
      </View>
    </SafeAreaProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },

  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  header: {
    height: "30%",
    backgroundColor: "#fffff",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 5,
  },
  Icon: {
    paddingLeft: 20,
  }
}));
