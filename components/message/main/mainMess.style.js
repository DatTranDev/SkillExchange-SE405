import { StyleSheet } from "react-native";

import * as Font from 'expo-font';

// Định nghĩa các font chữ
export const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-SemiBold': require('../../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('../../../assets/fonts/Inter-Regular.ttf')
  });
};

export const styles= StyleSheet.create({
    Container:{
        justifyContent: 'center',
        alignItems:'center',

    },
    Header:{
        marginTop:"10%",
        textAlign:'center',
        fontFamily:'Inter-SemiBold',
        fontSize: 22,
       
    },
    Search:{
        backgroundColor:'#E7E7E7',
        height:30,
        aspectRatio:11.5/1,
        borderRadius:36,
        marginTop:30,
        marginBottom:15,
        flexDirection:'row'
        
    },
    IconSearch:{
        marginLeft:10,
        marginTop:5,
        height:20,
        width:20
    },
    Input:{
        height:'100%',
        width:'85%',
        paddingHorizontal:10
    },
    CardContainer:
    {
        marginTop:10,
        marginLeft:'5%',
        height:'auto',
        flexDirection:'row',
        width:'90%',
        
        
    },
    AvatarContainer:
    {
        borderRadius: 30,
        borderWidth:1.5,
        width:61,
        height:61,
        overflow: 'hidden',
        borderColor:"black",

    },
    Avatar:{
        width:'100%',
        height: '100%', 
        resizeMode:'cover'
    },
    MessageContainer:{
        flexDirection:'column',
        marginLeft:15,
        marginTop:7,
        flex:1
    },
    Name:
    {
        fontFamily:'Inter-Regular',
        fontSize:19
    },
    RecentMessage:
    {
        fontFamily:'Inter-Regular',
        height:"auto",
        fontSize:13.5,
        paddingRight:3
    },
    StatusContainer:{
        justifyContent: 'center',
        alignItems:'center',
        width:40,
        flexDirection:'column',
    },
    Status:{
        height:11,
        width:11,
        borderRadius:20,
        backgroundColor:'green'
    },
    Online:{
        backgroundColor:'#04C100'
    },
    Offline:{
        backgroundColor:'#D80000'
    },
    Time:
    {
        marginTop:5,
        fontFamily:'Inter-Regular',
        fontSize:16,

    },
    Scroll:{
        // width:'100%',
        // height:620,
        flex:1
    },
    
    navbar:{
        height:90
    },
    Horizon:{
        height:'100%'
    }



})
