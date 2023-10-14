import { Button, Icon } from "@rneui/base";
import { ScrollView, View } from "react-native";
import { makeStyles } from "@rneui/themed";
import { useState } from "react";

export default () => {
  const styles = useStyles();
  const [filter, setFilter] = useState({});
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
          <Button type="solid" style={styles.filterButton}>
            <Icon name="dog" type="material-community" color="white" />
          </Button>
          <Button type="solid" style={styles.filterButton}>
            <Icon
              name="cat"
              type="material-community"
              color="white"
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton}>
            <Icon
              name="bird"
              type="material-community"
              color="white"
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton}>
            <Icon
              name="bat"
              type="material-community"
              color="white"
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton}>
            <Icon
              name="cow"
              type="material-community"
              color="white"
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton}>
            <Icon
              name="rabbit"
              type="material-community"
              color="white"
              style={styles.filterIcon}
            />
          </Button>
          <Button type="solid" style={styles.filterButton}>
            <Icon
              name="unicorn"
              type="material-community"
              color="white"
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
  filterButton: {},
  filterHeader: {
    backgroundColor: theme.colors.primary,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));
