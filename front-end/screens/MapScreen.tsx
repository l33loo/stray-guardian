import { TextInput } from "react-native";
import { Icon, Dialog } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Filters from "../components/Filters";
import { useState } from "react";
import { View } from "react-native";
import { makeStyles, Button } from "@rneui/themed";
import { Header } from "@rneui/themed";
import { Map } from "../components/Map";
import { Form } from "../components/Form";

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
  const [name, setName] = useState("Stray Guardian");
  const [token, setToken] = useState("");
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    setShowTokenDialog(false);
    token === "" ? setName("Stray Guardian") : setName(token);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          barStyle="default"
          centerContainerStyle={{}}
          centerComponent={{ text: name, style: { color: "#fff" } }}
          containerStyle={{ width: "100%" }}
          leftContainerStyle={{}}
          linearGradientProps={{}}
          placement="center"
          rightComponent={
            <View style={styles.leftContainer}>
              <Icon
                name={"add"}
                color="#FFFF"
                onPress={() => setIsFormOpen(true)}
              />
            </View>
          }
          leftComponent={
            <View style={styles.leftContainer}>
              <Icon
                type={"material-community"}
                name={"key"}
                color="#FFFF"
                onPress={() => setShowTokenDialog(true)}
              />
            </View>
          }
        />
        <Filters filter={filter} setFilter={setFilter} />
        <Map filter={filter} token={token} />
        <Form isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
        {showTokenDialog && ( // Conditionally render the dialog when showDialog is true
          <Dialog onBackdropPress={() => setShowTokenDialog(false)}>
            <View>
              <TextInput
                style={styles.dialogTextInput}
                placeholder="Please input your token"
                value={token}
                onChangeText={(text) => setToken(text)}
              />
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </Dialog>
        )}
      </View>
    </SafeAreaProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  dialogTextInput: {
    height: 100,
  },
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
  },
}));
