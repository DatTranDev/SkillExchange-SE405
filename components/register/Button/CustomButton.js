import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants";
const CustomButton = ({ 
    onPress, 
    text,
    style,
    margin = true,
    textColor = COLORS.lightWhite,
    backgroundColor = COLORS.orange
}) => {
    return (
        <TouchableOpacity style={[{ 
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',        
                borderRadius: 25,
                width: 80, height: 33,
                marginTop: margin? 10 : 0,
                marginRight: margin ? 30: 0,
                backgroundColor: backgroundColor }, style]}
                onPress={onPress}>
        <Text 
            style={[{
                fontSize: 14, 
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 0,
                fontFamily: 'Coda-Regular'},{color: textColor}]}>{text}</Text>
        </TouchableOpacity>
    )
}
export default CustomButton;