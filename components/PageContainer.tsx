import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';

interface PageContainerProps {
  children: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
}

const PageContainer = ({ children, style, lightColor, darkColor }: PageContainerProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  return (
    <SafeAreaView style={[{ backgroundColor }, styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
