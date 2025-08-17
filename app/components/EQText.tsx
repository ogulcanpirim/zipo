import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {fonts} from '../constants/fonts';

interface EQTextProps extends TextProps {
  loading?: boolean;
  minLoadingLength?: number;
}

export const EQText = (props: EQTextProps) => {
  const theme = useTheme();

  const givenStyle = StyleSheet.flatten(props.style);

  const textStyle: TextStyle = {
    ...givenStyle,
    color: givenStyle?.color ?? theme.colors.text,
    fontFamily: givenStyle?.fontFamily ?? fonts.regular,
  };

  return <Text {...props} style={textStyle} allowFontScaling={false} />;
};
