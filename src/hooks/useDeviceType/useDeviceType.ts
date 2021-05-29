import '@expo/match-media';
import { Platform } from 'react-native';
import useBreakpoints from '../useBreakpoints';
import { HANDSET, TABLET, DESKTOP } from './constants';

export type GenericDeviceType = typeof HANDSET | typeof TABLET | typeof DESKTOP;
export interface DeviceTypeResponse {
  deviceTypeName: GenericDeviceType;
  isHandset: boolean;
  isDesktop: boolean;
  isTablet: boolean;
}

const useDeviceType = (): DeviceTypeResponse => {
  const { isHandset, isHandsetOrTablet } = useBreakpoints();

  const deviceTypeName: GenericDeviceType = isHandset
    ? HANDSET
    : Platform.select({
        native: TABLET,
        default: isHandsetOrTablet ? TABLET : DESKTOP,
      });

  return {
    deviceTypeName,
    isHandset: deviceTypeName === HANDSET,
    isTablet: deviceTypeName === TABLET,
    isDesktop: deviceTypeName === DESKTOP,
  };
};

export default useDeviceType;
