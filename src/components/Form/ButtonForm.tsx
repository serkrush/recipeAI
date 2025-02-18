import React from 'react';
import {Button, Pressable, StyleSheet, Text} from 'react-native';
import {families} from 'src/theme';
import palette from 'src/theme/colors/palette';

interface ButtonFormProps {
    text: string;
    actionButton?: () => void;
    style?: object;
    styleText?: object;
}

export default function ButtonForm({
    text,
    actionButton,
    style = {},
    styleText = {},
}: ButtonFormProps) {
    return (
        <Pressable
            style={{
                ...{
                    backgroundColor: palette.hotPink,
                    borderRadius: 100,
                    alignItems: 'center',
                    padding: 15,
                },
                ...style,
            }}
            onPress={actionButton}>
            <Text
                style={{
                    ...{
                        fontFamily: families.geist500,
                        fontSize: 18,
                        lineHeight: 26,
                        letterSpacing: -0.02 * 18,
                        opacity: 0.8,
                        color: palette.black
                    },
                    ...styleText,
                }}>
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({});
