import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
// import AnimatedStyleUpdateExample from "./AnimatedStyleUpdateExample";
import { Slider } from "./slider/Slider";
// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SharedElementApp from "./shared-element-demo/SharedElementApp";
import { Slider2 } from "./slider2";
import { LoveSlider } from "./loveSlider";

type RootStackParamList = {
  Home: undefined;
  Details: { userId: string };
};

function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details", { userId: "1" })}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
      }}
    >
      <Slider2 min={0} initialValue={1500} max={3000} step={15} />
    </View>
  );

  // return (
  //   <View style={{ flex: 1 }}>
  //     <LoveSlider />
  //   </View>
  // );

  // return <SharedElementApp />;

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Home">
  //       <Stack.Screen name="Home" component={HomeScreen} />
  //       <Stack.Screen name="Details" component={DetailsScreen} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  // return (
  //   <View style={styles.container}>
  //     <Slider />
  //   </View>
  // );
  // return <AnimatedStyleUpdateExample />;
  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.tsx to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
