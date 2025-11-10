import Swiper from "react-native-deck-swiper";
import ProfileCard from "../cards/ProfileCard";
import PostData from "../../../utils/postdata";
import { useSession } from "../../../context/AuthContext";

export const onSwipeRight = async (index) => {
	let data;
	do {
		data = await PostData(`${baseUrl}/api/v1/request/create`, {
			senderID: user.id,
			receiverID: users[index].id,
		});
	} while (data === "Something went wrong");
}

const SwiperList = ({
	users, // List user cần show để lướt
	swiperRef, // Reference đến swiper (để lấy các property của thư viện swiper)
	onSwipedAll, // Hàm xử lý khi người dùng lướt hết tất cả các card
}) => {
	const baseUrl = "https://se346-skillexchangebe.onrender.com";

	const { user } = useSession();

	return (
		<Swiper
			ref={swiperRef}
			onSwipedRight={onSwipeRight}
			cardStyle={{ height: "100%", width: "100%" }}
			cardHorizontalMargin={0}
			backgroundColor="white"
			swipeBackCard
			renderCard={(user, index) => {
				return (
					<ProfileCard
						id={user?.id}
						skill={user?.skill}
						birthDay={user?.birthDay}
						username={user?.username}
						userTopicSkill={user?.userTopicSkill}
						imageDisplay={user?.avatar}
						imageCerti={user?.imageCerti}
						description={user?.description}
						key={index}
					/>
				);
			}}
			cards={users}
			cardVerticalMargin={0}
			onSwipedAll={onSwipedAll}
			showSecondCard={true}
			stackSize={3}
			disableTopSwipe={true}
			disableBottomSwipe={true}
			stackSeparation={5}
			overlayLabels={{
				left: {
					title: "NOPE",
					style: {
						label: {
							backgroundColor: "#FF6767",
							borderColor: "#FF6767",
							color: "white",
							borderWidth: 1,
						},
						wrapper: {
							flexDirection: "column",
							alignItems: "flex-end",
							justifyContent: "flex-start",
							marginTop: 30,
							marginLeft: -30,
						},
					},
				},
				right: {
					title: "MATCH",
					style: {
						label: {
							backgroundColor: "#4ECB71",
							borderColor: "#4ECB71",
							color: "white",
							borderWidth: 1,
						},
						wrapper: {
							flexDirection: "column",
							alignItems: "flex-start",
							justifyContent: "flex-start",
							marginTop: 30,
							marginLeft: 30,
						},
					},
				},
			}}
			animateOverlayLabelsOpacity
			animateCardOpacity
		/>
	);
};

export default SwiperList;
