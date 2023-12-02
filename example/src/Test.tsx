import * as React from 'react';
import { Text, Pressable, SafeAreaView } from 'react-native';
import { RichInput, RichInputRef } from '../../src/RichInput';
import { RichTextRef, RichText } from '../../src/RichText';

export function TestRichText() {
  const ref = React.useRef<RichTextRef>({} as RichTextRef);
  return (
    <SafeAreaView
      style={{ maxHeight: 500, maxWidth: 300, backgroundColor: '#ffd700' }}
    >
      <Pressable
        style={{
          height: 50,
          width: 100,
          padding: 10,
          backgroundColor: '#e9967a',
        }}
        onPress={() => {
          ref.current?.pushText('push text');
        }}
      >
        <Text>{'push text'}</Text>
      </Pressable>
      <Pressable
        style={{
          height: 50,
          width: 100,
          padding: 10,
          backgroundColor: '#e9967a',
        }}
        onPress={() => {
          ref.current?.pushImage(require('../assets/1.png'), {
            width: 20,
            height: 20,
          });
        }}
      >
        <Text>{'push image'}</Text>
      </Pressable>
      <Pressable
        style={{
          height: 50,
          width: 100,
          padding: 10,
          backgroundColor: '#e9967a',
        }}
        onPress={() => {
          ref.current?.clear();
        }}
      >
        <Text>{'clear'}</Text>
      </Pressable>
      <RichText
        propsRef={ref}
        containerStyle={{ backgroundColor: '#8fbc8f' }}
      />
    </SafeAreaView>
  );
}

export function TestRichInput() {
  const ref = React.useRef<RichInputRef>({} as RichInputRef);
  return (
    <SafeAreaView
      style={{ maxHeight: 500, maxWidth: 300, backgroundColor: '#ffd700' }}
    >
      <Pressable
        style={{
          height: 50,
          width: 100,
          padding: 10,
          backgroundColor: '#e9967a',
        }}
        onPress={() => {
          ref.current?.pushText('push text');
        }}
      >
        <Text>{'push text'}</Text>
      </Pressable>
      <Pressable
        style={{
          height: 50,
          width: 100,
          padding: 10,
          backgroundColor: '#e9967a',
        }}
        onPress={() => {
          // ref.current?.pushImage(require('../assets/1.png'), {
          //   width: 20,
          //   height: 20,
          // });
          ref.current?.pushImage(
            {
              uri: 'https://cdn2.iconfinder.com/data/icons/chinese-new-year/512/gcds-dragon.png',
            },
            {
              width: 20,
              height: 20,
            }
          );
        }}
      >
        <Text>{'push image'}</Text>
      </Pressable>
      <Pressable
        style={{
          height: 50,
          width: 100,
          padding: 10,
          backgroundColor: '#e9967a',
        }}
        onPress={() => {
          ref.current?.clear();
        }}
      >
        <Text>{'clear'}</Text>
      </Pressable>
      <RichInput
        propsRef={ref}
        containerStyle={{
          backgroundColor: '#8fbc8f',
          width: 300,
          minHeight: 40,
        }}
      />
    </SafeAreaView>
  );
}
