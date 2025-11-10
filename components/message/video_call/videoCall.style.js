import { StyleSheet } from "react-native";

export const styles= StyleSheet.create({
    Container:{
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    LocalContainer:
    {
        position: 'absolute',
        top: '5%',
        right: '5%',
        width: 100,
        height: 150,
        backgroundColor: 'gray',
        zIndex: 1,
    },
    RemoteContainer:
    {
        flex: 1,
       
    },
    RemoteVideo:{
        flex: 1,
    backgroundColor: 'gray',
    },
    LocalVideo:{
        width: '100%',
        height: '100%',
    },
    Control:
    {
        width:257,
        heigh:52,
        position: 'absolute',
        flexDirection:'row',
        justifyContent:'space-between',
        bottom:'5%'
    },
    Button:{
        height:52,
        width:52,
        backgroundColor: 'white',
        borderRadius:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Icon:
    {
        width:23,
        height:23
    }


})
    