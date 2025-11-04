import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { COLORS, icons } from "@constants";
import ScreenMess from "../../components/message/main/MainMess";
const Chat = () => {
    
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerShown:false
				}}
			/>
			<ScreenMess/>
           
		</SafeAreaView>
	);
};

export default Chat;
