import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const HandleSessionExpired = () => {
	Alert.alert("Session Expired", "Please login again", [
		{
			text: "OK",
			onPress: () => {
				AsyncStorage.removeItem("refreshToken");
				AsyncStorage.removeItem("accessToken");
                router.replace("/signing/Signing");
			},
		},
	]);
};

export default HandleSessionExpired;