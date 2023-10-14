import { View } from "react-native";
import { makeStyles } from "@rneui/themed";
import { Header } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Map } from "../components/Map";
import Filters from "../components/Filters";
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

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          barStyle="default"
          centerContainerStyle={{}}
          containerStyle={{ width: "100%" }}
          leftContainerStyle={{}}
          linearGradientProps={{}}
          placement="center"
          rightComponent={{ icon: "add", color: "#fff" }}
        />
        <Filters filter={filter} setFilter={setFilter} />
        <Map filter={filter} />
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
