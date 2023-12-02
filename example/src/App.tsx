import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply } from 'react-native-ease-rich-text';
import { TestRichInput } from './Test';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      {/* <TestRichText /> */}
      <TestRichInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
