import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Modal,
} from "react-native";
import { SafeAreaView } from "react-native";
import { COLORS } from "@constants";
import Background from "@assets/icons/Background.png";
import EditProfile from "@assets/icons/Edit profile.png";
import React, { useEffect, useState } from "react";
import { Stack, router, useNavigation } from "expo-router";
import { useSession } from "../../context/AuthContext";
import avatarDefault from "@assets/images/avatarDefault.jpg";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSocketContext } from "../../context/SocketContext";
import axios from "axios";

const Profile = () => {
	const { user, logout } = useSession();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const navigation = useNavigation();
	const { socket } = useSocketContext();
	const baseUrl = "https://se346-skillexchangebe.onrender.com/api/v1";
	useEffect(() => {
		if (user) {
			console.log(user.username);
			console.log(user.email);
			console.log(user.birthDay);
			console.log(user.avatar);
		}
	}, [user]);

	function convertDate(isoDate) {
		const date = new Date(isoDate);
		const formattedDate = date.toLocaleDateString("en-GB");
		return formattedDate;
	}

	if (!user) {
		return (
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: COLORS.darkGrayProfile,
				}}
			>
				<Text>Loading...</Text>
			</SafeAreaView>
		);
	}

	const handleYourSkillsPress = () => {
		router.push("/change-your-skills");
	};

	const handleNewSkillsPress = () => {
		router.navigate("/change-new-skills");
	};

	const handleCertificationsPress = () => {
		router.navigate("/change-certifications");
	};

	const handleSkillDescription = () => {
		router.navigate("/change-skill-description");
	};

	const handleAboutYou = () => {
		router.navigate("/change-about-you");
	};

	const handleEditProfilePress = () => {
		router.navigate("/edit-profile");
	};

	const handleChangeInformationPress = () => {
		console.log(user.username + user.email + user.phoneNumber);
		router.navigate({
			pathname: "/change-information",
			params: {
				name: user.username,
				mail: user.email,
				number: user.phoneNumber,
			},
		});
	};

	const handleOpenModal = () => {
		setShowLogoutModal(true);
	};

	const handleCloseModal = () => {
		setShowLogoutModal(false);
	};

	const logoutApi = async () => {
		const refreshToken = await AsyncStorage.getItem("refreshToken");
		console.log(refreshToken);
		try {
			const response = await axios.post(
				`${baseUrl}/user/logout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				}
			);
			if (response.status === 200) {
				console.log("Logout successfull");
			} else {
				console.log(response.data);
			}
		} catch (e) {
			console.log(e);
		}
	};
	const handleLogout = async () => {
		logoutApi();
		await AsyncStorage.clear();
		navigation.navigate("EnterName");
		socket.disconnect();
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.darkGrayProfile,
				width: "100%",
			}}
		>
			<Stack.Screen
				options={{
					title: "Profile",
					headerShown: false,
				}}
			/>

			<ImageBackground
				source={Background}
				style={styles.backgroundImage}
				resizeMode="cover"
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={{ width: "100%" }}
				>
					<View style={styles.profileContainer}>
						<View style={styles.headerContainer}>
							<Text style={styles.headerText}>Personal</Text>
						</View>
						<View style={styles.imgContainer}>
							<Image
								source={
									user.avatar === "" ? avatarDefault : { uri: user.avatar }
								}
								style={styles.avatarImage}
							/>
							<TouchableOpacity
								style={{ alignItems: "flex-end", top: -115 }}
								onPress={handleEditProfilePress}
							>
								<Image source={EditProfile} />
							</TouchableOpacity>
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.usernameText}>{user.username}</Text>
						</View>
					</View>

					<View style={styles.informationContainer}>
						<View
							style={{
								backgroundColor: "white",
								borderRadius: 7,
								elevation: 5,
								shadowColor: COLORS.shadowBlue,
								paddingHorizontal: 2,
							}}
						>
							<View
								style={{
									paddingHorizontal: 10,
									paddingVertical: 25,
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Text
									style={{
										fontSize: 15,
										fontWeight: "500",
										color: "#222222",
									}}
								>
									General information
								</Text>
								<TouchableOpacity onPress={handleChangeInformationPress}>
									<Text style={{ fontSize: 15, color: "#0386D0" }}>
										Change Information
									</Text>
								</TouchableOpacity>
							</View>

							<View
								style={{
									paddingHorizontal: 10,
									paddingBottom: 20,
									borderBottomWidth: 1,
									borderColor: "#D1D1D1",
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<View>
									<Text>Birthday</Text>
								</View>
								<Text>{user && convertDate(user.birthDay)}</Text>
							</View>
							<View style={styles.items}>
								<View>
									<Text>Email</Text>
								</View>
								<Text>{user && user.email}</Text>
							</View>
						</View>

						<View
							style={{
								backgroundColor: "white",
								borderRadius: 7,
								elevation: 5,
								shadowColor: COLORS.shadowBlue,
								paddingHorizontal: 2,
							}}
						>
							{/* My skills */}
							<View style={{ paddingHorizontal: 10, paddingVertical: 25 }}>
								<Text
									style={{
										fontSize: 15,
										fontWeight: "500",
										color: "#222222",
									}}
								>
									Skills information
								</Text>
							</View>

							<TouchableOpacity
								style={{
									paddingHorizontal: 10,
									paddingBottom: 20,
									borderBottomWidth: 1,
									borderColor: "#D1D1D1",
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
								onPress={handleYourSkillsPress}
							>
								<Text style={{ fontSize: 15, color: "#222222" }}>
									Your skills
								</Text>

								<Text style={{ fontSize: 15, color: "#0386D0" }}>Change</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={{
									paddingHorizontal: 10,
									paddingVertical: 20,
									paddingTop: 20,
									borderBottomWidth: 1,
									borderColor: "#D1D1D1",
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
								onPress={handleNewSkillsPress}
							>
								<Text style={{ fontSize: 15, color: "#222222" }}>
									New skills
								</Text>

								<Text style={{ fontSize: 15, color: "#0386D0" }}>Change</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={{
									paddingHorizontal: 10,
									paddingVertical: 20,
									paddingTop: 20,
									borderBottomWidth: 1,
									borderColor: "#D1D1D1",
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
								onPress={handleCertificationsPress}
							>
								<Text style={{ fontSize: 15, color: "#222222" }}>
									Certifications
								</Text>

								<Text style={{ fontSize: 15, color: "#0386D0" }}>Change</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={{
									paddingHorizontal: 10,
									paddingVertical: 20,
									paddingTop: 20,
									borderBottomWidth: 1,
									borderColor: "#D1D1D1",
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
								onPress={handleSkillDescription}
							>
								<Text style={{ fontSize: 15, color: "#222222" }}>
									Skill description
								</Text>

								<Text style={{ fontSize: 15, color: "#0386D0" }}>Change</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={{
									paddingHorizontal: 10,
									paddingVertical: 20,
									paddingTop: 20,
									borderBottomWidth: 1,
									borderColor: "#D1D1D1",
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
								onPress={handleAboutYou}
							>
								<Text style={{ fontSize: 15, color: "#222222" }}>
									About you
								</Text>

								<Text style={{ fontSize: 15, color: "#0386D0" }}>Change</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity
							style={{
								backgroundColor: COLORS.white,
								borderRadius: 27,
								alignSelf: "center",
								paddingHorizontal: 30,
								paddingVertical: 10,
							}}
							onPress={handleOpenModal}
						>
							<Text
								style={{
									textAlign: "center",
									fontSize: 16,
									fontWeight: "bold",
									color: COLORS.red,
								}}
							>
								Log out
							</Text>
						</TouchableOpacity>
						<Modal
							transparent={true}
							visible={showLogoutModal}
							onRequestClose={handleCloseModal}
						>
							<View style={styles.logoutModalContainer}>
								<View style={styles.logoutModalContent}>
									<Text style={styles.logoutModalText}>
										Are you sure you want to log out?
									</Text>
									<View style={styles.logoutModalButtons}>
										<TouchableOpacity
											style={styles.logoutButton}
											onPress={async () => {
												await handleLogout();
											}}
										>
											<Text style={styles.logoutButtonText}>Yes</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={styles.cancelButton}
											onPress={handleCloseModal}
										>
											<Text style={styles.cancelButtonText}>Cancel</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</Modal>

						<View></View>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "40%",
	},
	profileContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	headerContainer: {
		marginTop: 50,
		marginBottom: -70,
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 25,
	},

	avatarImage: {
		width: 120,
		height: 120,
		marginTop: 100,
		borderRadius: 60,
		resizeMode: "cover",
		overflow: "hidden",
	},
	textContainer: {
		alignItems: "center",
		marginBottom: 0,
		marginTop: -30,
	},
	usernameText: {
		fontSize: 18,
		fontSize: 22,
		fontWeight: "bold",
	},
	headerInformation: {
		fontSize: 24,
		fontWeight: "bold",
		marginRight: 100,
		marginTop: 15,
	},
	informationContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 20,
		marginTop: 20,
		paddingHorizontal: 10,
	},
	items: {
		flexDirection: "row",
		backgroundColor: "#FFFFFF",
		paddingVertical: 20,
		paddingHorizontal: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "space-between",
	},
	rectangle: {
		width: 350,
		height: 400,
		padding: 20,
		backgroundColor: "#FFFFFF",
		marginTop: 10,
		borderRadius: 10,
	},
	logoutModalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	logoutModalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	logoutModalText: {
		fontSize: 18,
		marginBottom: 20,
	},
	logoutModalButtons: {
		flexDirection: "row",
	},
	logoutButton: {
		backgroundColor: "red",
		padding: 10,
		borderRadius: 5,
		marginRight: 10,
	},
	logoutButtonText: {
		color: "white",
		fontWeight: "bold",
	},
	cancelButton: {
		backgroundColor: "gray",
		padding: 10,
		borderRadius: 5,
	},
	cancelButtonText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default Profile;
