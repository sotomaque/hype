import { ViewStyle } from 'react-native';

export type BreakpointKeys = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
export type Breakpoints = {
  [key in BreakpointKeys]: { max?: number; min?: number };
};
const breakpoints: Breakpoints = {
  xSmall: { max: 719 },
  small: { min: 720, max: 1023 },
  medium: { min: 1024, max: 1439 },
  large: { min: 1440, max: 1919 },
  xLarge: { min: 1920 },
};

export default breakpoints;

export interface Theme {
  backdrop: ViewStyle;
  breakpoints: Breakpoints;
}
