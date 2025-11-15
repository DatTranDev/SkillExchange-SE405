import HandleSessionExpired from '../handlesession';
import axios from 'axios';
import CheckRefreshToken from '../checkrefreshtoken';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatchData = (url, data) => {
    const patchUsingAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        try {
            const response = await axios.patch(url, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response.status === 404) {
                return '404';
            } else if (error.response.status !== 401) {
                return 'Something went wrong';
            } else {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                const newAccessToken = await CheckRefreshToken(refreshToken);
                if (newAccessToken === 'Session expired') {
                    HandleSessionExpired();
                } else {
                    await AsyncStorage.setItem('accessToken', newAccessToken);
                    patchUsingAccessToken();
                }
            }
        }
    };
    return patchUsingAccessToken();
};

export default PatchData;
