import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import GetData from "../../utils/getdata";
import InformationFriend from "../../components/message/chat_room/informationFriend";

const RedirectInformation = () => {
	const baseUrl = "https://se346-skillexchangebe.onrender.com";

	const { id } = useLocalSearchParams();
	const {idChat}= useLocalSearchParams();
	const [user, setUser] = useState(null);
	useEffect(() => {
		console.log("Hello")
		const getUserById = async () => {
			const url = `${baseUrl}/api/v1/user/findbyid/${id}`;
			const data = await GetData(url);
			console.log(data);
			setUser(data);
		};

		getUserById();
		
	}, []);

	return <InformationFriend {...user} chatId={idChat}/>;
};
export default RedirectInformation ;
