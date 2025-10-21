import { StyleSheet } from "react-native";

import * as Font from 'expo-font';

// Định nghĩa các font chữ
export const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf')
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
        height:25,
        aspectRatio:4.8/1,
        justifyContent:'space-between',
        marginTop:10,
        marginBottom:12,
        flexDirection:'row',       
    },
    Choose:
    {
        borderBottomWidth:1,
        borderBottomColor:'#FFBE98',
        color:'#FFBE98',
    },
    Option:
    {
        fontSize:13,
        fontFamily:'Inter-SemiBold',
        
        padding:2,
        
       
    },
    RequestContainer:
    {

        paddingHorizontal:'3%',
        paddingVertical:'2.5%',
        height:'auto',
        flexDirection:'row',
        width:'94%',
        backgroundColor:'rgba(255, 190, 152, 0.11)',
        marginTop:3,
        borderRadius:14,
        marginLeft:'2.5%'

    
        
        
    },
    AvatarContainer:
    {
        borderRadius: 20,
        width:35,
        height:35,
        overflow: 'hidden',
        marginTop:5

    },
    Avatar:{
        width:'100%',
        height: '100%', 
        resizeMode:'cover'
    },

    ButtonContainer:
    {
        width:110,
        height:32,
        borderWidth:1,
        justifyContent: 'center',
        alignItems:'center',
        borderColor:'#E6E6E6',
        borderRadius:7,
        marginTop:7

    },
    ButtonContainer2:
    {
        width:90,
        height:32,
        borderWidth:1,
        justifyContent: 'center',
        alignItems:'center',
        borderColor:'#E6E6E6',
        borderRadius:7,
        marginTop:7

    },
    Button:{
        fontSize:15.9,
        fontFamily:'Inter-SemiBold',
        color:'#FFBE98'
    },
    ContentContainer:
    {
        marginLeft:12,
        width:'auto'
    },
    Time:{
        fontFamily:'Inter-Regular',
        fontSize:12,
        color:'#999999',
    },
    textContainer: {
        flexDirection: 'row', // Đặt hướng của các phần tử con là hàng ngang
        alignItems: 'center', // Căn giữa theo chiều dọc
        maxWidth:'100%',
      },
    Name:
    {
        fontFamily:'Inter-SemiBold',
        fontSize:15,
        maxWidth:100
    },
    Content:{
        fontFamily:'Inter-Regular',
        fontSize:14.5,
        color:'#666666',
    },
    System:{
        marginTop:2,
        fontFamily:'Inter-SemiBold',
        fontSize:14
    },
    Scroll:{
        // width:'100%',
        // height:620,
        flex:1,
        
    },
    
    navbar:{
        height:90
    },
    Horizon:{
        height:'100%'
    },
    Response:{
        flexDirection:'row',       
    }




})
