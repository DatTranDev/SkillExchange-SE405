import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const CheckRefreshToken = async (refreshToken) => {
	const baseUrl = "https://se346-skillexchangebe.onrender.com";
	try {
		const response = await axios.get(`${baseUrl}/api/v1/token/refresh-token`, {
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		});
		return response.data.access_token;
	} catch (error) {
		if (error.response.status !== 401) {
			return null;
		} else {
			return "Session expired";
		}
	}
};

export default CheckRefreshToken;
