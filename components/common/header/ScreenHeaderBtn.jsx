import favicon from "@assets/favicon.svg";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "react-native";
import styles from "./screenheaderbtn.style";
const ScreenHeaderBtn = ({ iconUrl, dimension }) => {
	return (
		<View
			style={styles.container}
			onPointerDown={() => router.replace("/home")}
		>
			<Image
				style={styles.imgBtn(dimension)}
				source={favicon}
				placeholder="SkillExchange"
				contentFit="cover"
			/>
			<Text style={styles.appNameText}>Skill Exchange</Text>
		</View>
	);
};

export default ScreenHeaderBtn;
