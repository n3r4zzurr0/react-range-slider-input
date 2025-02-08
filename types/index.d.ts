import type { FC } from 'react';

export type Orientation = "horizontal" | "vertical";
export type Step = number | "any";

export type InputEvent = [number, number];
export type InputEventHandler = (event: InputEvent) => void;

export interface ReactRangeSliderInputProps {
  /* @default null
   * Identifier string (id attribute value) to be passed to the range slider element.
   * */
  id?: string;

  /* @default null
   * String of classes to be passed to the range slider element.
   * */
  className?: string;

  /* @default 0
   * Number that specifies the lowest value in the range of permitted values.
   * Its value must be less than that of max.
   * */
  min?: number;

  /* @default 100
   * Number that specifies the greatest value in the range of permitted values.
   * Its value must be greater than that of min.
   * */
  max?: number;

  /* @default 1
   * Number that specifies the amount by which the slider value(s) will change upon user interaction.
   * Other than numbers, the value of step can be a string value of any.
   * */
  step?: Step;

  /* @default [25, 75]
   * Array of two numbers that specify the default values of the lower and upper offsets of the range slider element respectively.
   * If set, the range slider will be rendered as an uncontrolled element. To render it as a controlled element, set the value property.
   * */
  defaultValue?: [number, number];

  /* @default []
   * Array of two numbers that specify the values of the lower and upper offsets of the range slider element respectively.
   * If set, the range slider will be rendered as a controlled element.
   * */
  value?: [number, number];

  /*
   * Function to be called when there is a change in the value(s) of range sliders upon user interaction.
   * */
  onInput?: InputEventHandler;

  /*
   * Function to be called when the pointerdown event is triggered for any of the thumbs.
   * */
  onThumbDragStart?: () => void;

  /*
   * Function to be called when the pointerup event is triggered for any of the thumbs.
   * */
  onThumbDragEnd?: () => void;

  /*
   * Function to be called when the pointerdown event is triggered for the range.
   * */
  onRangeDragStart?: () => void;

  /*
   * Function to be called when the pointerup event is triggered for the range.
   * */
  onRangeDragEnd?: () => void;

  /* @default false
   * Boolean that specifies if the range slider element is disabled or not.
   * */
  disabled?: boolean;

  /* @default false
   * Boolean that specifies if the range is slidable or not.
   * */
  rangeSlideDisabled?: boolean;

  /* @default [false, false]
   * Array of two Booleans which specify if the lower and upper thumbs are disabled or not, respectively.
   * If only one Boolean value is passed instead of an array, the value will apply to both thumbs.
   * */
  thumbsDisabled?: [boolean, boolean];

  /* @default 'horizontal'
   * String that specifies the axis along which the user interaction is to be registered.
   * By default, the range slider element registers the user interaction along the X-axis.
   * It takes two different values: horizontal and vertical.
   * */
  orientation?: Orientation;

  /*
   * Array of two strings that set the aria-label attribute on the lower and upper thumbs respectively.
   * */
  ariaLabel?: [string, string];

  /*
  /* Array of two strings that set the aria-labelledby attribute on the lower and upper thumbs respectively.
   * */
  ariaLabelledBy?: [string, string];
}

const ReactRangeSliderInput: FC<ReactRangeSliderInputProps>;

export default ReactRangeSliderInput;
