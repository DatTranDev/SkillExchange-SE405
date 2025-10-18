import { useEffect, useState } from "react";
import Result_Screen from "../../components/Search_Tutorials_Tab/Result_Screen";
import GetData from "../../utils/getdata";
import { SafeAreaView, Alert, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckRefreshToken from '../../utils/checkrefreshtoken';

const User = () => {
	const { data } = useLocalSearchParams();

	const handleBackButton = () => {
		router.back();
	};

	return <Result_Screen topic={data} handleBackButton={handleBackButton} />;
};
export default User;
