import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { icons, COLORS } from "@constants";
import { Image } from "expo-image";

const BackHeader = ({ headerText, handleBackButton }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				gap: 10,
				width: "100%",
				height: "100%",
				alignItems: "center",
			}}
		>
			<TouchableOpacity onPress={handleBackButton && handleBackButton}>
				<Image source={icons.backIcon} style={{ width: 30, height: 30 }} />
			</TouchableOpacity>
			<View>
				<Text style={{ fontSize: 22, color: COLORS.darkOrange, fontFamily: "SegoeUISemiBold", paddingBottom: 4 }}>{headerText}</Text>
			</View>
		</View>
	);
};

export default BackHeader;
