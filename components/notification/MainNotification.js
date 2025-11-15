import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
// import NavBar from "./NavBar";
import { loadFonts, styles } from './notification.style';
import Request from './Requests';
import System from './System';
import { useSession } from '../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import GetData from '../../utils/getdata';
const ScreenNotification = () => {
    const [isLoading, setLoading] = useState(true);
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [isRequestTab, setIsRequestTab] = useState(true);
    const [requests, setRequest] = useState([]);
    const { user, login, logout } = useSession();
    const isFocused = useIsFocused();

    const loadToken = async () => {
        // const token = await AsyncStorage.getItem('refreshToken');
        // if(token)
        // {
        // 	const access=await CheckRefreshToken(token);
        // 	if(access===null || access=="Session expired")
        // 	{
        //     //await logout();
        // 	}
        // 	else
        // 	{
        // 		setAccessToken(access);
        // 	}
        // }
        // else
        // {
        // 	await logout();
        // }
    };
    const createRequest = async () => {
        const response = await fetch(
            'https://se346-skillexchangebe.onrender.com/api/v1/request/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFjMWM5OTkyOGZhZDhhMGU4ZDAxZTYiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcxNTE5NTk4NywiZXhwIjoxNzE3Nzg3OTg3fQ.9tlJNB-8NqfxtxeJ2Y0khcmuucbEUvdo0zSPe49ctg4',
                },
                body: JSON.stringify({
                    senderID: '661c1c99928fad8a0e8d01e6',
                    receiverID: '661aceb50b954258a9b6dc70 ',
                }),
            }
        );
    };
    const refeshReques = (idRemove) => {
        const newRes = requests.filter((res) => res._id !== idRemove);
        setRequest(newRes);
    };

    const getRequest = async () => {
        const url = `https://se346-skillexchangebe.onrender.com/api/v1/request/find/receiver/${user.id}`;
        const data = await GetData(url);
        if (data !== 'Something went wrong') {
            setRequest(data);
        }

        setLoading(false);
    };

    useEffect(() => {
        getRequest();
    }, [isFocused]);

    useEffect(() => {
        const loadFont = async () => {
            await loadFonts();
            setFontLoaded(true);
        };
        loadFont();
    }, []);
    if (!isFontLoaded) {
        return null; // Return null or a loading indicator while the font is loading
    }
    const handelPress = () => {
        setIsRequestTab(true);
        getRequest();
        // postData();
    };
    const handelPress2 = () => {
        setIsRequestTab(false);
        // createRequest();
    };

    return (
        <View style={styles.Horizon}>
            <View style={styles.Container}>
                <Text style={styles.Header}>Notification</Text>
                <View style={styles.Search}>
                    <TouchableOpacity onPress={handelPress}>
                        <Text style={[styles.Option, isRequestTab && styles.Choose]}>Requests</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handelPress2}>
                        <Text style={[styles.Option, !isRequestTab && styles.Choose]}>System</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.Scroll}>
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#FF9557"
                        animating={true}
                        style={{ flex: 1 }}
                    />
                ) : isRequestTab ? (
                    requests.length === 0 || !requests ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 80,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#FFBE98',
                                    fontSize: 18,
                                    fontFamily: 'Inter-SemiBold',
                                    letterSpacing: 0.2,
                                }}
                            >
                                No friend requests!
                            </Text>
                            <Text
                                style={{
                                    color: '#B0B0B0',
                                    fontSize: 14,
                                    fontFamily: 'Inter-Regular',
                                    marginTop: 8,
                                }}
                            >
                                You're all caught up
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={requests}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Request
                                    Type="Request"
                                    Name={item.senderID.username}
                                    Avatar={item.senderID.avatar}
                                    Time={item.dateTime}
                                    Id={item._id}
                                    Delete={refeshReques}
                                    SenderId={item.senderID.id}
                                    MyId={user.id}
                                ></Request>
                            )}
                        />
                    )
                ) : (
                    <View>
                        <System
                            Content="The chat feature has been updated !"
                            Time="10 Apr 2024 - 11:13"
                        />
                        <System
                            Content="The version 2.0 has been updated !"
                            Time="15 Jun 2024 - 22:13"
                        ></System>
                    </View>
                )}
            </View>
            <View style={styles.navbar}></View>
        </View>
    );
};
export default ScreenNotification;
// registerRootComponent(ScreenNotification);
