import { Button, Icon } from "@rneui/base";
import { ScrollView, View } from "react-native";
import { makeStyles } from "@rneui/themed";
import React from "react";

export default (params: any) => {
  const styles = useStyles();
  const { filter, setFilter } = params;
  return (
    <View style={styles.filterHeader}>
      <Button type="solid" style={styles.filterButton}>
        <Icon
          name="crosshairs"
          type="material-community"
          color={filter["found"] ? "black" : "white"}
          onPress={() => setFilter({ ...filter, found: !filter["found"] })}
        />
      </Button>
      <Button type="solid" style={styles.filterButton}>
        <Icon
          name="map-marker-question-outline"
          type="material-community"
          style={styles.filterIcon}
          color={filter["lost"] ? "black" : "white"}
          onPress={() => setFilter({ ...filter, lost: !filter["lost"] })}
        />
      </Button>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterHeader}>
          <Button
            type="solid"
            style={styles.filterButton}
            onPress={() => setFilter({ ...filter, dog: !filter["dog"] })}
          >
            <Icon
              name="dog"
              type="material-community"
              color={filter["dog"] ? "black" : "white"}
            />
          </Button>
          <Button
            type="solid"
            style={styles.filterButton}
            onPress={() => setFilter({ ...filter, cat: !filter["cat"] })}
          >
            <Icon
              name="cat"
              type="material-community"
              color={filter["cat"] ? "black" : "white"}
              style={styles.filterIcon}
            />
          </Button>
          <Button
            type="solid"
            style={styles.filterButton}
            onPress={() => setFilter({ ...filter, bird: !filter["bird"] })}
          >
            <Icon
              name="bird"
              type="material-community"
              color={filter["bird"] ? "black" : "white"}
              style={styles.filterIcon}
            />
          </Button>
          <Button
            type="solid"
            style={styles.filterButton}
            onPress={() => setFilter({ ...filter, bat: !filter["bat"] })}
          >
            <Icon
              name="bat"
              type="material-community"
              color={filter["bat"] ? "black" : "white"}
              style={styles.filterIcon}
            />
          </Button>
          <Button
            type="solid"
            style={styles.filterButton}
            onPress={() => setFilter({ ...filter, cow: !filter["cow"] })}
          >
            <Icon
              name="cow"
              type="material-community"
              color={filter["cow"] ? "black" : "white"}
              style={styles.filterIcon}
            />
          </Button>
          <Button
            type="solid"
            style={styles.filterButton}
            onPress={() => setFilter({ ...filter, rabbit: !filter["rabbit"] })}
          >
            <Icon
              name="rabbit"
              type="material-community"
              color={filter["rabbit"] ? "black" : "white"}
              style={styles.filterIcon}
            />
          </Button>
          <Button
            type="solid"
            style={styles.filterButton}
            onPress={() =>
              setFilter({ ...filter, unicorn: !filter["unicorn"] })
            }
          >
            <Icon
              name="unicorn"
              type="material-community"
              color={filter["unicorn"] ? "black" : "white"}
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
