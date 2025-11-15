import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    Alert,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Text,
    View,
    TouchableHighlight,
    Keyboard,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import axios from 'axios';
import { COLORS } from '../../../constants';
import { router } from 'expo-router';
import InputText from '../../Search_Tutorials_Tab/Button/InputText';

const InputTextBox = () => {
    const bareUrl = 'https://se346-skillexchangebe.onrender.com';
    const [query, setQuery] = useState('');
    const [topicdata, setTopicData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const inputQuery = useRef(null);
    useEffect(() => {
        if (query) {
            setFilteredData(topicdata.filter((topic) => topic.name.includes(query)));
        } else {
            setFilteredData([]);
        }
    }, [query]);

    useEffect(() => {
        getTopicData();
    }, []);

    useEffect(() => {
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            inputQuery.current.blur();
        });

        return () => {
            hideSubscription.remove();
        };
    }, []);
    const handleOnChangeText = (text) => {
        setQuery(text);
    };
    const handleOnBlur = () => {
        setFilteredData([]);
    };

    const handleonFocus = () => {
        if (query) {
            setFilteredData(topicdata.filter((topic) => topic.name.includes(query)));
        } else {
            setFilteredData([]);
        }
    };
    const getTopicData = async () => {
        try {
            const response = await axios({
                method: 'get',
                maxBodyLength: Infinity,
                url: `${bareUrl}/api/v1/topic/find`,
                headers: {},
            });

            if (response.status === 200) {
                setTopicData(response.data.data);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch users. Please try again later.');
            console.error(error);
        }
    };

    const getTopic = async () => {
        try {
            const response = await axios({
                method: 'get',
                maxBodyLength: Infinity,
                url: `${bareUrl}/api/v1/topic/find`,
                headers: {},
            });

            if (response.status === 200) {
                const data = response.data.data;
                const isQueryInData = data.some((topic) => topic.name === query);
                if (isQueryInData) {
                    router.push({
                        pathname: '/result/[id]',
                        params: {
                            data: query,
                        },
                    });
                } else {
                    // If query is not in data, show an alert
                    Alert.alert('Error', 'Topic not found. Please try again.');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch users. Please try again later.');
            console.error(error);
        }
    };

    const handleSelectTopic = (item) => {
        const topic = item.name;
        router.push({
            pathname: '/result/[id]',
            params: {
                data: topic,
            },
        });
    };

    return (
        <SafeAreaView>
            <View style={styles.TopicList}>
                <InputText
                    ref={inputQuery}
                    style={{ zIndex: 3 }}
                    placeholder="Enter topic to search"
                    label=""
                    onChangeText={handleOnChangeText}
                    onFocus={handleonFocus}
                    onBlur={handleOnBlur}
                    onSubmitEditing={getTopic}
                    value={query}
                />
                <FlatList
                    data={filteredData}
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => (
                        <TouchableHighlight
                            style={{
                                paddingVertical: 14,
                                paddingHorizontal: 20,
                                zIndex: 4,
                                width: '100%',
                                borderBottomWidth: index === filteredData.length - 1 ? 0 : 1,
                                borderBottomColor: '#F0F0F0',
                                backgroundColor: '#FFFFFF',
                            }}
                            underlayColor={'#F0F5FF'}
                            onPress={() => {
                                handleSelectTopic(item);
                            }}
                        >
                            <Text style={styles.TopicText}>{item.name}</Text>
                        </TouchableHighlight>
                    )}
                    style={[
                        styles.ItemList,
                        { borderColor: filteredData.length === 0 ? 'transparent' : '#E0E0E0' },
                    ]}
                />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    TopicText: {
        fontSize: 15,
        textAlign: 'left',
        fontFamily: 'Coda-Regular',
        color: '#333333',
        letterSpacing: 0.2,
    },
    TopicList: {
        width: '100%',
        backgroundColor: COLORS.white,
        zIndex: 3,
        paddingBottom: 10,
    },
    ItemList: {
        borderWidth: 1,
        borderRadius: 16,
        zIndex: 3,
        maxHeight: 280,
        marginHorizontal: 20,
        marginTop: 4,
        backgroundColor: COLORS.white,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 5,
        overflow: 'hidden',
    },
});
export default InputTextBox;
