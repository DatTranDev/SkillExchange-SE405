import React from 'react'
import { View,Text,Image,TouchableOpacity } from 'react-native'
import {loadFonts,styles} from "./mainMess.style";

const CardMessage=(props)=>{
    const OnOff = props.Status=="online"?styles.Online:styles.Offline;
    if(props.Recent[0])
    {

    }
return(
    <View style={styles.CardContainer}>
        <View style={styles.AvatarContainer}>
            <Image source={(props.Avatar==""||!props.Avatar)?require('assets/images/avatarDefault.jpg'):{uri: ''+props.Avatar}}
            style={styles.Avatar}/>
        </View>
        <View style={styles.MessageContainer}>
            <Text style={styles.Name} numberOfLines={1} ellipsizeMode="tail">{props.Name}</Text>
            <Text style={styles.RecentMessage}  numberOfLines={1}
          ellipsizeMode="tail">{props.Recent}</Text>
        </View>
        <View style={styles.StatusContainer}>
            <View style={[styles.Status,OnOff]}></View>
            

        </View>
    </View>
    
);
}
export default CardMessage;