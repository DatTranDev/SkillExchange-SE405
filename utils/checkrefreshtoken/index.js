import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { API_CONFIG } from '../../constants';

const CheckRefreshToken = async (refreshToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}/api/v1/token/refresh-token`, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        return response.data.access_token;
    } catch (error) {
        if (error.response.status !== 401) {
            return null;
        } else {
            return 'Session expired';
        }
    }
};

export default CheckRefreshToken;
