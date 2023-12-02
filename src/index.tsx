import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-ease-rich-text' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ReactNativeeEaseRichText = NativeModules.ReactNativeeEaseRichText
  ? NativeModules.ReactNativeeEaseRichText
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return ReactNativeeEaseRichText.multiply(a, b);
}

export * from './RichInput';
export * from './RichText';
export * from './types';
