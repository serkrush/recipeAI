import Check from "../../../assets/svg/Check";
import Close from "../../../assets/svg/Close";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { families } from "src/theme";
import palette from "src/theme/colors/palette";

export const Ingredient = ({ count, description, isCheck }) => {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <View style={{ width: 60 }}>
                <Text style={{ fontFamily: families.geist, fontSize: 16, lineHeight: 24, color: palette.white048 }} numberOfLines={2}>{count}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: families.geist, fontSize: 16, lineHeight: 24, color: palette.white }} numberOfLines={2}>{description}</Text>
            </View>
            <View style={{ width: 20, justifyContent:'center', alignItems:'center' }}>
                {isCheck ? <Check fill={palette.hotPink} /> : <Close />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});