import Result_Screen from '../../components/Search_Tutorials_Tab/Result_Screen';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';

const User = () => {
    const { data } = useLocalSearchParams();

    const handleBackButton = () => {
        router.back();
    };

    return <Result_Screen topic={data} handleBackButton={handleBackButton} />;
};
export default User;
