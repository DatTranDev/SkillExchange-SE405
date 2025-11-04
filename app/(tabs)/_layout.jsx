import { Tabs } from "expo-router";
import { COLORS } from "@constants";
import { NavBar } from "../../components";

export default function TabLayout() {
    return (
        <Tabs
            initialRouteName="Index"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.lightWhite,
                },
            }}
            tabBar={(props) => <NavBar {...props} />}
        ></Tabs>
    );
}
