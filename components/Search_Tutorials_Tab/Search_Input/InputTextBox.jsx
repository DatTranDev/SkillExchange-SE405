import React, { useState, useEffect,useRef } from 'react';
import { SafeAreaView, Alert, StyleSheet, TouchableOpacity, FlatList, Text, View,TouchableHighlight, Keyboard  } from "react-native";
import { scale } from "react-native-size-matters";
import axios from "axios";
import { COLORS } from "../../../constants";
import { router } from "expo-router";
import InputText from "../../Search_Tutorials_Tab/Button/InputText";


const InputTextBox = () => {
  const bareUrl = "https://se346-skillexchangebe.onrender.com";
  const [query, setQuery] = useState("");
  const [topicdata, setTopicData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const inputQuery = useRef(null)
  useEffect(() => {
    if (query) {
      setFilteredData(topicdata.filter(topic => topic.name.includes(query)));
    } else {
      setFilteredData([]);
    }
  }, [query]);

  useEffect(()=>{
    getTopicData();
  },[]);

  useEffect(()=>{
    const hideSubscription = Keyboard.addListener('keyboardDidHide', ()=>{
      console.log("Unfocus")
      inputQuery.current.blur();
    })

    return () => {
      hideSubscription.remove();
    };

  }, [])
  const handleOnChangeText = (text) => {
    setQuery(text);
  };
  const handleOnBlur= () => {
    setFilteredData([]);
  };

  const handleonFocus=() =>{
    if (query) {
      setFilteredData(topicdata.filter(topic => topic.name.includes(query)));
    } else {
      setFilteredData([]);
    }
  }
  const getTopicData = async () =>{
    try {
      const response = await axios({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${bareUrl}/api/v1/topic/find`,
        headers: {}
      });
    
      if (response.status === 200) {
        setTopicData(response.data.data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users. Please try again later.");
      console.error(error);
    }
  }
  
  const getTopic = async () => { 
    try {
      const response = await axios({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${bareUrl}/api/v1/topic/find`,
        headers: {}
      });
    
      if (response.status === 200) {
        const data = response.data.data;
        const isQueryInData = data.some(topic => topic.name === query);
        if (isQueryInData) {
          router.push({
            pathname: "/result/[id]",
            params: {
              data: query,
            },
          });
        } else {
          // If query is not in data, show an alert
          Alert.alert("Error", "Topic not found. Please try again.");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch users. Please try again later.");
      console.error(error);
    }
  };

  const handleSelectTopic = (item) => {
    const topic = item.name
    router.push({
      pathname: "/result/[id]",
      params: {
        data: topic,
      },
    });
  };

  return (
    <SafeAreaView>
      
      <View style={styles.TopicList}>
        <InputText
          ref= {inputQuery}
          style = {{zIndex:3}}
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
          keyboardShouldPersistTaps='handled'
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableHighlight  
              style={{ marginBottom: 3, height: 35, zIndex: 4,width: '100%', borderRadius: 10}} 
              underlayColor={'#E5E5E5'}
              onPress={() => {handleSelectTopic(item)}
              }
              >
                <Text style ={styles.TopicText}>{"       "+item.name}</Text>
            </TouchableHighlight >
          )}
          style = {[styles.ItemList, {borderColor: filteredData.length === 0 ? 'white' : 'black'}]}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  TopicText: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    fontSize: 15,
    textAlign: 'left',
    fontFamily: 'Coda-Regular',
    color: COLORS.black,
  },
  TopicList: {
    position: 'absolute', 
    width: '100%',
    top: 0 ,
    backgroundColor: COLORS.white,
    zIndex: 3,
    borderRadius: 20,
  },
  ItemList: {
    borderWidth: 1,
    borderRadius: 10,
    zIndex:3,
    maxHeight: 300,
    marginHorizontal: 20,
  },
});
export default InputTextBox;