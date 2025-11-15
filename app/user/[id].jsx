import { useEffect, useState } from 'react';
import Information from '../../components/home/Information';
import { useLocalSearchParams } from 'expo-router';
import GetData from '../../utils/getdata';
import { router } from 'expo-router';

const User = () => {
    const baseUrl = 'https://se346-skillexchangebe.onrender.com';

    const { id } = useLocalSearchParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserById = async () => {
            const url = `${baseUrl}/api/v1/user/findbyid/${id}`;
            const data = await GetData(url);
            setUser(data);
        };

        getUserById();
    }, []);

    return <Information {...user} />;
};
export default User;
