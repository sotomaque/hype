import 'resize-observer-polyfill';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@expo/match-media';
import '@expo/browser-polyfill';

// import LaunchDarkly from './src/utils/launchDarkly';
import Route from './src/components/templates/route';
import RoutesContext from './src/hooks/usePlatformRoute/RoutesContext';
import routes from './src/routes';

import { AuthProvider } from '@context/AuthContext';
import resolveAuth0Audience from '@config/resolveAudience';
import resolveAuth0ClientId from '@config/resolveAuth0ClientId';
import resolveAuth0Domain from '@config/resolveAuth0Domain';

const App = (): JSX.Element | null => {
  const [isReady, setIsReady] = useState(true);
  const [customFontsLoaded, error] = useState(true);
  const [customIconsLoaded, errorFonts] = useState(true);

  // TODO android polyfill

  // useEffect(() => {
  //   setIsReady(false);
  //   Promise.all([LaunchDarkly.init(), initI18n(languageDetector)]).then(() => {
  //     setIsReady(true);
  //   });
  // }, [customIconsLoaded, customFontsLoaded, error, errorFonts]);

  return isReady && customIconsLoaded && customFontsLoaded ? (
    <SafeAreaProvider>
      <AuthProvider
        audience={resolveAuth0Audience()}
        clientId={resolveAuth0ClientId()}
        domain={resolveAuth0Domain()}
      >
        <RoutesContext.Provider value={routes}>
          <Route />
        </RoutesContext.Provider>
      </AuthProvider>
    </SafeAreaProvider>
  ) : null;
};
export default App;
