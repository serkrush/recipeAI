import React, {ReactNode} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {families} from 'src/theme';
import palette from 'src/theme/colors/palette';

interface RadioButtonProps {
    label: string;
    selected: boolean;
    onPress: () => void;
    subLabel?: string;
    icon?: ReactNode;
}

const RadioButton = ({
    label,
    selected,
    onPress,
    subLabel,
    icon,
}: RadioButtonProps) => {
    return (
        <TouchableOpacity
            style={selected ? styles.selectedContainer : styles.container}
            onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {icon && <View style={{marginRight: 12}}>{icon}</View>}
                    <Text style={styles.label}>{label}</Text>
                </View>
                <View
                    style={
                        selected
                            ? styles.selectedRadioCircle
                            : styles.radioCircle
                    }>
                    {selected && <View style={styles.selectedRb} />}
                </View>
            </View>
            {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: palette.white008,
        borderRadius: 28,
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderWidth: 2,
        borderColor: palette.white008,
    },
    selectedContainer: {
        backgroundColor: palette.hotPink02,
        borderWidth: 2,
        borderColor: palette.hotPink,
        borderRadius: 28,
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    radioCircle: {
        height: 28,
        width: 28,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: palette.white024,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRadioCircle: {
        height: 28,
        width: 28,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: palette.hotPink,
        backgroundColor: palette.hotPink,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 12,
        height: 12,
        borderRadius: 100,
        backgroundColor: palette.black,
    },
    label: {
        fontFamily: families.geist500,
        fontSize: 18,
        color: palette.white,
        lineHeight: 28,
    },
    subLabel: {
        fontFamily: families.geist,
        fontSize: 14,
        color: palette.white064,
        lineHeight: 20,
        marginTop: 12,
    },
});

export default RadioButton;
