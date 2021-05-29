import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  onReset: () => void;
}

export default function ErrorView({ onReset }: Props): JSX.Element {
  return (
    <View>
      <Text>Error</Text>
    </View>
  );
}
