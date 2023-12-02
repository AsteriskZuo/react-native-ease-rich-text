import {
  StyleProp,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';

export type TextData = {
  text: string;
  style?: StyleProp<TextStyle>;
};
export type ImageData = {
  /**
   * 2-byte UTF-16 code unit
   * https://www.unicode.org/charts/PDF/UD800.pdf
   *
   * DB00
   */
  placeholder: string;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
};
export type dataMeta = {
  id: string | number;
  dataType: 'text' | 'image';
  data: TextData | ImageData;
};
