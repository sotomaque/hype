import { usePlatformNavigation } from '@hooks';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

const Onboarding = () => {
  const navigation = usePlatformNavigation();

  const handleNavigation = () => {
    navigation.push('/home');
  };
  return (
    <View>
      <Text>Onboarding</Text>
      <Pressable onPress={handleNavigation}>
        <Text>Click Me</Text>
      </Pressable>
    </View>
  );
};

export default Onboarding;
