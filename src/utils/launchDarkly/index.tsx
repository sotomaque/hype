import {
  asyncWithLDProvider,
  withLDConsumer,
} from 'launchdarkly-react-client-sdk';
import React from 'react';
import { LDFlagSet } from 'launchdarkly-js-client-sdk';

import { getOverrides } from './overridePersistence';
import LDProviderOverride from './LDProviderOverride';

const env = resolveEnv();
const isOverridable = [Enviroment.DEV, Enviroment.STAGING].includes(env);
const ldConfig = {
  clientSideID: resolveLaunchDarklyClientId(),
  options: {
    fetchGoals: false,
  },
};

interface LaunchDarklyInterface {
  init: () => Promise<void>;
  Provider: ({ children }: { children: React.ReactNode }) => JSX.Element | null;
}

const LaunchDarkly: LaunchDarklyInterface = {
  init: async () => {
    let overrides: LDFlagSet, LDOverride: (props: any) => JSX.Element;
    const LDProvider = await asyncWithLDProvider(ldConfig);
    if (isOverridable) {
      overrides = await getOverrides();
      LDOverride = withLDConsumer()(LDProviderOverride);
    }
    LaunchDarkly.Provider = ({ children }) =>
      isOverridable ? (
        <LDProvider>
          <LDOverride overrides={overrides}>{children}</LDOverride>
        </LDProvider>
      ) : (
        <LDProvider>{children}</LDProvider>
      );
  },
  Provider: () => null,
};

export default LaunchDarkly;
