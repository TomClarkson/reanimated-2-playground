import React from "react";
import { Text, ImageBackground } from "react-native";
import { StackParamList } from "./StackParamList";
import { SharedElement } from "react-navigation-shared-element";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<StackParamList, "Detail">;

export const DetailScreen = ({ route }: Props) => {
  const { item } = route.params;
  return (
    <SharedElement id={item.title}>
      <ImageBackground source={{ uri: item.img }} style={{ height: 700 }}>
        <Text style={{ color: "#fff" }}>{item.title}</Text>
      </ImageBackground>
    </SharedElement>
  );
};
