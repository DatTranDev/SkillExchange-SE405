import { Redirect } from "expo-router";
import { useSession } from "../../context/AuthContext";
import GetData from "../../utils/getdata";

export default function Index() {
    
	const { user } = useSession();
	if (user) {
		return <Redirect href="/home" />;
	} else {
		return <Redirect href="/signing/Signing" />;
	}
}
