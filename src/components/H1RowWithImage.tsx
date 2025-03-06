import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { families } from 'src/theme';
import palette from 'src/theme/colors/palette';

interface H1RowWithImageProps {
    label: string;
    icon?: ReactNode;
}

const H1RowWithImage = ({ icon, label }: H1RowWithImageProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.iconLabelContainer}>
                    {icon && <View style={styles.icon}>{icon}</View>}
                    <Text style={styles.label}>{label}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: palette.white012,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 12,
    },
    label: {
        fontFamily: families.geist500,
        fontWeight: '500',
        fontSize: 18,
        color: palette.white,
        lineHeight: 28,
        flexShrink: 1,
        flexWrap: 'wrap',
    },
});

export default H1RowWithImage;