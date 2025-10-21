import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Category from "./Category/Category";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useData = () => {
    const [data, setData] = useState([]); 
    const bareUrl = "https://se346-skillexchangebe.onrender.com";
    const limit = 8;
    useEffect(() => {
        const fetchData = async ()=> {
            const response = await axios({
                method: 'get',
                maxBodyLength: Infinity,
                url: `${bareUrl}/api/v1/topic/limit/${limit}`, 
                headers: { }
            })
            console.log(response.data.data);
            setData(response.data.data);
        }
        fetchData();
    }, []);

    return data;
}

const renderItem = ({ item }) => (
    <Category imageUri={item.imageUrl} name={item.name} />
);

const Topic_List = () => {
    const data = useData();
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                horizontal={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    itemContainer: {
        flex: 1,
        width: 220,
        height: 220,
        margin: 5,
        backgroundColor: "#fff",
    },
});

export default Topic_List;