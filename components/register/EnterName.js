import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Scale, VerticalScale, scale } from 'react-native-size-matters';
import * as Font from 'expo-font';
import customFonts from '../useFonts';
import { COLORS } from '../../constants';
import styles from './style';
import InputText from './Button/InputText';
import CustomButton from './Button/CustomButton';
import GradienLayout from './TemplateLayout/GradientLayout';
import Spinner from 'react-native-loading-spinner-overlay';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useSession } from '../../context/AuthContext';
// import { io } from 'socket.io-client';
// import { useSocketContext } from '../../context/SocketContext';

const EnterName = ({ navigation }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const { user,login, logout } = useSession();
    // const {socket, setSocket, onlineUsers, setOnlineUsers} = useSocketContext();
    useEffect(() => {
        const loadFontsAsync = async () => {
            await Font.loadAsync(customFonts);
            await Font.loadAsync(
                'antoutline',
                require('@ant-design/icons-react-native/fonts/antoutline.ttf')
            );
            await Font.loadAsync(
                'antfill',
                require('@ant-design/icons-react-native/fonts/antfill.ttf')
            );
            setFontsLoaded(true);
        };
        loadFontsAsync();
    }, []);

    const checkValidName = (name) => {
        if (name === null || name === '') {
            setNameError('Name is required');
            return false;
        } else {
            const specialCharsRegex = /[^a-zA-Z0-9\sÀ-ỹ]/;
            if (specialCharsRegex.test(name)) {
                setNameError(`Name shouldn't contain special characters`);
                return false;
            } else {
                setNameError(null);
                return true;
            }
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    const params = {
        name: name.trim(),
    };

    return (
        <GradienLayout innerStyle={{ height: scale(500) }}>
            <Spinner
                visible={isLoading}
                textContent={'Connecting to server...'}
                textStyle={{ color: COLORS.lightWhite }}
            />
            <Image source={require('../../assets/images/teamwork.png')} style={styles.image} />
            <Text
                style={{
                    fontSize: 19,
                    color: COLORS.orange,
                    marginTop: 15,
                    marginBottom: 15,
                    alignSelf: 'center',
                    fontFamily: 'Coda-Regular',
                }}
            >
                Welcome
            </Text>
            <Text style={styles.text_center}>LEARN a new skill</Text>
            <Text style={styles.text_center}>GET a new friend</Text>
            <View
                style={{
                    height: 4,
                    backgroundColor: COLORS.purple,
                    borderRadius: 50,
                    width: 120,
                    alignSelf: 'center',
                    margin: 15,
                }}
            ></View>
            <Text
                style={{
                    fontSize: 17,
                    color: COLORS.orange,
                    marginBottom: 15,
                    alignSelf: 'center',
                    fontFamily: 'Coda-Regular',
                }}
            >
                Register
            </Text>
            <InputText
                placeholder="Enter your name"
                label={null}
                error={nameError}
                onFocus={() => setNameError(null)}
                iconName="user"
                onChangeText={(text) => setName(text)}
            />
            <View
                style={{
                    marginHorizontal: 25,
                    marginTop: 10,
                }}
            >
                <CustomButton
                    text="Next"
                    margin={false}
                    onPress={() => {
                        if (checkValidName(name)) navigation.navigate('UploadPhoto', params);
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-between',
                    paddingHorizontal: 25,
                }}
            >
                <Text style={{ fontFamily: 'Coda-Regular', fontSize: 14, marginTop: 5 }}>
                    Already have an account?
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={[
                        {
                            borderRadius: 25,
                            width: 80,
                            height: 33,
                            justifyContent: 'center',
                            backgroundColor: COLORS.lightWhite,
                            borderColor: COLORS.orange,
                            borderWidth: 0.5,
                        },
                    ]}
                >
                    <Text style={[styles.buttonText, { color: COLORS.orange }]} id="loginButton">
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </GradienLayout>
    );
};

export default EnterName;
