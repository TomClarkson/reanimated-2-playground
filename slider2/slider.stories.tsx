import * as React from "react";
import { Slider2, SliderProps } from "./Slider";

export default {
  title: "Components/Slider",
  component: Slider2,
};

/**
 *
 */
export const BasicUsage = (props: SliderProps) => <Slider2 {...props} />;

BasicUsage.args = {
  min: 0,
  max: 3000,
  step: 15,
};
