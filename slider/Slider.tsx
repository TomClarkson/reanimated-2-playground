import React from "react";
import { StyleSheet, View } from "react-native";
import { shadowStyle } from "./style";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { clamp } from "./utils";
import Colors from "./Colors";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SvgComponentProps {
  animatedProps: any;
}

const SvgComponent = ({ animatedProps }: SvgComponentProps) => (
  <Svg viewBox="0 0 512 512" height={BALLOON_WIDTH} width={BALLOON_WIDTH}>
    <AnimatedPath
      animatedProps={animatedProps}
      d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"
    />
  </Svg>
);

const SLIDER_WIDTH = 300;
const KNOB_WIDTH = 70;
const MAX_RANGE = 20;

const SLIDER_RANGE = SLIDER_WIDTH - KNOB_WIDTH;

const BALLOON_WIDTH = 60;

export const Slider = () => {
  const translateX = useSharedValue(0);
  const isSliding = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetX: number }
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      isSliding.value = true;
      translateX.value = clamp(
        event.translationX + ctx.offsetX,
        0,
        SLIDER_WIDTH - KNOB_WIDTH
      );
    },
    onEnd: () => {
      isSliding.value = false;
    },
  });

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  const balloonTranslationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value + (KNOB_WIDTH - BALLOON_WIDTH) / 2 },
      ],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + KNOB_WIDTH,
    };
  });

  const balloonColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, SLIDER_RANGE],
      [Colors.delete, Colors.celtic]
    );

    return {
      backgroundColor,
    };
  });

  const animatedAccessoryColor = useDerivedValue(() => {
    return interpolateColor(
      translateX.value,
      [0, SLIDER_RANGE],
      [Colors.delete, Colors.celtic]
    );
  });

  const animatedAccessoryProps = useAnimatedProps(() => ({
    fill: animatedAccessoryColor.value,
  }));

  //   const animatedAccessoryProps = useAnimatedProps(() => {
  //     fill: animatedAccessoryColor.value,
  // })

  // const rotateStyle = useAnimatedStyle(() => {
  //   const rotate = interpolateNode(translateX.value, {
  //     inputRange: [0, SLIDER_RANGE], // between the beginning and end of the slider
  //     outputRange: [0, 4 * 360], // penguin will make 4 full spins
  //     extrapolate: Extrapolate.CLAMP,
  //   });

  //   return {
  //     transform: [{ rotate: `${rotate}deg` }],
  //   };
  // });

  console.log({ scrollTranslationStyle });

  // const svgX = useDerivedValue(() => withSpring(t1.x.value))

  const svgTransitionX = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value + (KNOB_WIDTH - BALLOON_WIDTH) / 2 },
      ],
    };
  });

  // const svgTransitionX = useDerivedValue(() =>
  //   withSpring(translateX.value + (KNOB_WIDTH - BALLOON_WIDTH) / 2)
  // );

  return (
    <>
      <View
        style={{
          width: SLIDER_WIDTH,
          marginBottom: 30,
        }}
      >
        <Animated.View
          testID="Balloon"
          style={[
            {
              height: 80,
              width: BALLOON_WIDTH,
            },
            svgTransitionX,
          ]}
        >
          <SvgComponent animatedProps={animatedAccessoryProps} />
        </Animated.View>
      </View>

      <View
        style={{
          width: SLIDER_WIDTH,
          marginBottom: 30,
        }}
      >
        <Animated.View
          testID="Balloon"
          style={[
            {
              height: 80,
              width: BALLOON_WIDTH,
            },
            balloonTranslationStyle,
            balloonColorStyle,
          ]}
        />
      </View>
      <View style={styles.slider}>
        <Animated.View style={[styles.progress, progressStyle]} />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.knob, scrollTranslationStyle]} />
        </PanGestureHandler>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: KNOB_WIDTH,
    width: SLIDER_WIDTH,
    borderRadius: KNOB_WIDTH / 2,
    backgroundColor: "#ddd",
    justifyContent: "center",
    ...shadowStyle,
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#3f51b5",
    borderRadius: KNOB_WIDTH / 2,
  },
  knob: {
    height: KNOB_WIDTH,
    width: KNOB_WIDTH,
    borderRadius: KNOB_WIDTH / 2,
    backgroundColor: "#757de8",
    justifyContent: "center",
    alignItems: "center",
  },
});
