import { View, Text, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import favicon from "@assets/favicon.svg";
import { ProfileCard, ScreenHeaderBtn } from "..";
import { COLORS, icons } from "@constants";
import { CircleButton } from "@components";
import { Dimensions } from "react-native";
import { BackHeader } from "../../components";
import Swiper from "react-native-deck-swiper";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetData from "../../utils/getdata";
import useLoadingHome from "../../utils/useLoadingHome";
import { useSession } from "../../context/AuthContext";
import SwiperList from "../common/swiper/Swiper";
import { useAction } from "../../utils/useAction";
import { router } from "expo-router";

const Result_Screen = ({topic, handleBackButton}) => {

	const [user, setUser] = useState([])
	const baseUrl = "https://se346-skillexchangebe.onrender.com";
	const [isEndUsers, setIsEndUsers] = useState(false);

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const getuser = async () => {
		setIsLoading(true);
		const url = `${baseUrl}/api/v1/user/find/topic?topics=${topic}`;
		const data = await GetData(url);
		if(data.length === 0){
			setIsEndUsers(true);
		} else {
			setUser(shuffleArray(data));
		}
		setIsLoading(false)
	};

	useEffect(() => {
		getuser();
	}, [])
	console.log("user",user);
	
	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;
	const [backButtonSize, setBackButtonSize] = useState(
		(screenWidth / 100) * 18
	);

	const isLoading = useLoadingHome((state) => state.loading);
	const setIsLoading = useLoadingHome((state) => state.setLoading);

	const swipe = useAction((state) => state.swipe);
	
	const swiperRef = useRef(null);

	useEffect(() => {
		if (swipe === "left") {
			swiperRef.current.swipeLeft();
		} else if (swipe === "right") {
			swiperRef.current.swipeRight();
		}
	}, [swipe]);

	
	
	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color={COLORS.darkOrange} />
			</View>
		);
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.lightWhite,
				width: "100%",
			}}
		>
			<View style={{ marginLeft: 15, zIndex: -1 }}>
				<Stack.Screen
					options={{
						title: "Information",
						headerShown: true,
						headerShadowVisible: true,
						headerBackVisible: false,
						headerTitle: (props) => (
							<BackHeader
								{...props}
								headerText={"Looking with content"}
								handleBackButton={handleBackButton}
							/>
						),
					}}
				/>
			</View>

			<View style={{ height: "100%", width: "100%" }}>
			{!isEndUsers ? (
				<>
					<View style={{ marginTop: 10, height: "80%" }}>
					<SwiperList
						users={user}
						swiperRef={swiperRef}
						onSwipedAll={() => {
							setTimeout(getuser, 500);
						}}
					/>
					</View>

					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							gap: (screenWidth / 100) * 7,
						}}
					>
						<CircleButton
							iconUrl={icons.cancel}
							width={backButtonSize}
							height={backButtonSize}
							handlePress={() => swiperRef.current.swipeLeft()}
							style={{ flex: 1 }}
						/>

						<CircleButton
							iconUrl={icons.tickCircle}
							width={backButtonSize}
							height={backButtonSize}
							handlePress={() => {
								swiperRef.current.swipeRight();
							}}
						/>
					</View>
				</>
			):(
				<View
					style={{
							width: "100%",
							height: "100%",
							alignItems: "center",
							justifyContent: "center",
							paddingHorizontal: 20,
					}}
				>
						<Text
							style={{
								fontSize: 15,
								color: COLORS.lightOrange,
								fontWeight: "500",
								lineHeight: 23,
								textAlign: "center",
							}}
						>
							You have browsed through all the users in the topic you want to
							learn, go to the search tab or change to new skills to find more
						</Text>
					</View>
			)}
				
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: "#F5FCFF",
	},
	card: {
		width: "100%",
		height: "100%",
		flex: 1,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "#E8E8E8",
		justifyContent: "center",
		backgroundColor: "white",
	},
	text: {
		textAlign: "center",
		fontSize: 50,
		backgroundColor: "transparent",
	},
	done: {
		textAlign: "center",
		fontSize: 30,
		color: "white",
		backgroundColor: "transparent",
	},
});

export default Result_Screen;
