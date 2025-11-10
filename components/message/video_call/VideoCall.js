import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button,Image,TouchableOpacity } from 'react-native';
// import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import { registerRootComponent } from 'expo';
import { icons } from "@constants";
import {styles} from "./videoCall.style"

const ScreenVideoCall =()=>{
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
            <View style={styles.RemoteContainer}>
                <Image style={styles.RemoteVideo} source={require('../test/rem2.png')}/>
            </View>
            <View style={styles.LocalContainer}>
                <Image style={styles.LocalVideo} source={require('../test/rem2.png')}/>
            </View>
            <View style={styles.Control}>
                {/* tắt máy */}
                <TouchableOpacity > 
                    <View style={[styles.Button,{backgroundColor:'#FF2B2B'}]}>
                        <Image source={icons.call_off} style={styles.Icon}/>
                    </View>
                </TouchableOpacity>
                {/* Tắt mic */}
               <TouchableOpacity onPress={handlePress}>
                    <View style={[styles.Button,{ backgroundColor: pressed ? '#FFBE98' : 'white' }]}>
                        <Image source={icons.mic_off} style={[styles.Icon,{width:19,height:24}]}/>
                    </View>
               </TouchableOpacity>
               {/* Tắt cam */}
               <TouchableOpacity onPress={handlePress2}>
                    <View style={[styles.Button,{ backgroundColor: pressed2 ? '#FFBE98' : 'white' }]}>
                        <Image source={icons.video_off} style={styles.Icon}/>
                    </View>
               </TouchableOpacity>
               {/* Chuyển cam */}
               <TouchableOpacity>
                    <View style={styles.Button}>
                        <Image source={icons.change_camera} style={styles.Icon}/>
                    </View>
               </TouchableOpacity>                
            </View>
        </View>
    )
}
export default ScreenVideoCall;
registerRootComponent(ScreenVideoCall);