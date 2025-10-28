import { StyleSheet } from "react-native-web";
import { COLORS } from "@constants";

const styles = StyleSheet.create({
	container: (keyboardShow) => ({
		borderRadius: 20,
		height: "8%",
		backgroundColor: COLORS.lightWhite,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginBottom: keyboardShow ? 100 : 0,
	}),
	focusedButton: {
		flex: 1,
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.lightGray,
	},
	button: {
		flex: 1,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.lightWhite,
	},
	searchButtonContainer: {
		borderRadius: 9999,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.lightWhite,
		height: 50,
		width: 50,
	},
	searchButton: {
		borderRadius: 99,
		height: "90%",
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.lightPeach,
	},
	whiteCircle: {
		borderRadius: 99,
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		backgroundColor: COLORS.lightWhite,

		shadowColor: COLORS.shadowBlue,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 3,
	},
});

export default styles;
