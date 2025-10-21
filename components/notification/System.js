import React from 'react'
import { View,Text,Image,TouchableOpacity,Button } from 'react-native'
import {loadFonts,styles} from "./notification.style";
import { icons } from "@constants";
const System=(props)=>
{
    return(
        <View style={[styles.RequestContainer,{height:70,marginTop:10}]} >
            <View style={{width:45, height:45, marginTop:5}}>
                    <Image source={icons.app}
                            style={styles.Avatar}/>
            </View>
            <View style={styles.ContentContainer}>
                {/* thời gian */}
                <Text style={styles.Time}>{props.Time}</Text>
                {/* Tên+ thông báo */}
                    <Text style={styles.System}>{props.Content}</Text>
          
            </View>
        </View>
    )
    
}
export default System;