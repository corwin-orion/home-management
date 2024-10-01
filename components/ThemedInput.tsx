import { View, Text, StyleProp, ViewStyle, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { globalStyles } from '@/constants/Styles';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ThemedInputProps {
  style?: StyleProp<ViewStyle>;
  lightBorderColor?: string;
  darkBorderColor?: string;
  lightColor?: string;
  darkColor?: string;
  value?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (input: string) => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

const ThemedInput = ({ style,
  lightBorderColor,
  darkBorderColor,
  lightColor,
  darkColor,
  value,
  placeholder,
  secureTextEntry = false,
  onChangeText,
  autoCapitalize }: ThemedInputProps) => {

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightBorderColor, dark: darkBorderColor }, 'icon');

  return (
    <TextInput style={[{ color, borderColor }, styles.input]} value={value} placeholder={placeholder} onChangeText={onChangeText} autoCapitalize={autoCapitalize} secureTextEntry={secureTextEntry} />
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  }
});

export default ThemedInput