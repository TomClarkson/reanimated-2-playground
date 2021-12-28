import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { StackParamList } from "./StackParamList";
import { ListScreen } from "./ListScreen";
import { DetailScreen } from "./DetailScreen";

const Stack = createSharedElementStackNavigator<StackParamList>();

const SharedElementApp = () => {
  console.log("app Screen Called");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            sharedElements={(route) => {
              const { item } = route.params;
              return [
                {
                  id: item.title,
                  //   animation: "fade",
                },
              ];
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default SharedElementApp;
