import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button,Image,TouchableOpacity } from 'react-native';
// import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from './call.style'
const ScreenCall =()=>{
    const [pressed, setPressed] = useState(false);
    const [pressed2, setPressed2] = useState(false);

  const handlePress = () => {
    setPressed(!pressed);
  };
  const handlePress2 = () => {
    setPressed2(!pressed2);
  };
    return(
        <View style={styles.Container}>
            <LinearGradient
                    colors={[ '#FFAF81','#7751C7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.Radient}>

                    <View style={styles.Background}></View>
            </LinearGradient>
          {/* Avatar */}
            <View style={styles.AvatarContainer}>
                <Image style={styles.Avatar} source={require('../test/rem2.png')}/>
            </View>

            <View style={styles.TimeContainer}>
                {/* Tên */}
                <Text style={styles.Name}>Rem</Text>
                {/* Thời gian */}
                <Text style={styles.Time}>12:21</Text>
            </View>
            <View style={styles.Control}>
               
                {/* Tắt mic */}
               <TouchableOpacity onPress={handlePress}>
                    <View style={[styles.Button,{ backgroundColor: pressed ? '#FFBE98' : 'white' }]}>
                        <Image source={icons.mic_off} style={[styles.Icon,{width:19,height:24}]}/>
                    </View>
               </TouchableOpacity>
                {/* tắt máy */}
                <TouchableOpacity > 
                    <View style={[styles.Button,{backgroundColor:'#FF2B2B'}]}>
                        <Image source={icons.call_off} style={styles.Icon}/>
                    </View>
                </TouchableOpacity>
               {/* Tắt loa */}
               <TouchableOpacity onPress={handlePress2}>
                    <View style={[styles.Button,{ backgroundColor: pressed2 ? '#FFBE98' : 'white' }]}>
                        <Image source={icons.mute} style={[styles.Icon,{width:26,height:26}]}/>
                    </View>
               </TouchableOpacity>      
            </View>
        </View>
    )
}
export default ScreenCall;
registerRootComponent(ScreenCall);