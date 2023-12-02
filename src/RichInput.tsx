import * as React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
} from 'react-native';
import { seqId } from './Sequence';
import { dataMeta, TextData, ImageData } from './types';
import { RichEditor, RichEditorProps } from 'react-native-pell-rich-editor';

export type RichInputRef = {
  pushText: (text: string, style?: StyleProp<TextStyle>) => void;
  pushImage: (
    source: ImageSourcePropType,
    style?: StyleProp<ImageStyle>
  ) => void;
  pushData: (data: dataMeta) => void;
  getData: () => dataMeta[];
  clear: () => void;
};
export type RichInputProps = RichEditorProps & {
  containerStyle?: StyleProp<ViewStyle>;
  propsRef?: React.RefObject<RichInputRef>;
};
export function RichInput(props: RichInputProps) {
  const { containerStyle, ...others } = props;
  const { editorRef } = useRichInput(props);
  return (
    <View style={[containerStyle]}>
      <RichEditor ref={editorRef} {...others} />
    </View>
  );
}
export function useRichInput(props: RichInputProps) {
  const dataRef = React.useRef<dataMeta[]>([]);
  const editorRef = React.useRef<RichEditor>({} as RichEditor);
  const { propsRef } = props;
  if (propsRef && propsRef.current) {
    propsRef.current.pushText = (
      text: string,
      style?: StyleProp<TextStyle>
    ) => {
      addData({
        id: seqId('_$rich'),
        dataType: 'text',
        data: {
          text,
          style,
        },
      });
    };
    propsRef.current.pushImage = (
      source: ImageSourcePropType,
      style?: StyleProp<ImageStyle>
    ) => {
      addData({
        id: seqId('_$rich'),
        dataType: 'image',
        data: {
          placeholder: '\uDB00',
          source,
          style,
        },
      });
    };
    propsRef.current.clear = () => {
      clearData();
    };
    propsRef.current.pushData = (data: dataMeta) => {
      addData(data);
    };
    propsRef.current.getData = () => {
      return getData();
    };
  }
  const addData = React.useCallback((item: dataMeta) => {
    const setTextStyle = (style?: StyleProp<TextStyle>) => {
      const s = style as TextStyle | undefined;
      const getFontSize = (style?: TextStyle) => {
        if (style?.fontSize === 10) {
          return 1;
        } else if (style?.fontSize === 13) {
          return 2;
        } else if (style?.fontSize === 16) {
          return 3;
        } else if (style?.fontSize === 18) {
          return 4;
        } else if (style?.fontSize === 24) {
          return 5;
        } else if (style?.fontSize === 32) {
          return 6;
        } else if (style?.fontSize === 48) {
          return 7;
        } else {
          return 4;
        }
      };

      editorRef.current?.setForeColor((s?.color as string) || '#000');
      // editorRef.current?.setBold(style?.fontWeight === 'bold');
      // editorRef.current?.setItalic(style?.fontStyle === 'italic');
      // editorRef.current?.setUnderline(style?.textDecorationLine === 'underline');
      editorRef.current?.setFontSize(getFontSize(s));
      // editorRef.current?.setTextColor(style?.color || '#000');
      // editorRef.current?.setTextBackgroundColor(style?.backgroundColor || '#fff');
      // editorRef.current?.setAlignItems(style?.textAlign || 'left');
    };
    const getImageUrl = (source?: ImageSourcePropType) => {
      if (typeof source === 'number') {
        return source;
      } else if (typeof source === 'object') {
        if (Array.isArray(source)) {
          return (source[0] as ImageURISource).uri;
        } else {
          return (source as ImageURISource).uri;
        }
      } else {
        return '';
      }
    };
    const getImageStyle = (style?: StyleProp<ImageStyle>) => {
      const s = style as ImageStyle | undefined;
      const width = s?.width || 18;
      const height = s?.height || 18;
      return `width: ${width}px; height: ${height}px;`;
    };
    dataRef.current.push(item);
    if (item.dataType === 'text') {
      if (item.data.style) {
        setTextStyle(item.data.style);
      }
      editorRef.current?.insertText((item.data as TextData).text);
    } else if (item.dataType === 'image') {
      const url = getImageUrl((item.data as ImageData).source);
      const style = getImageStyle((item.data as ImageData).style);
      editorRef.current?.insertImage(url, style);
    } else {
      // todo: other data type
    }
  }, []);
  const clearData = React.useCallback(() => {
    dataRef.current = [];
    // todo: clear editor
  }, []);
  const getData = React.useCallback(() => {
    return dataRef.current;
  }, []);
  return {
    addData,
    clearData,
    getData,
    editorRef,
  };
}
