import { StatusBar } from "expo-status-bar";
import MapScreen from "./screens/MapScreen";
import { ThemeProvider, createTheme } from "@rneui/themed";

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
  return (
    <ThemeProvider theme={theme}>
      <MapScreen />
      <StatusBar />
    </ThemeProvider>
  );
}
