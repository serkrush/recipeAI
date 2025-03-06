import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorValue, StyleSheet, Text, View } from 'react-native';
import { families } from 'src/theme';
import palette from 'src/theme/colors/palette';

interface Price {
    type: string;
    priceMouthly: number;
    priceYearly: number;
    save?: number;
    active?: boolean;
}

interface PriceRowProps {
    prices: Price[];
}

const PriceRow = ({ prices }: PriceRowProps) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            {prices.map((price, index) => (
                <View
                    key={`price-${index}`}
                    style={[
                        styles.price,
                        price.active && {
                            backgroundColor: palette.hotPink02,
                            borderColor: palette.hotPink,
                        },
                    ]}
                >
                    <Text
                        style={{
                            color: palette.white,
                            fontFamily: families.geist500,
                            fontWeight: '500',
                            fontSize: 16,
                            lineHeight: 24,
                        }
                        }>
                        {price.type}
                    </Text>
                    <Text
                        style={{
                            marginTop: 4,
                            fontFamily: families.geist500,
                            fontWeight: '500',
                            color: palette.white,
                            fontSize: 24,
                            lineHeight: 28
                        }}
                    >
                        {`$${price.priceMouthly}/${t('mo')}`}
                    </Text>
                    <Text
                        style={{
                            color: palette.white048,
                            marginTop: 12,
                            fontFamily: families.geist,
                            fontSize: 14,
                            lineHeight: 20,
                        }}
                    >
                        {`$${price.priceYearly}/${t('year')}`}
                    </Text>
                    {price.save &&
                        <View
                            style={{
                                position: 'absolute',
                                right: 8,
                                top: -18,
                                backgroundColor: palette.hotPink,
                                paddingVertical: 4,
                                paddingHorizontal: 10,
                                borderRadius: 100,
                                borderWidth: 3,
                                borderColor: palette.black,
                            }}
                        >
                            <Text
                                style={{
                                    color: palette.black,
                                    fontFamily: families.geist500,
                                    fontWeight: '500',
                                    fontSize: 14,
                                    lineHeight: 20,
                                }}
                            >
                                {`${t('save')} ${price.save}%`}
                            </Text>
                        </View>}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
    },
    price: {
        backgroundColor: palette.white008,
        borderRadius: 28,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: palette.white008,
        fontFamily: families.geist500,
        fontWeight: '500',
        fontSize: 16,
        color: palette.white,
        lineHeight: 24,
        flex: 1,
    },
});

export default PriceRow;
