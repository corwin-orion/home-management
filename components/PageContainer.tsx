import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PageContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const PageContainer = ({ children, style }: PageContainerProps) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
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
