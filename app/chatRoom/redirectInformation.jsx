import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import GetData from '../../utils/getdata';
import InformationFriend from '../../components/message/chat_room/informationFriend';
import { API_CONFIG } from '../../constants';

const RedirectInformation = () => {
    const { id } = useLocalSearchParams();
    const { idChat } = useLocalSearchParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUserById = async () => {
            const url = `${API_CONFIG.BASE_URL}/api/v1/user/findbyid/${id}`;
            const data = await GetData(url);
            setUser(data);
        };

        getUserById();
    }, []);

    return <InformationFriend {...user} chatId={idChat} />;
};
export default RedirectInformation;
