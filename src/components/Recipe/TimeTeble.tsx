import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { families } from "src/theme";
import palette from "src/theme/colors/palette";

export const TimeTable = ({ time, description }) => {

    return (
        <View>
            <Text style={{ fontFamily: families.geist, fontSize: 18, lineHeight: 28, color: palette.white }}>
                {time}
            </Text>
            <Text style={{ fontFamily: families.geist500,
                    fontWeight: '500', fontSize: 14, lineHeight: 20, color: palette.white048 }}>
                {description}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
   
});