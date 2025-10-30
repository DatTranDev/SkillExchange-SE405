import {
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	Alert,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import styles from "../../components/register/style";
import InputText from "../../components/register/Button/InputText";
import BackButton from "../../components/register/Button/BackButton";
import CustomButton from "../../components/register/Button/CustomButton";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useSession } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import PatchData from "../../utils/patchdata";
import avatarDefault from "@assets/images/avatarDefault.jpg";


export	const handleChangeInformation = async (user, username, email, phonenumber) => {
	if (username === "" || email === "" || phonenumber === "") {
		alert("Please fill all the fields");
		return false;
	}
	else{
		const baseUrl = "https://se346-skillexchangebe.onrender.com";
		const data = await PatchData(`${baseUrl}/api/v1/user/update/${user.id}`, {
			username: username,
			email: email,
			phoneNumber: phonenumber,
		});
		if (!data || data === "404" || data === "Something went wrong") {
			alert("Something went wrong when updating user's skill");
			return false;
		}
		else
		{
			alert("Updated successfully");
			return true;
		}
	}
};

const ChangeInformation = () => {
	const { name } = useLocalSearchParams();
	const { mail } = useLocalSearchParams();
	const { number } = useLocalSearchParams();
	const [skill, setSkill] = useState("");
	const { user, login } = useSession();
	const [isUpdating, setIsUpdating] = useState(false);
	const [username, setUserName] = useState(name);
	const [email, setEmail] = useState(mail);
	const [phonenumber, setPhoneNumber] = useState(number);
	const handle = async () => {
		setIsUpdating(true);
		const check = await handleChangeInformation(user, username, email, phonenumber);
		if(check){
			login({
				...user,
				username: username,
				email: email,
				phoneNumber: phonenumber,
			});
			router.replace('/profile');
		}
		
		setIsUpdating(false);
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView
				style={{
					flex: 1,
				}}
			>
				<Stack.Screen
					options={{
						title: "Change skill description",
						headerShown: false,
						headerTitle: "",
					}}
				/>
				<Spinner
					visible={isUpdating}
					textContent={"Updating..."}
					textStyle={{ color: "#FFF" }}
				/>
				<LinearGradient
					style={{
						flex: 1,
						backgroundColor: "#fff",
						alignItems: "center",
						justifyContent: "center",
					}}
					colors={["#FFBE98", "#7751C7"]}
				>
					<View
						style={{
							backgroundColor: "#fff",
							borderRadius: 30,
							height: "auto", //554/896
							width: scale(320), //372/410,
							padding: 20,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								router.back();
							}}
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<AntDesign
								name="arrowleft"
								size={16}
								color={COLORS.orange}
								style={{ marginRight: 5 }}
							/>
							<Text
								style={{
									fontSize: 14,
									fontFamily: "CodaRegular",
									color: COLORS.orange,
								}}
							>
								Back
							</Text>
						</TouchableOpacity>

						<Text style={[styles.text_center, { marginTop: 10 }]}>
							CHANGE INFORMATION
						</Text>
						<InputText
							placeholder="Your username"
							label="Username"
							error={null}
							value={username}
							onChangeText={(text) => {
								setUserName(text);
							}}
						/>
						<InputText
							placeholder="Your email address"
							label="Email"
							error={null}
							value={email}
							onChangeText={(text) => {
								setEmail(text);
							}}
						/>
						<InputText
							placeholder="Your phone number"
							label="Phone Number"
							error={null}
							keyboardType="numeric"
							value={phonenumber}
							onChangeText={(text) => {
								setPhoneNumber(text);
							}}
						/>

						<TouchableOpacity
							style={{
								backgroundColor: COLORS.orange,
								borderRadius: 27,
								alignSelf: "flex-end",
								paddingHorizontal: 20,
								paddingVertical: 7,
								marginTop: 16,
							}}
							onPress={handle}
						>
							<Text
								style={{
									textAlign: "center",
									fontSize: 16,
									color: COLORS.white,
								}}
							>
								Change
							</Text>
						</TouchableOpacity>
					</View>
				</LinearGradient>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default ChangeInformation;
