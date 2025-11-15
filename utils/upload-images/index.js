import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckRefreshToken from '../checkrefreshtoken';
import HandleSessionExpired from '../handlesession';

const UploadImages = async (url, images) => {
    const uploadUsingAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        try {
            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append('files', {
                    uri: image,
                    type: 'image/jpeg',
                    name: `image_${Date.now().toString()}_${index}.jpg`,
                });
            });

            const response = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data;
        } catch (error) {
            if (error.response.status !== 401) {
                return 'Something went wrong';
            } else {
                // Handle token expiration
                const isRefreshed = await CheckRefreshToken();
                if (isRefreshed) {
                    return uploadUsingAccessToken();
                } else {
                    HandleSessionExpired();
                    return null;
                }
            }
        }
    };

    return uploadUsingAccessToken();
};

export default UploadImages;
