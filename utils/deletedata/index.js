import HandleSessionExpired from '../handlesession';
import axios from 'axios';
import CheckRefreshToken from '../checkrefreshtoken';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteData = (url, data) => {
    const deleteUsingAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                data: data,
            });
            return response.data;
        } catch (error) {
            if (!error.response) {
                return 'Something went wrong';
            }
            if (error.response.status !== 401) {
                return 'Something went wrong';
            } else {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                const newAccessToken = await CheckRefreshToken(refreshToken);
                if (newAccessToken === 'Session expired') {
                    HandleSessionExpired();
                } else {
                    await AsyncStorage.setItem('accessToken', newAccessToken);
                    return deleteUsingAccessToken();
                }
            }
        }
    };
    return deleteUsingAccessToken();
};

export default DeleteData;
