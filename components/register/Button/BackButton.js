import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';
export default BackButton = ({ onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{flexDirection: 'row', marginLeft: scale(20), alignItems: 'center'}, style]}>
            <AntDesign name='arrowleft' size={scale(15)} color={COLORS.orange} marginRight={5}></AntDesign>
            <Text style={{fontSize: scale(14), fontFamily: 'Coda-Regular', color: COLORS.orange}}>Back</Text>
        </TouchableOpacity>
    )
}