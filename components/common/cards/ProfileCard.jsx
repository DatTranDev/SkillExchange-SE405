import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { COLORS } from "@constants";
import { icons } from "@constants";
import Topic from "@components/common/cards/Topic";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

const ProfileCard = ({
	id,
	username,
	userTopicSkill,
	imageDisplay,
	description,
}) => {
	handleInfoPress = () => {
		router.push({
			pathname: "/user/[id]",
			params: {
				id: id,
			},
		});
	};

	const [isLoading, setIsLoading] = useState(false);

	return (
		<View
			style={{
				borderRadius: 10,
				overflow: "hidden",

				shadowColor: COLORS.shadowBlue,

				shadowOffset: {
					width: 0,
					height: 7,
				},
				shadowOpacity: 0.21,
				shadowRadius: 7.68,

				elevation: 10,
			}}
		>
			<ImageBackground
				source={
					imageDisplay
						? { uri: imageDisplay }
						: require("@assets/images/avatarDefault.jpg")
				}
				onLoadStart={() => setIsLoading(true)}
				onLoadEnd={() => setIsLoading(false)}
				contentFit="cover"
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					overflow: "hidden",
				}}
				transition={1000}
			>
				{isLoading && (
					<View
						style={{
							...StyleSheet.absoluteFillObject,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "rgba(0, 0, 0, 1)",
						}}
					>
						<ActivityIndicator size="large" color="#ffffff" />
					</View>
				)}
				<View style={{ height: "50%", width: "100%" }} />
				<ImageBackground
					source={icons.transparent_background}
					resizeMode="stretch"
					style={{ flex: 1, width: "100%" }}
				>
					<View
						style={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-end",
							padding: 15,
							width: "100%",
						}}
					>
						<View
							style={{
								flexDirection: "row",
								gap: 7,
								justifyContent: "space-between",
								alignItems: "center",
								marginVertical: 10,
							}}
						>
							<Text
								style={{
									color: COLORS.lightWhite,
									fontFamily: "NotoRegular",
									fontSize: 20,
									fontWeight: "bold",
								}}
							>
								{username}
							</Text>

							<TouchableOpacity
								style={{
									width: 35,
									height: 35,
									backgroundColor: "#fff",
									borderRadius: 50,
									alignItems: "center",
									justifyContent: "center",
								}}
								onPress={handleInfoPress}
							>
								<Image
									source={icons.info}
									style={{ width: "80%", height: "80%" }}
									width={50}
									height={50}
								/>
							</TouchableOpacity>
						</View>

						<View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
							{userTopicSkill?.map((topic, index) => (
								<Topic topicContent={topic.name} key={index} />
							))}
						</View>

						<View>
							<View>
								{!(
									typeof description === "undefined" ||
									(description.length === 1 && description[0] === "") ||
									description.length === 0
								) && (
									<>
										<Text
											style={{
												fontFamily: "NotoExtraBold",
												fontSize: 13,
												color: COLORS.lightWhite,
												marginBottom: 5,
											}}
										>
											Description:
										</Text>

										<Text
											style={{
												fontFamily: "NotoRegular",
												fontSize: 14,
												lineHeight: 21,
												color: COLORS.lightWhite,
											}}
										>
											{description}
										</Text>
									</>
								)}
							</View>
						</View>
					</View>
				</ImageBackground>
			</ImageBackground>
		</View>
	);
};

export default ProfileCard;
