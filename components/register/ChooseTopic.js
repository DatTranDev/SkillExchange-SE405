import GradienLayout from "./TemplateLayout/GradientLayout";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React from "react";
import BackButton from "./Button/BackButton";
import CustomButton from "./Button/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
class ChooseTopic extends React.Component {
  state = {
    uploadVisible: false,
    learnTopic: [],
    isLoading: false,
    loadingMore: false,
    page: 1,
  }
  selectTopic = (item) => {
    this.setState(prevState => ({
      learnTopic: prevState.learnTopic.map(learnTopic =>
        learnTopic._id === item._id ? { ...learnTopic, chosen: !learnTopic.chosen } : learnTopic
      )
  }));
  };
  
  fetchTopic = async () => {
    this.setState({isLoading: true, loadingMore: true});
    try {
      const response = await fetch(`https://se346-skillexchangebe.onrender.com/api/v1/topic/pagination?page=${this.state.page}&limit=8`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const topicsWithChosen = json.data.map(learnTopic => ({ ...learnTopic, chosen: false }));
        this.setState(prevState => ({
            learnTopic: [...prevState.learnTopic, ...topicsWithChosen],
            page: prevState.page + 1
        }));
    } catch (error) {
        console.error('Error fetching topics:', error);
        alert('Error fetching topics:', error);
    } finally {
        this.setState({isLoading: false, loadingMore: false});
    }
}
  componentDidMount = async () =>{
    const page = await AsyncStorage.getItem('topicPage');
    this.setState({page: parseInt(page)});
    const topic = await AsyncStorage.getItem('topic');
    this.setState({learnTopic: JSON.parse(topic)});
    this.fetchTopic();
  }
  render() {
    const passing = this.props.route.params;
    const topicID = this.state.learnTopic.filter(learnTopic => learnTopic.chosen).map(learnTopic => learnTopic._id);
    params ={
      name: passing.name,
      image:  passing.image,
      description: passing.description,
      userTopic: passing.userTopic,
      skills: passing.skills,
      certification: passing.certification,
      topic: topicID
    }
    return (
      <GradienLayout>
        <Spinner
            visible={this.state.isLoading}
            textContent={'Loading topic...'}
            textStyle={{color: '#FFF'}}
        />
        <BackButton onPress={() => this.props.navigation.goBack()}></BackButton>
        <Text style={[styles.text_center, {marginTop: 10}]}>CHOOSE TOPIC</Text>
        <Text style={styles.text_center}>you want to learn</Text>
        <View 
            style={{
                height: 4, 
                backgroundColor: COLORS.purple, 
                borderRadius: 50,
                width: 120,
                alignSelf: 'center',
                margin: 15 }}></View>
        <View style={{height: scale(260), alignSelf: 'center', width: scale(300)}}>
        <FlatList
            onEndReached={() => this.fetchTopic()}
            onEndReachedThreshold={0.5}
            data={this.state.learnTopic}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    style={item.chosen ? styles.topicButtonSelected : styles.topicButton}
                    onPress={() => this.selectTopic(item)}>
                    <Text 
                        style={item.chosen ? styles.topicTextSelected : styles.topicText} 
                        numberOfLines={2} 
                        ellipsizeMode='tail'>{item.name}</Text>
                </TouchableOpacity>
            )}
            numColumns={2}/>
        </View>         
        <CustomButton 
          text='Next' 
          onPress={async () => {
            if(topicID.length === 0){
              alert('Please choose at least 1 topic');
              return;
            }
            
            this.props.navigation.navigate('UploadInfo', params)
          }
          }></CustomButton>             
      </GradienLayout>
    );
  }
}
export default ChooseTopic;