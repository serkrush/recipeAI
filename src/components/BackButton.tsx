import React, {useContext} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import ArrowLeft from '../../assets/svg/ArrowLeft';
import palette from 'src/theme/colors/palette';
import ContainerContext from 'src/ContainerContext';
import {useNavigation} from '@react-navigation/native';

export default function BackButton({style}) {
    const di = useContext(ContainerContext);
    const navigation = useNavigation();
    return (
        <Pressable
            style={{
                ...styles.button,
                ...style,
            }}
            onPress={() => {
                navigation.goBack();
            }}>
            <ArrowLeft width={8} height={14} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: palette.white008,
    },
});
