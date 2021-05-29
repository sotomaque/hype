import AsyncStorage from '@react-native-community/async-storage';
import { LDFlagSet } from 'launchdarkly-js-sdk-common';

const key = 'eco-flag-override';

export const getOverrides = async (): Promise<LDFlagSet> => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

export const setOverrides = async (overrideFlags: LDFlagSet): Promise<void> =>
  AsyncStorage.setItem(key, JSON.stringify(overrideFlags));
