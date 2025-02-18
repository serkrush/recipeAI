import React, {useContext, useEffect, useMemo, useState} from 'react';
import ContainerContext from 'src/ContainerContext';
import {colors, fonts} from 'src/theme';
import {Text, TouchableOpacity} from 'react-native';
import BaseScreenLayout from 'src/components/layouts/BaseScreenLayout';

export default function Onboarding() {
    const di = useContext(ContainerContext);
    const navigator = di.resolve('navigator');
    return (
        <BaseScreenLayout
            containerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                backgroundColor: colors.mainBackground,
            }}>
            <Text>Onboarding</Text>
            <TouchableOpacity onPress={() => navigator.push('Welcome')}>
                <Text>Navigate Welcome</Text>
            </TouchableOpacity>
        </BaseScreenLayout>
    );
}
