import favicon from '@assets/favicon.svg';
import { CircleButton } from '@components';
import { COLORS, icons } from '@constants';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Keyboard, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeaderBtn } from '../../components';
import SwiperList from '../../components/common/swiper/Swiper';
import { useSession } from '../../context/AuthContext';
import GetData from '../../utils/getdata';
import { useAction } from '../../utils/useAction';
import useKeyboardShow from '../../utils/useKeyboardShow';
import useLoadingHome from '../../utils/useLoadingHome';

export const shuffleArray = (array) => {
    if (array.length <= 1) return [...array];

    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        if (i !== j) {
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
    }

    if (newArray.every((val, idx) => val === array[idx])) {
        return shuffleArray(array);
    }

    return newArray;
};

export const getTopicUrl = (baseUrl, user) => {
    if (!user || !user.learnTopicSkill) {
        return `${baseUrl}/api/v1/user/find/topic?topics=`;
    }

    let topicUrl = `${baseUrl}/api/v1/user/find/topic?topics=`;
    user.learnTopicSkill.forEach((topic, index) => {
        topicUrl = `${topicUrl}${topic.name},`;
    });
    return topicUrl;
};

export const getUsersByTopic = async (baseUrl, user) => {
    const url = getTopicUrl(baseUrl, user);
    const data = await GetData(url);
    return data;
};

const Home = () => {
    const baseUrl = 'https://se346-skillexchangebe.onrender.com';

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [backButtonSize, setBackButtonSize] = useState((screenWidth / 100) * 18);

    const { user } = useSession();

    const [users, setUsers] = useState([]);

    const isLoading = useLoadingHome((state) => state.loading);
    const setIsLoading = useLoadingHome((state) => state.setLoading);
    const keyboardShow = useKeyboardShow((state) => state.keyboardShow);
    const setKeyboardShow = useKeyboardShow((state) => state.setKeyboardShow);
    const [isEndUsers, setIsEndUsers] = useState(false);

    const swipe = useAction((state) => state.swipe);

    const swiperRef = useRef(null);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardShow(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardShow(false);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        if (swipe.startsWith('left')) {
            swiperRef.current.swipeLeft();
        } else if (swipe.startsWith('right')) {
            swiperRef.current.swipeRight();
        }
    }, [swipe]);

    const getUsers = async () => {
        setIsLoading(true);
        const usersByTopic = await getUsersByTopic(baseUrl, user);
        if (usersByTopic.length === 0) {
            const allUsers = await GetData(`${baseUrl}/api/v1/user/find`);
            if (allUsers.length === 0) {
                setIsEndUsers(true);
                setIsLoading(false);
                return;
            }
            setUsers(shuffleArray(allUsers));
        } else {
            setUsers(shuffleArray(usersByTopic));
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getUsers();
    }, [user.learnTopicSkill]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.lightWhite,
                width: '100%',
            }}
        >
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerShown: false,
                    headerTitle: '',
                }}
            />
            <View style={{ marginLeft: 15, zIndex: -1 }}>
                <ScreenHeaderBtn
                    iconUrl={favicon}
                    dimension={40}
                    string="SkillExchange"
                    style={{ marginLeft: 10 }}
                />
            </View>

            <View style={{ height: '95%', width: '100%' }}>
                {isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator
                            testID="loading-indicator"
                            size="large"
                            color={COLORS.darkOrange}
                        />
                    </View>
                ) : (
                    <>
                        {!isEndUsers ? (
                            <>
                                <View style={{ marginTop: 10, height: '80%' }}>
                                    <SwiperList
                                        testID="swiper-list"
                                        users={users}
                                        swiperRef={swiperRef}
                                        onSwipedAll={() => {
                                            setIsLoading(true);
                                            setTimeout(() => {
                                                getUsers();
                                            }, 500);
                                        }}
                                    />
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: (screenWidth / 100) * 7,
                                    }}
                                >
                                    <CircleButton
                                        testID="cancel-button"
                                        iconUrl={icons.cancel}
                                        width={backButtonSize}
                                        height={backButtonSize}
                                        handlePress={() => swiperRef.current.swipeLeft()}
                                        style={{ flex: 1 }}
                                    />

                                    <CircleButton
                                        testID="tick-button"
                                        iconUrl={icons.tickCircle}
                                        width={backButtonSize}
                                        height={backButtonSize}
                                        handlePress={() => {
                                            swiperRef.current.swipeRight();
                                        }}
                                    />
                                </View>
                            </>
                        ) : (
                            <View
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: COLORS.lightOrange,
                                        fontWeight: '500',
                                        lineHeight: 23,
                                        textAlign: 'center',
                                    }}
                                >
                                    You have browsed through all the users in the topic you want to
                                    learn, go to the search tab or change to new skills to find more
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#F5FCFF',
    },
    card: {
        width: '100%',
        height: '100%',
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent',
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent',
    },
});

export default Home;
