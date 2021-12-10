import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { shadowStyle } from "./style";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  withSpring,
  interpolateNode,
  Extrapolate,
  concat,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { clamp } from "./utils";
import Colors from "./Colors";
import Svg, { Path } from "react-native-svg";
import AnimatedText from "./AnimatedText";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SvgComponentProps {
  animatedProps: any;
}

const SvgComponent = ({ animatedProps }: SvgComponentProps) => (
  <Svg viewBox="0 0 56 72" height={BALLOON_HEIGHT} width={BALLOON_WIDTH}>
    <AnimatedPath
      animatedProps={animatedProps}
      d="M28,2.27373675e-13 C43.463973,2.27373675e-13 56,12.536027 56,28 L55.999,28.121 C56,43.6316187 46.8542666,55.873733 28.5627997,64.8465614 L28.45,64.901 L31.1316718,70.2633436 C31.4280589,70.8561178 31.1877897,71.5769255 30.5950155,71.8733126 C30.4283889,71.9566259 30.2446533,72 30.0583591,72 L25.9416409,72 C25.2788991,72 24.7416408,71.4627417 24.7416408,70.8 C24.7416408,70.6137058 24.7850149,70.4299701 24.8683282,70.2633436 L27.55,64.901 L27.4372003,64.8465614 C9.14573343,55.873733 -3.55271368e-15,43.6316187 -3.55271368e-15,28.1202186 L0.001,28.121 L0,28 C0,12.8437601 12.0420575,0.500093371 27.080355,0.0148174587 L27.5369688,0.00375120002 L28,2.27373675e-13 Z"
    />
  </Svg>
);

const SLIDER_WIDTH = 300;
const KNOB_WIDTH = 40;

const SLIDER_RANGE = SLIDER_WIDTH - KNOB_WIDTH;

const BALLOON_WIDTH = 56;
const BALLOON_HEIGHT = 72;

const values = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

const getMoodValueFromPercent = (percent: number) => {
  "worklet";
  if (percent > 0.9) {
    return 5;
  }

  const step = 1 / values.length;
  const index = Math.floor(percent / step);
  const value = values[index];
  return value;
};

export const Slider = () => {
  const translateX = useSharedValue((SLIDER_WIDTH - KNOB_WIDTH) / 2);
  const velocityX = useSharedValue(0);

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
      velocityX.value = event.velocityX;
    },
    onEnd: () => {
      isSliding.value = false;
      velocityX.value = withTiming(0, { duration: 200 });
    },
  });

  const knobAnimationStyle = useAnimatedStyle(() => {
    const scale = withSpring(isSliding.value ? 1.05 : 1);

    return { transform: [{ translateX: translateX.value }, { scale }] };
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

  const svgX = useDerivedValue(() => withSpring(translateX.value));

  const svgContainerStyles = useAnimatedStyle(() => {
    const rotate = interpolate(
      velocityX.value,
      [-40, -10, 0, 10, 40],
      [0.3, 0.015, 0, -0.015, -0.3],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { translateX: svgX.value + (KNOB_WIDTH - BALLOON_WIDTH) / 2 },
        { rotate: `${rotate}rad` },
      ],
    };
  });

  const stepText = useDerivedValue(() => {
    const percent = translateX.value / SLIDER_RANGE;

    const value = getMoodValueFromPercent(percent);

    return String(value);
  });

  return (
    <>
      <View
        style={{
          width: SLIDER_WIDTH,
          marginBottom: 16,
        }}
      >
        <Animated.View
          testID="Balloon"
          style={[
            {
              height: BALLOON_HEIGHT,
              width: BALLOON_WIDTH,
            },
            svgContainerStyles,
          ]}
        >
          <SvgComponent animatedProps={animatedAccessoryProps} />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimatedText text={stepText} />
          </View>
        </Animated.View>
      </View>

      <View style={styles.sliderOuterWrapper}>
        <View style={styles.sliderTrackLine} />
        <View style={StyleSheet.absoluteFillObject}>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[styles.knob, knobAnimationStyle]} />
          </PanGestureHandler>
        </View>
      </View>
      <View style={styles.labelWrapper}>
        <Text style={{ color: Colors.delete, fontWeight: "500" }}>Bad</Text>
        <Text style={{ color: Colors.celtic, fontWeight: "500" }}>Good</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  labelWrapper: {
    flexDirection: "row",
    width: SLIDER_WIDTH,
    justifyContent: "space-between",
    marginTop: 8,
  },
  sliderOuterWrapper: {
    height: KNOB_WIDTH,
    width: SLIDER_WIDTH,
    justifyContent: "center",
  },
  sliderTrackLine: {
    backgroundColor: "rgb(237, 239,	242)",
    height: 1,
    width: "100%",
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
    backgroundColor: "#fff",
    borderColor: "#CCC",
    borderWidth: 1,
  },
});
