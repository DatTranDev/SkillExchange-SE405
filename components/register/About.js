import GradienLayout from "./TemplateLayout/GradientLayout";
import { Text, View, TextInput, Image } from "react-native";
import styles from "./style";
import { COLORS } from "../../constants";
import React from "react";
import BackButton from "./Button/BackButton";
import CustomButton from "./Button/CustomButton";
class About extends React.Component {
  state = {
    description: "",
    image: this.props.route.params.image
  }

  render() {
    const passing = this.props.route.params;
    params ={
      name: passing.name,
      image:  passing.image,
      description: this.state.description
    }
    return (
      <GradienLayout>
        <BackButton onPress={() => this.props.navigation.goBack()}></BackButton>
        <Image source={this.state.image==='' ? require('../../assets/images/emptyAvatar.jpg'): 
            {uri: this.state.image}} style={styles.avatar}></Image>
        <Text style={[styles.text_center, {marginTop: 10}]}>ABOUT YOU</Text>
        <Text style={styles.text_center}>Let people know who you are</Text>
        <View 
            style={{
                height: 4, 
                backgroundColor: COLORS.purple, 
                borderRadius: 50,
                width: 120,
                alignSelf: 'center',
                margin: 15 }}></View>
        <TextInput
          multiline={true}
          placeholder="Description"
          style={styles.bigInput}
          value={this.state.description}
          onChangeText={(text) => this.setState({description: text})}
          >
              
        </TextInput>
        <CustomButton text='Next' onPress={()=>{

          // if(this.state.description === ''){
          //   alert('Please fill the description');
          //   return;
          // }
          this.props.navigation.navigate('ChooseKnowTopic', params)
        }
          }></CustomButton>             
      </GradienLayout>
    );
  }
}
export default About;