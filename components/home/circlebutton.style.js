import { StyleSheet } from "react-native";

import { COLORS } from "@constants";

const styles = StyleSheet.create({
	button: (width, height) => ({
		width: width,
		height: height,
		backgroundColor: COLORS.lightWhite,
		borderRadius: 999,
		justifyContent: "center",
		alignItems: "center",

		shadowColor: COLORS.shadowBlue,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 6,
	}),
});
export default styles;
