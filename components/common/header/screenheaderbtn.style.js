import { COLORS } from "@constants";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    imgBtn: (dimension) => ({
        width: dimension,
        height: dimension
    }),
    appNameText: {
        fontFamily: "PolyRegular",
        color: COLORS.skyBlue,
        fontSize: 20,
    },
});

export default styles;
