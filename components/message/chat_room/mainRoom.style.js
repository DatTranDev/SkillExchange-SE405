import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import * as Font from 'expo-font';

// Định nghĩa các font chữ
export const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-SemiBold': require('../../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('../../../assets/fonts/Inter-Regular.ttf')
  });
};

export const styles = StyleSheet.create(
{
    //Main
    Container:
    {
        justifyContent: 'center',
        // alignItems:'center',
        height:'100%',
        flex:1,
        width:'100%'
    },
    Header:
    {
        height:54,
        width:'100%',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:'9%',
        paddingHorizontal:'4%',
        
        
    },
    Name:
    {
        fontFamily:'Inter-SemiBold',
        fontSize:23.5,
        flex:1,
        textAlign:'center', 
        paddingRight:15,
        color:"#3A3939"
    },
    Scroll:
    {
        flex:1,
        width:'100%',
    },
    scrollViewContainer:{
        alignItems: 'flex-end',
        paddingVertical: 0,
        paddingHorizontal:'0.5%'
    },
    Bottom:
    {
        height:60,
        width:'90%',
        marginLeft:'5%',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
    },
    UnfriendBottom:{
        height:60,
        width:'100%',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
        borderColor: 'gray',
        borderWidth: 0.2
    },
    Input:{
    //    width:'90%',
        flex:1,
        borderWidth:1,
        borderRadius:25,
        paddingHorizontal:10,
        borderColor:'#E6E6E6',
        padding:5,
     
    },
    RecordContainer:{
        flex:1,
        borderWidth:1,
        borderRadius:25,
        paddingHorizontal:10,
        borderColor:'#E6E6E6',
        flexDirection:'row',
        padding:5,
    },
    TimeRecord:{
        marginLeft:7,
        fontSize:15,
        color:'#FFBE98'
    },

    //Message
    Layout:{    
        marginRight:'2%'
       
    },
    MessContainer:{
        flexDirection:'row',
        marginTop:0,
        width:'70%'             
    },
    DateMessage:{
        
        backgroundColor:"#BBB3B3",
        borderRadius:10,
        paddingVertical:3,
       maxWidth:200,
       fontFamily:'Inter-SemiBold',
       fontSize:10,
       marginTop:15,
       marginBottom:15,
       marginRight:"auto",
       marginLeft:'auto',
       color:'#ffffff',
       paddingHorizontal:7
    },
    Message:{
        backgroundColor:"#FFBE98",
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:2,
        padding:10,
       maxWidth:200,
       fontFamily:'Inter-Regular',
       fontSize:15,
       marginTop:5,
       marginRight:5,
       color:'#FFFFFF'
        
    },
    AvatarContainer:
    {
        borderRadius: 30,
        marginLeft:0,
        width:25,
        height:25,
        overflow: 'hidden',
        marginTop:'auto'
        

    },
    Avatar:{
        width:'100%',
        height: '100%', 
        resizeMode:'cover'
    },
    Time:{
        marginLeft:0,
        marginTop:1,
        fontSize:12
    },
    Message2:{
        backgroundColor:"#D9D4D4",
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        borderBottomLeftRadius:2,
        borderBottomRightRadius:15,
        padding:10,
       maxWidth:'70%',
       fontFamily:'Inter-Regular',
       fontSize:15,
       marginTop:5,
       marginLeft:5
        
    },
    Time2:{
        marginLeft:'auto',
        marginTop:1,
        fontSize:12
    },
    Layout2:{    
        marginRight:'auto',
        marginLeft:'2%'
       
    },
    TextFile:{
        fontSize:15, 
        marginLeft:10,
        maxWidth:150,
        color:'#383636',
        fontFamily:'Inter-SemiBold'
    }
    
    
})