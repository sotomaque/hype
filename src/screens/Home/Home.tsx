import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { usePlatformNavigation } from '@hooks';

const Home = (): React.ReactElement => {
  const navigation = usePlatformNavigation();
  const handleNavigation = () => {
    navigation.push('/onboarding');
  };

  return (
    <View>
      <Text>Home</Text>
      <Pressable
        onPress={handleNavigation}
        style={{ marginTop: 200, marginHorizontal: 40, backgroundColor: 'red' }}
        accessibilityLabel="TODO:AL"
      />
    </View>
  );
};

export default Home;
