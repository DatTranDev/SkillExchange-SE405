import { StyleSheet } from "react-native";

export const styles= StyleSheet.create({
    Container:{
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    AvatarContainer:
    {
        position: 'absolute',
        top: '25%',
        width: 110,
        height: 110,
        borderRadius:100,
        backgroundColor: 'gray',
        overflow: 'hidden',
        flexDirection:'column'
    },
    Background:
    {
        flex: 1,
    },
    Radient:
    {
        width:'100%',
        height:'100%'
    },
    RemoteVideo:{
        flex: 1,
    backgroundColor: 'gray',
    },
    Avatar:{
        width: '100%',
        height: '100%',
        resizeMode:'cover'
    },
    Control:
    {
        width:250,
        heigh:70,
        position: 'absolute',
        flexDirection:'row',
        justifyContent:'space-between',
        bottom:'7%'
    },
    Button:{
        height:60,
        width:60,
        backgroundColor: 'white',
        borderRadius:40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Icon:
    {
        width:24,
        height:24
    },
    TimeContainer:
    {
        position: 'absolute',
        top:'25%',
        marginTop:110,
        // backgroundColor:'#D1D1D1',
        borderRadius:5,
        padding:2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Name:
    {
        fontSize:25,
        color:'white'
    },
    Time:
    {
        fontSize:16,
        color:'#000000'
       
    }


})
    