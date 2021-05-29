import React, { Suspense } from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { useDeviceType } from '@hooks';
import ErrorBoundary from '../../ErrorBoundary';

const Layout: React.FC = ({ children }) => {
  const { isHandset, isTablet } = useDeviceType();

  const displayTopNav = Platform.OS === 'web';
  const displaySecondaryNav = false;
  const displayBottomNav = Platform.OS !== 'web' || isHandset || isTablet;

  return (
    <View style={styles.container}>
      {displayTopNav && <TopNav />}
      <View
        style={[
          styles.wrapper,
          { flexDirection: isHandset || isTablet ? 'column' : 'row' },
        ]}
      >
        {displaySecondaryNav && <SecondaryNav />}
        <View style={styles.content}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingPlaceholder />}>{children}</Suspense>
          </ErrorBoundary>
        </View>
      </View>
      {displayBottomNav && <BottomNav />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  wrapper: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
});

const TopNav = () => {
  return <></>;
};
const BottomNav = () => {
  return <></>;
};

const SecondaryNav = () => {
  return <></>;
};
const LoadingPlaceholder = () => {
  return <></>;
};

export default Layout;
