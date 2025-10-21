import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from "../../../constants";
import { scale } from "react-native-size-matters";
import { router } from "expo-router";

const TagsButton = (props) => {
    const handleOnPress = () => {
        router.push({
            pathname: "/result/[id]",
            params: {
              data: props.name,
            },
        });
    }

    return (
        <TouchableOpacity onPress={handleOnPress}  style={styles.button} >
            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode='tail'>{props.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '30%', 
        padding: 5, 
        borderWidth: 2, 
        borderColor: COLORS.orange,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 10,
        marginTop: 0,
        marginRight: 5,
        marginBottom: 10,
        marginLeft: 5
    },
    buttonText: {
        fontSize: scale(14),
        textAlign: 'center',
        fontFamily: 'Coda-Regular',
        color: COLORS.orange,
        fontWeight: 'bold',
    },
});

export default TagsButton;