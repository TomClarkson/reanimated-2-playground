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
      d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
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
      [0, SLIDER_RANGE / 2, SLIDER_RANGE],
      [Colors.delete, Colors.littleMissNoName, Colors.celtic]
    );

    return {
      backgroundColor,
    };
  });

  const animatedAccessoryColor = useDerivedValue(() => {
    return interpolateColor(
      translateX.value,
      [0, SLIDER_RANGE / 2, SLIDER_RANGE],
      [Colors.delete, Colors.littleMissNoName, Colors.celtic]
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

  const svgX = useDerivedValue(() => withSpring(translateX.value));

  const svgTransitionX = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: svgX.value + (KNOB_WIDTH - BALLOON_WIDTH) / 2 },
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
