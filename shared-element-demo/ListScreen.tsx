import React from "react";
import { FlatList, ImageBackground, Pressable, Text, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ItemType, StackParamList } from "./StackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RenderItemProps = {
  item: ItemType;
};

const DATA: ItemType[] = [
  {
    title: "Image #1",
    img: "https://images.unsplash.com/photo-1632222866459-f03fbe4c78a3?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #2",
    img: "https://images.unsplash.com/photo-1632251431418-b4e5fe2410b0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #3",
    img: "https://images.unsplash.com/photo-1632250962253-90a9195bbc40?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #4",
    img: "https://images.unsplash.com/photo-1632177211444-dd3e8413bf72?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #5",
    img: "https://images.unsplash.com/photo-1632231484562-3d2bed7e808d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #6",
    img: "https://images.unsplash.com/photo-1632250962253-90a9195bbc40?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #7",
    img: "https://images.unsplash.com/photo-1632222866459-f03fbe4c78a3?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #8",
    img: "https://images.unsplash.com/photo-1632251431418-b4e5fe2410b0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #9",
    img: "https://images.unsplash.com/photo-1632250962253-90a9195bbc40?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #10",
    img: "https://images.unsplash.com/photo-1632177211444-dd3e8413bf72?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #11",
    img: "https://images.unsplash.com/photo-1632231484562-3d2bed7e808d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Image #12",
    img: "https://images.unsplash.com/photo-1632250962253-90a9195bbc40?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];

type Props = NativeStackScreenProps<StackParamList, "List">;

export const ListScreen = ({ navigation }: Props) => {
  const renderItem = ({ item }: RenderItemProps) => {
    return (
      <Pressable
        onPress={() => navigation.push("Detail", { item })}
        style={{ width: "50%" }}
      >
        <View style={{ padding: 10, width: "100%" }}>
          <SharedElement id={item.title}>
            <ImageBackground
              source={{ uri: item.img }}
              style={{ borderRadius: 20, height: 200 }}
            >
              <Text style={{ color: "#fff" }}>{item.title}</Text>
            </ImageBackground>
          </SharedElement>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ backgroundColor: "red", flex: 1 }}>
      <Text>Hello</Text>
      <FlatList
        numColumns={2}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={({ title }) => title}
      />
    </View>
  );
};
