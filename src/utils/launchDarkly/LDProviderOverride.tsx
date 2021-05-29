import { Provider } from 'launchdarkly-js-client-sdk/lib/context';
import React, { useEffect, useState } from 'react';
import { LDClient, LDFlagSet, LDFlagValue } from 'launchdarkly-js-client-sdk';

import { setOverrides } from './overridePersistence';

declare global {
  interface Window {
    _ldOverride?: {
      set: (flag: string, value: LDFlagValue) => void;
      reset: () => void;
    };
  }
}

interface Props {
  flags: LDFlagSet;
  ldClient: LDClient;
  overrides: LDFlagSet;
}

const LDProviderOverride: React.FC<Props> = ({
  children,
  flags,
  ldClient,
  overrides,
}) => {
  const [overrideFlags, setOverrideFlags] = useState(overrides);

  useEffect(() => {
    setOverrides(overrideFlags);
  }, [overrideFlags]);

  window._ldOverride = {
    set: (flag: string, value: LDFlagValue) => {
      setOverrideFlags({ ...overrideFlags, [flag]: value });
    },
    reset: () => {
      setOverrideFlags({});
    },
  };

  const effectiveFlags = { ...flags, ...overrideFlags };
  return (
    <Provider value={{ flags: effectiveFlags, ldClient }}>{children}</Provider>
  );
};

export default LDProviderOverride;
