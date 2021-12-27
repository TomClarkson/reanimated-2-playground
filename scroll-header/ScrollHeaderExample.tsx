import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const textList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const list = textList.map((value, index) => {
  return {
    key: index,
  };
});

export default function ScrollHeaderExample() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 150],
        [150, 20],
        Extrapolate.CLAMP
      ),
    };
  });

  const menuStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(scrollY.value, [0, 150], [150, 20], Extrapolate.CLAMP),
    };
  });

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 100], [1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Text style={[styles.headerText, opacityStyle]}>
          Header
        </Animated.Text>
      </Animated.View>
      <Animated.View style={[styles.menu, menuStyle]}></Animated.View>

      <Animated.ScrollView
        style={styles.containerList}
        onScroll={scrollHandler}
        contentContainerStyle={{ paddingTop: 200 }}
        scrollEventThrottle={16}
      >
        <FlatList
          data={list}
          keyExtractor={(item) => {
            return String(item.key);
          }}
          renderItem={({}) => <Text style={styles.listText}>lista</Text>}
        />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FF0",
    height: 220,
  },
  header: {
    width: "100%",
    height: 200,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    elevation: 2,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  menu: {
    backgroundColor: "#00ff00",
    width: 450,
    height: 50,
    borderWidth: 1,
    position: "absolute",
    top: 150,
    left: 0,
    right: 0,
    elevation: 3,
  },

  menuList: {
    position: "relative",
    backgroundColor: "#ffffff",
    alignItems: "center",
    width: "100%",
  },
  containerList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },

  listText: {
    width: 400,
    height: 80,
    borderWidth: 1,
    backgroundColor: "#00ffff",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    elevation: 1,
  },
});
