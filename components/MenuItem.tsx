import React from 'react'
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface MenuItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const MenuItem = ({ children, onPress, style }: MenuItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    justifyContent: 'center',
    minHeight: 70,
  },
});