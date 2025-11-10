import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "@constants";
import styles from "./circlebutton.style";
import { useState } from "react";

const CircleButton = ({ iconUrl, width = 60, height = 60, handlePress }) => {
	const [isFocused, setIsFocused] = useState(false);
	const widthIcon = isFocused ? width : width / 2;
	const heightIcon =isFocused ? height : height / 2;
	return (
		<TouchableOpacity
			activeOpacity={1}
			style={styles.button(width, height)}
            onPressIn={() => setIsFocused(true)}
            onPressOut={() => setIsFocused(false)}
            onPress={handlePress}
		>
			<Image
				source={iconUrl}
				style={{ width: widthIcon, height: heightIcon }}
			/>
		</TouchableOpacity>
	);
};

export default CircleButton;
