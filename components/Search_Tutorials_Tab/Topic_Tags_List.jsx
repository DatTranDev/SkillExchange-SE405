import { TouchableOpacity, Text, StyleSheet, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import TagsButton from './Topic_Tags/Tags';
import axios from 'axios';

const useData = () => {
    const [data, setData] = useState([]);
    const bareUrl = 'https://se346-skillexchangebe.onrender.com';
    const limit = 6;
    const page = 3;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios({
                method: 'get',
                maxBodyLength: Infinity,
                url: `${bareUrl}/api/v1/topic/pagination?page=${page}&limit=${limit}`,
                headers: {},
            });
            setData(response.data.data);
        };
        fetchData();
    }, []);

    return data;
};
const renderItem = ({ item }) => <TagsButton name={item.name} />;

const numColumns = 3;
const Topic_Tags_List = () => {
    const data = useData();
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                horizontal={false}
                numColumns={numColumns}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    itemContainer: {
        flex: 1,
        width: 220,
        height: 220,
        margin: 5,
        backgroundColor: '#fff',
    },
    columnWrapper: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default Topic_Tags_List;
