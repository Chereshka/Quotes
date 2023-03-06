import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

export interface IKTextProps {
  text: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function KText({ text, style }: IKTextProps) {
  return <Text style={[styles.text, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
