import React from 'react';
import { View, Text, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { loadFonts, styles } from './notification.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import PostData from '../../utils/postdata';
import HandleSessionExpired from '../../utils/handlesession';
import { useSocketContext } from '../../context/SocketContext';
export const createChat = async (id1, id2) => {
    const { socket } = useSocketContext();
    const dataPost = {
        firstID: id1,
        secondID: id2,
    };

    if (dataPost) {
        const url = 'https://se346-skillexchangebe.onrender.com/api/v1/chat/create';
        const response = await PostData(url, dataPost);
        if (response != 404 && response !== 'Something went wrong' && response) {
            const chatData = response.data;
            const recipientID = id1;
            const res = {
                recipientID,
                chatData,
            };
            socket.emit('acceptrequest', res);
            return true;
        } else {
            Alert.alert('Alert', 'Friend request unsuccessful.');
            return false;
        }
    } else {
        Alert.alert('Alert', 'Friend request unsuccessful.');
        return false;
    }
};
const Request = (props) => {
    const loadToken = async () => {
        const token = await AsyncStorage.getItem('refreshToken');
        if (token) {
            const access = await CheckRefreshToken(token);
            if (access === null || access == 'Session expired') {
                HandleSessionExpired();
            } else {
                await AsyncStorage.setItem('accessToken', access);
                return access;
            }
        } else {
            HandleSessionExpired();
        }
    };
    const navigation = useNavigation();

    const deleteRequest = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const response = await fetch(
                `https://se346-skillexchangebe.onrender.com/api/v1/request/delete/${props.Id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status == 200) {
                const json = await response.json();
                if (json.message == 'Deleted request successfully') {
                    props.Delete(props.Id);
                }
            } else {
                if (response.status == 401) {
                    const access = await loadToken();
                    const response2 = await fetch(
                        `https://se346-skillexchangebe.onrender.com/api/v1/request/delete/${props.Id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${access}`,
                            },
                        }
                    );
                    if (response2.status == 200) {
                        const json = await response.json();
                        if (json.message == 'Deleted request successfully') {
                            props.Delete(props.Id);
                        }
                    }
                }
            }
        } catch (error) {
            Alert.alert('Alert', 'Request denial unsuccessful !');
        } finally {
        }
    };
    const handlePressDecline = async () => {
        deleteRequest();
    };
    const handlePressAccept = async () => {
        if (await createChat(props.SenderId, props.MyId)) await deleteRequest();
    };
    const moment = require('moment');
    const dateTime = moment(props.Time).format('DD/MM/YYYY HH:mm');

    if (props.Type != 'Request')
        return (
            <View style={styles.RequestContainer}>
                <View style={styles.AvatarContainer}>
                    <Image source={{ uri: props.Avatar }} style={styles.Avatar} />
                </View>
                <View style={styles.ContentContainer}>
                    {/* thời gian */}
                    <Text style={styles.Time}>{props.Time}</Text>
                    {/* Tên+ thông báo */}
                    <Text>
                        <Text style={styles.Name}>{props.Name}</Text>
                        <Text style={styles.Content}> acepted your friend request!</Text>
                    </Text>
                    {/* xem profile */}
                    <TouchableOpacity style={styles.ButtonContainer}>
                        <Text style={styles.Button}>See profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    else
        return (
            <View style={styles.RequestContainer}>
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: '/informationRequest/redirect',
                            params: { id: props.SenderId, idRequest: props.Id },
                        })
                    }
                >
                    <View style={styles.AvatarContainer}>
                        <Image
                            source={
                                props.Avatar == '' || !props.Avatar
                                    ? require('assets/images/avatarDefault.jpg')
                                    : { uri: props.Avatar }
                            }
                            style={styles.Avatar}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.ContentContainer}>
                    {/* thời gian */}
                    <Text style={styles.Time}>{dateTime}</Text>
                    {/* Tên+ thông báo */}
                    <View style={styles.textContainer}>
                        <Text style={styles.Name} numberOfLines={1} ellipsizeMode="tail">
                            {props.Name}
                        </Text>
                        <Text style={styles.Content}> wants to be your friend!</Text>
                    </View>
                    {/* xem profile */}
                    <View style={styles.Response}>
                        <TouchableOpacity
                            style={[
                                styles.ButtonContainer2,
                                { borderColor: '#27D785', backgroundColor: '#F0FFF5' },
                            ]}
                            onPress={() => {
                                handlePressAccept();
                            }}
                        >
                            <Text style={[styles.Button, { color: '#27D785' }]}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.ButtonContainer2,
                                { borderColor: '#F55247', backgroundColor: '#FFF5F5' },
                            ]}
                            onPress={() => {
                                handlePressDecline();
                            }}
                        >
                            <Text style={[styles.Button, { color: '#F55247' }]}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
};
export default Request;
