import { scale } from "react-native-size-matters";
import { COLORS } from "../../../constants";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import React, { useState } from "react";
const InputText = ({
    label,
    iconName,
    error, 
    password, 
    onFocus = () =>{}, 
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    return(
        <View style={{marginVertical:  5, marginHorizontal: 10, paddingHorizontal: 10}} >
            {label&&<Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, 
                {borderColor: error
                ? COLORS.red
                : isFocused 
                ? COLORS.black 
                : COLORS.light}]}>
                <IconOutline 
                    name={iconName} 
                    size={scale(14)} 
                    color={COLORS.gray} 
                    style={{marginRight: 10}} />
                <TextInput
                    secureTextEntry={hidePassword} 
                    autoCorrect={false}
                    {...props} 
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                        props.onFocus && props.onFocus();
                    }} 
                    onBlur={() => {setIsFocused(false);props.onBlur && props.onBlur();}}
                    style={{color: COLORS.black, flex: 1}}
                    />
                
                {password && 
                    <IconOutline 
                        name={hidePassword ? 'eye-invisible' : 'eye'} 
                        size={scale(16)} 
                        color={COLORS.gray} 
                        onPress={() => setHidePassword(!hidePassword)} />}
            </View>
            {error && <Text style={{color: COLORS.red, fontSize: scale(10)}}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: scale(10),
        color: COLORS.grey,
        fontFamily: 'Coda-Regular'
    },
    inputContainer: {
        height: scale(45),
        backgroundColor: COLORS.lightGray1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center',
        borderRadius: 10
    },
})
export default InputText;