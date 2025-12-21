import HandleSessionExpired from '../handlesession';
import axios from 'axios';
import CheckRefreshToken from '../checkrefreshtoken';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteData = (url,data) => {
    console.log(url);
    const deleteUsingAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log(accessToken);
        try {
            const response = await axios.delete(url,data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response.status !== 401) {
                return 'Something went wrong';
            } else {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                const newAccessToken = await CheckRefreshToken(refreshToken);
                if (newAccessToken === 'Session expired') {
                    HandleSessionExpired();
                } else {
                    await AsyncStorage.setItem('accessToken', newAccessToken);
                    deleteUsingAccessToken();
                }
            }
        }
    };
    return deleteUsingAccessToken();
};

export default DeleteData;
