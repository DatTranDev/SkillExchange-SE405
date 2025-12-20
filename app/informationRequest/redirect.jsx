import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import GetData from '../../utils/getdata';
import InformationRequest from '../../components/notification/informationRequest';
import { API_CONFIG } from '../../constants';

const Redirect = () => {
    const { id } = useLocalSearchParams();
    const { idRequest } = useLocalSearchParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUserById = async () => {
            const url = `${API_CONFIG.BASE_URL}/api/v1/user/findbyid/${id}`;
            const data = await GetData(url);
            setUser(data);
        };

        getUserById();
    }, []);

    return <InformationRequest {...user} idRequest={idRequest} />;
};
export default Redirect;
