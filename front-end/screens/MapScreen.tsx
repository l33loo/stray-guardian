import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { makeStyles, Text, Button, useThemeMode } from "@rneui/themed";
import { Header } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Map } from "../components/Map"

export default () => {
  const styles = useStyles();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          backgroundImageStyle={{}}
          barStyle="default"
          centerComponent={{
            text: "MY TITLE",
            style: { color: "#fff" },
          }}
          centerContainerStyle={{}}
          containerStyle={{ width: "100%" }}
          leftComponent={{ icon: "menu", color: "#fff" }}
          leftContainerStyle={{}}
          linearGradientProps={{}}
          placement="center"
          rightComponent={{ icon: "home", color: "#fff" }}
          rightContainerStyle={{}}
          statusBarProps={{}}
        />
        <Map />
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
}));
