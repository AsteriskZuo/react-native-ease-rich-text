import * as React from 'react';
import {
  Image,
  Text,
  StyleProp,
  View,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
  Dimensions,
} from 'react-native';
import { seqId } from './Sequence';
import { dataMeta, TextData, ImageData } from './types';

export type RichTextRef = {
  pushText: (text: string, style?: StyleProp<TextStyle>) => void;
  pushImage: (
    source: ImageSourcePropType,
    style?: StyleProp<ImageStyle>
  ) => void;
  pushData: (data: dataMeta[]) => void;
  clear: () => void;
};
export type RichTextProps = {
  containerStyle?: StyleProp<ViewStyle>;
  propsRef?: React.RefObject<RichTextRef>;
};
export function RichText(props: RichTextProps) {
  const { containerStyle } = props;
  const { data } = useRichText(props);
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          maxWidth: Dimensions.get('window').width,
        },
        containerStyle,
      ]}
    >
      {data}
    </View>
  );
}

export function useRichText(props: RichTextProps) {
  const dataRef = React.useRef<dataMeta[]>([]);
  const [data, setData] = React.useState<React.ReactNode[]>([]);
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
    propsRef.current.pushData = (list: dataMeta[]) => {
      for (const data of list) {
        addData(data);
      }
    };
  }
  const updateElements = React.useCallback(() => {
    const list = dataRef.current
      .map((item, index) => {
        if (item.dataType === 'text') {
          return (
            <Text key={index} style={item.data.style}>
              {(item.data as TextData).text}
            </Text>
          );
        } else if (item.dataType === 'image') {
          return (
            <Image
              key={index}
              source={(item.data as ImageData).source}
              style={(item.data as ImageData).style}
              resizeMode="contain"
            />
          );
        } else {
          return null;
        }
      })
      .filter((item) => item !== null) as React.ReactNode[];
    setData(list);
  }, []);
  const addData = React.useCallback(
    (item: dataMeta) => {
      dataRef.current.push(item);
      updateElements();
    },
    [updateElements]
  );
  const clearData = React.useCallback(() => {
    dataRef.current = [];
    updateElements();
  }, [updateElements]);
  return {
    data,
    updateElements,
    addData,
    clearData,
  };
}
