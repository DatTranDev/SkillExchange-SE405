import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
("../../components");
import { COLORS } from "@constants";
import ScreenNotification from "../../components/notification/MainNotification";
const Notification = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerShown:false
					
				}}
			/>
			<ScreenNotification/>
		</SafeAreaView>
	);
};

export default Notification;
