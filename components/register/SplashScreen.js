import { useState, useEffect } from "react";
import styles from "./style";
import Spinner from "react-native-loading-spinner-overlay";
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from "../../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSession } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import { useSocketContext } from '../../context/SocketContext';

const SplashScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { user,login, logout } = useSession();
    const {socket, setSocket, onlineUsers, setOnlineUsers} = useSocketContext();

    //connect socket
    useEffect(()=>{
        const newSocket= io("https://se346-skillexchangebe.onrender.com")
        setSocket(newSocket)
        console.log("id: "+newSocket.id)
        return ()=>{
            newSocket.disconnect()
        }
    },[user])
    useEffect(() => {
        if (socket === null || user === null) return;
    
        socket.emit("addOnlineUser", user?._id);
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
          console.log(onlineUsers)
        });
        
        return () => {
          socket.off("getOnlineUsers");
        };
      }, [socket, user]);
    //------------------------

    useEffect(() => {
        const fetchData = async () => {
            try {
                const refreshToken = await AsyncStorage.getItem("refreshToken");
                console.log("refreshToken when check: "+ refreshToken);
                if (refreshToken === null) {
                    setIsLoading(false);
                    navigation.navigate('EnterName');
                    return;
                }
                setIsLoading(true);
                if (refreshToken !== null) {
                    const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/token/checktoken', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            token: refreshToken,
                        }),
                    });
                    const user = await AsyncStorage.getItem('user');
                    if (response.ok && user !== null) {
                        console.log("user when check: "+ user);
                        await login(JSON.parse(user));
                        navigation.navigate('(tabs)');
                    } else {
                        console.log('User null bị xóa trong quá trình code rồi: ');
                        await logout();
                        navigation.navigate('EnterName');
                    }
                }
            } catch (e) {
                console.log('Failed to fetch the refresh token: ', e.error);
                await logout();
                setIsLoading(false);
                navigation.navigate('EnterName');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return(
        <LinearGradient
            style={styles.container}
            colors={["#FFBE98", "#7751C7"]}
            >
            <Spinner
                visible={isLoading}
                textContent={'Connecting to server...'}
                textStyle={{ color: COLORS.lightWhite }}
            />

        </LinearGradient>
    )
};
export default SplashScreen;