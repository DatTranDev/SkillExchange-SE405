import { Text, View, Modal, StyleSheet } from "react-native"
import React, { useState } from "react"
import { scale } from "react-native-size-matters"
import CustomButton from "../register/Button/CustomButton"
import { IconFill, IconOutline } from "@ant-design/icons-react-native"
export default Notification = ({
    text,
    iconName,
    iconColor,
    buttonColor,
    onPress,
}) =>{
    return(
        <View style={[styles.centeredView, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
            <View style={[styles.modalView, {margin: 20, justifyContent: "center", alignItems: "center"}]}>
                <Text style={styles.header}>{text}</Text>
                <IconFill name={iconName} size={40} color={iconColor} margin={10}/>
                <CustomButton margin={false }text="OK" style={{alignSelf: 'center', marginTop: 10}} backgroundColor={buttonColor} onPress={onPress}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      width: '80%',
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "center",
      marginBottom: 10,
      fontSize: scale(16),
      fontFamily: "Coda-Regular",
      textAlign: "center",
    },
    text: {
      fontSize: 12,
      fontFamily: "Coda-Regular",
    },
  });