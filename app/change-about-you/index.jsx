import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	Alert,
	TouchableWithoutFeedback,
	Keyboard
} from "react-native";
import { useSession } from "../../context/AuthContext";
import { Image } from "expo-image";
import styles from "../../components/register/style";
import { useState } from "react";
import { COLORS } from "../../constants";
import { Stack, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "react-native-size-matters";
import PatchData from "../../utils/patchdata";

const ChangeAboutYou = () => {
	const { user, login } = useSession();
	const [description, setDescription] = useState("");

	const handleChangeAboutYou = async () => {
		const baseUrl = "https://se346-skillexchangebe.onrender.com";
		const data = await PatchData(`${baseUrl}/api/v1/user/update/${user.id}`, {
			description: [description],
		});
		if (!data || data === "404" || data === "Something went wrong") {
			alert("Something went wrong when updating user's description");
			return;
		}
		login({
			...user,
			description: [description],
		});
		Alert.alert("Successfully", "Update successfully", [
			{
				text: "OK",
				onPress: () => {
					router.back();
				},
			},
		]);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
		<SafeAreaView
			style={{
				flex: 1,
				width: "100%",
				height: "100%",
				backgroundColor: COLORS.white,
			}}
		>
			<Stack.Screen
				options={{
					title: "Change about you",
					headerShown: false,
					headerTitle: "",
				}}
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
						paddingVertical: 25,
						paddingHorizontal: 20,
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
					<Image
						source={
							!user.avatar || user.avatar === ""
								? require("../../assets/images/emptyAvatar.jpg")
								: { uri: user.avatar }
						}
						style={styles.avatar}
					></Image>
					<Text style={[styles.text_center, { marginTop: 10 }]}>ABOUT YOU</Text>
					<Text style={styles.text_center}>Let people know who you are</Text>
					<View
						style={{
							height: 4,
							backgroundColor: COLORS.purple,
							borderRadius: 50,
							width: 120,
							alignSelf: "center",
							margin: 15,
						}}
					></View>
					<TextInput
						multiline={true}
						placeholder={user.description[0]}
						style={styles.bigInput}
						value={description}
						onChangeText={(text) => setDescription(text)}
					></TextInput>
					<TouchableOpacity
						style={{
							backgroundColor: COLORS.orange,
							borderRadius: 27,
							alignSelf: "flex-end",
							paddingHorizontal: 20,
							paddingVertical: 7,
							marginTop: 16,
						}}
						onPress={handleChangeAboutYou}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 16,
								color: COLORS.white,
							}}
						>
							Done
						</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default ChangeAboutYou;
