import React from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface AnimatedTextProps {
  text: any;
}

const AnimatedText = ({ text }: AnimatedTextProps) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });

  return (
    <AnimatedTextInput
      style={{ color: "#fff", fontSize: 18 }}
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      animatedProps={animatedProps}
    />
  );
};

export default AnimatedText;
