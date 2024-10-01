import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react'
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface MenuItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  lightColor?: string;
  darkColor?: string;
}

const MenuItem = ({ children, onPress, style, lightColor, darkColor }: MenuItemProps) => {
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'icon')
  return (
    <TouchableOpacity style={[{ borderColor }, styles.container, style]} onPress={() => onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    justifyContent: 'center',
    minHeight: 70,
  },
});