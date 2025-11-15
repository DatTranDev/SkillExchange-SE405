import CheckRefreshToken from '../checkrefreshtoken';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HandleSessionExpired from '../handlesession';

const GetData = async (url) => {
    const getUsingAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response.status !== 401) {
                return 'Something went wrong';
            } else {
                return null;
            }
        }
    };

    const checkRefreshToken = async () => {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
            HandleSessionExpired();
        }
        const accessToken = await CheckRefreshToken(refreshToken);
        if (accessToken === 'Session expired') {
            HandleSessionExpired();
        } else if (accessToken === null) {
            return 'Something went wrong';
        } else {
            AsyncStorage.setItem('accessToken', accessToken);
        }
    };

    const data = await getUsingAccessToken();
    if (data === null) {
        await checkRefreshToken();
        const newData = await getUsingAccessToken();
        if (newData === 'Something went wrong') return 'Something went wrong';
        return newData.data;
    } else if (data === 'Something went wrong') {
        return 'Something went wrong';
    } else {
        return data.data;
    }
};

export default GetData;
