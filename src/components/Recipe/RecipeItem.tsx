import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { families } from "src/theme";
import palette from "src/theme/colors/palette";
// import { getFilePathFromPHAsset } from "src/utils/getFilePathFromPHAsset";

export const RecipeItem = ({ recipe, onPress }) => {
    const { t } = useTranslation();
    const [fileUri, setFileUri] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // if (recipe?.imageLocal) {
        //     getFilePathFromPHAsset(recipe.imageLocal).then((uri) => {
        //         setFileUri(uri);
        //         setLoading(false);
        //     });
        // } else {
            setLoading(false);
        // }
    }, [recipe?.imageLocal]);

    return (
        <TouchableOpacity key={recipe?.id} style={styles.item} onPress={onPress}>
            {loading ? (
                <ActivityIndicator size="large" color="blue" style={{ width: 164, height: 120, borderRadius: 20 }} />
            ) : /*fileUri*/recipe?.imageLocal ? (
                <Image source={{ uri: /*fileUri*/recipe?.imageLocal }} style={{ width: 164, height: 120, borderRadius: 20 }} />
            ) : (
                <ActivityIndicator size="large" color="blue" style={{ width: 164, height: 120, borderRadius: 20 }} />

                // <View style={{ width: 164, height: 120, borderRadius: 20, backgroundColor: "#ccc", justifyContent: "center", alignItems: "center" }}>
                //     <Text>No</Text>
                // </View>
            )}
            <Text style={styles.text} numberOfLines={1}>{recipe?.name ?? ''}</Text>
            <Text style={styles.subtext}>{recipe?.time?.['total-time'] ? `${recipe?.time['total-time']} ${t('min')}` : ''}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        width: 164,
        // height: 174,
        borderRadius: 20,
        marginRight: 16, 
    },
    text: {
        fontFamily: families.geist500,
        fontWeight: '500',
        color: palette.white,
        fontSize: 16,
        lineHeight: 26,
        marginTop: 8
    },
    subtext: {
        fontFamily: families.geist,
        color: palette.white048,
        fontSize: 14,
        lineHeight: 20
    },
});