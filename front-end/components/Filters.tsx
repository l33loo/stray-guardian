import { Button, Icon } from "@rneui/base";
import { ScrollView, View } from "react-native";
import { makeStyles } from "@rneui/themed";
import { useState } from "react";

export default () => {
  const styles = useStyles();
  const [filter, setFilter] = useState({
    "dog" : false,
    "cat" : false,
    "bird" : false,
    "bat" : false,
    "cow" : false,
    "rabbit" : false,
    "unicorn" : false,
  });



  return (
    <View style={styles.filterHeader}>
      <Button type="solid" style={styles.filterButton}>
        <Icon name="crosshairs" type="material-community" color="white" />
      </Button>
      <Button type="solid" style={styles.filterButton}>
        <Icon
          name="map-marker-question-outline"
          type="material-community"
          color="white"
          style={styles.filterIcon}
        />
      </Button>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterHeader}>
          <Button type="solid" style={styles.filterButton} onPress={
            () => setFilter({...filter, "dog": !filter["dog"]})
          }>
            <Icon name="dog" type="material-community" color={filter["dog"]?"white":"black"} />
          </Button>
          <Button type="solid" style={styles.filterButton} onPress={
            () => setFilter({...filter, "cat": !filter["cat"]})
          }>
            <Icon
              name="cat"
              type="material-community"
              color={filter["cat"]?"white":"black"}
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton} onPress={
            () => setFilter({...filter, "bird": !filter["bird"]})
          }>
            <Icon
              name="bird"
              type="material-community"
              color={filter["bird"]?"white":"black"}
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton} onPress={
            () => setFilter({...filter, "bat": !filter["bat"]})
          }>
            <Icon
              name="bat"
              type="material-community"
              color={filter["bat"]?"white":"black"}
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton} onPress={
            () => setFilter({...filter, "cow": !filter["cow"]})
          }>
            <Icon
              name="cow"
              type="material-community"
              color={filter["cow"]?"white":"black"}
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton} onPress={
            () => setFilter({...filter, "rabbit": !filter["rabbit"]})
          }>
            <Icon
              name="rabbit"
              type="material-community"
              color={filter["rabbit"]?"white":"black"}
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton} onPress={
            () => setFilter({...filter, "unicorn": !filter["unicorn"]})
          }>
            <Icon
              name="unicorn"
              type="material-community"
              color={filter["unicorn"]?"white":"black"}
              style={styles.filterIcon}
            />
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  filterIcon: {},
  filterButton: {
    backgroundColor: "red",
  },
  filterHeader: {
    backgroundColor: theme.colors.primary,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));
