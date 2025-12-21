import { useEffect, useState } from 'react';
import Information from '../../components/home/Information';
import { useLocalSearchParams } from 'expo-router';
import GetData from '../../utils/getdata';
import { router } from 'expo-router';
import { API_CONFIG } from '../../constants';

const User = () => {
    const { id } = useLocalSearchParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserById = async () => {
            const url = `${API_CONFIG.BASE_URL}/api/v1/user/findbyid/${id}`;
            const data = await GetData(url);
            setUser(data);
        };

        getUserById();
    }, []);

    return <Information {...user} />;
};
export default User;
