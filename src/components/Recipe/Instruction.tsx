import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { families } from "src/theme";
import palette from "src/theme/colors/palette";

export const Instruction = ({ num, description }) => {

    return (
        <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ width: 36, height: 36, backgroundColor: palette.white024, justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                <Text style={{ fontFamily: families.geist500, 
                    fontWeight: '500',fontSize: 16, lineHeight: 24, color: palette.white, }}>{num}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: families.geist, fontSize: 16, lineHeight: 24, color: palette.white, }}>
                    {description}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});