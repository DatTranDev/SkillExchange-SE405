import { View, Text } from "react-native";
import { COLORS } from "@constants";
const Topic = ({ topicContent }) => {
	return (
		<View
			style={{
				backgroundColor: COLORS.orange,
				borderRadius: 20,
				paddingLeft: 7,
                paddingRight: 7,
                paddingBottom: 2,
				justifyContent: "center",
				alignItems: "center",
				alignSelf: "flex-start", 
			}}
		>
			<Text
				style={{
					fontSize: 13,
					fontFamily: "NotoMedium",
					color: COLORS.lightWhite,
				}}
			>
				{topicContent}
			</Text>
		</View>
	);
};

export default Topic;
