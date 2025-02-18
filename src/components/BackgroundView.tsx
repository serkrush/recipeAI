import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {windowHeight, windowWidth} from 'src/utils/size';

export default function BackgroundView({source}) {
  return (
    <Image
      style={{
        width: windowWidth,
        height: windowHeight,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        resizeMode: 'cover',
      }}
      source={source}
    />
  );
}

const styles = StyleSheet.create({});
