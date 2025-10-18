import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons } from "@constants";
import ScreenMessage from "../../components/message/mainScreen";
import ScreenChatRoom from "../../components/message/chat_room/MainRoom";
const Room = () => {
    
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerShown:false
				}}
			/>
			<ScreenChatRoom/>
           
		</SafeAreaView>
	);
};

export default Room;
