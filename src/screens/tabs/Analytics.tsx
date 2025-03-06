import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';
import palette from 'src/theme/colors/palette';

export default function Analytivs() {


    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 0,
                paddingVertical: 0,
            }}>
            <Text style={{ color: palette.white }}>Analytics</Text>
        </BaseScreenLayout>
    );
}
