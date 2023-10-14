import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import MapScreen from "./screens/MapScreen";
import { ThemeProvider, createTheme, makeStyles } from "@rneui/themed";
import * as Location from "expo-location";
import { View, Text } from "react-native";

const theme = createTheme({
  lightColors: {
    primary: "#1f89dc",
    background: "white",
  },
  darkColors: {
    primary: "blue",
    background: "white",
  },
  components: {
    Button: {
      raised: true,
    },
  },
});

export default function App() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const styles = useStyles();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  if (errorMsg != null) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{errorMsg}</Text>
      </View>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <MapScreen />
      <StatusBar />
    </ThemeProvider>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
}));
