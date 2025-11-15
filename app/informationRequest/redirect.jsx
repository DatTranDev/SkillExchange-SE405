import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import GetData from '../../utils/getdata';
import InformationRequest from '../../components/notification/informationRequest';

const Redirect = () => {
    const baseUrl = 'https://se346-skillexchangebe.onrender.com';

    const { id } = useLocalSearchParams();
    const { idRequest } = useLocalSearchParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUserById = async () => {
            const url = `${baseUrl}/api/v1/user/findbyid/${id}`;
            const data = await GetData(url);
            setUser(data);
        };

        getUserById();
    }, []);

    return <InformationRequest {...user} idRequest={idRequest} />;
};
export default Redirect;
