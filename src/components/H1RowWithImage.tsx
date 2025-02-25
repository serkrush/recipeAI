import React, { ReactNode } from 'react';
import { ColorValue, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { families } from 'src/theme';
import palette from 'src/theme/colors/palette';
interface H1RowWithImageProps {
    label: string;
    icon?: ReactNode;
}

const H1RowWithImage = ({ icon, label }: H1RowWithImageProps) => {
    return (
        <View
            style={styles.container}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {icon && <View style={{ marginRight: 12 }}>{icon}</View>}

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
    label: {
        fontFamily: families.geist500,
        fontSize: 18,
        color: palette.white,
        lineHeight: 28,
    },
});
export default H1RowWithImage;
