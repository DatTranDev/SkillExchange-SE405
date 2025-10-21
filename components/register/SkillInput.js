import GradienLayout from "./TemplateLayout/GradientLayout";
import { Text, View, TextInput, Image } from "react-native";
import styles from "./style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React from "react";
import BackButton from "./Button/BackButton";
import CustomButton from "./Button/CustomButton";
class SkillInput extends React.Component {
  state = {
    skills: ""
  }

  render() {
    const passing = this.props.route.params;
    params ={
      name: passing.name,
      image:  passing.image,
      description: passing.description,
      userTopic: passing.userTopic,
      skills: this.state.skills
    }
    return (
      <GradienLayout>
        <BackButton onPress={() => this.props.navigation.goBack()}></BackButton>
        <Image source={require('../../assets/images/skill.png')}
            style={{height: scale(122),width: scale(210), alignSelf: 'center'}}></Image>
        <Text style={[styles.text_center, {marginTop: 10}]}>DESCRIPTION</Text>
        <Text style={styles.text_center}>your skills</Text>
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
          placeholder="ex: cooking, dancing, etc."
          style={styles.bigInput}
          value={this.state.skills}
          onChangeText={(text) => this.setState({skills: text})}
          >
              
        </TextInput>
        <CustomButton text='Next' onPress={()=>{
          if(this.state.skills === ""){
            alert('Please fill the skills');
            return;
          }
          this.props.navigation.navigate('UploadCertification', params)
        }
          }></CustomButton>             
      </GradienLayout>
    );
  }
}
export default SkillInput;