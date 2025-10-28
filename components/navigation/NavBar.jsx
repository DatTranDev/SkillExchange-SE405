import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { icons } from "@constants";
import styles from "./navbar.style";
import useKeyboardShow from "../../utils/useKeyboardShow";
import { COLORS } from "@constants";

const NavBar = ({ state, descriptors, navigation }) => {
	const buttons = [
		{
			iconPressed: icons.home_focused,
			iconNotPressed: icons.home_not_focused,
			name: "home",
		},
		{
			iconPressed: icons.chat_focused,
			iconNotPressed: icons.chat_not_focused,
			name: "chat",
		},
		{
			iconPressed: icons.search,
			iconNotPressed: icons.search,
			name: "search",
		},
		{
			iconPressed: icons.notification_focused,
			iconNotPressed: icons.notification_not_focused,
			name: "notification",
		},
		{
			iconPressed: icons.profile_focused,
			iconNotPressed: icons.profile_not_focused,
			name: "profile",
		},
	];

	const [focusedButton, setFocusedButton] = useState(null);
	const order = ["home", "chat", "search", "notification", "profile"];
	const keyboardShow = useKeyboardShow((state) => state.keyboardShow);
	const routesFiltered = state.routes.filter((route) =>
		order.includes(route.name)
	);

	const routes = routesFiltered.sort(
		(a, b) => order.indexOf(a.name) - order.indexOf(b.name)
	);

	return (
		<View
			style={{
				borderRadius: 20,
				height: "8%",
				backgroundColor: COLORS.lightWhite,
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",
				marginBottom: keyboardShow ? -100 : 0,
			}}
		>
			{routes.map((route, index) => {
				if (route.name === "index") return null;

				const button = buttons.find((button) => button.name === route.name);

				const isPressed = route.name === state.routes[state.index].name;

				const onPressOut = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isPressed && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				if (route.name === "search")
					return (
						<View
							style={{
								flex: 1,
								height: "100%",
								alignItems: "center",
								justifyContent: "flex-start",
							}}
							key={index}
						>
							<TouchableOpacity
								activeOpacity={0.7}
								style={styles.searchButtonContainer}
								onPressIn={() => setFocusedButton(index)}
								onPressOut={() => {
									setFocusedButton(null);
									onPressOut();
								}}
							>
								<View style={styles.whiteCircle}>
									<View style={styles.searchButton}>
										<Image
											source={icons.search}
											style={{ width: 30, height: 30 }}
										/>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					);

				return (
					<TouchableOpacity
						activeOpacity={1}
						key={index}
						style={[
							focusedButton === index ? styles.focusedButton : styles.button,
						]}
						onPressIn={() => setFocusedButton(index)}
						onPressOut={() => {
							setFocusedButton(null);
							onPressOut();
						}}
					>
						<Image
							source={isPressed ? button.iconPressed : button.iconNotPressed}
							style={{ width: 25, height: 25 }}
						/>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};
export default NavBar;
