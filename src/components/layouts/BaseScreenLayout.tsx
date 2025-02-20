import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import baseStyles from 'src/styles';
import {SafeAreaView} from 'react-native-safe-area-context';

interface BaseScreenLayoutProps {
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export default class BaseScreenLayout extends React.Component<BaseScreenLayoutProps> {
  constructor(props: BaseScreenLayoutProps) {
    super(props);
  }

  render() {
    const {containerStyle, children} = this.props;

    return (
      <SafeAreaView style={baseStyles.safeArea}>
        <View style={[baseStyles.baseContainer, containerStyle]}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
}