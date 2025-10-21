import GradienLayout from "./TemplateLayout/GradientLayout";
import { Text, View, TextInput, Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import React from "react";
import BackButton from "./Button/BackButton";
import CustomButton from "./Button/CustomButton";
import UploadModal from "./UploadModal";
class UploadCertification extends React.Component {
  state = {
    certification: [],
    uploadVisible: false,
    isShowImage: false
  }
  removeImage = (index) => {
    this.setState(prevState => {
        const certification = [...prevState.certification];
        certification.splice(index, 1);
        return { certification };
    });
  };
  setImageUri = (uri) => {
    this.setState(prevState => ({
      certification: [...prevState.certification, uri]
    }));
    this.setState({isShowImage: true});
  };
  toogleUploadModal = () => {
    this.setState({uploadVisible: !this.state.uploadVisible});
  }
  render() {
    const passing = this.props.route.params;
    params ={
      name: passing.name,
      image:  passing.image,
      description: passing.description,
      userTopic: passing.userTopic,
      skills: passing.skills,
      certification: this.state.certification
    }
    return (
      <GradienLayout>
        <Modal 
            transparent={true}
            visible={this.state.uploadVisible}
            onRequestClose={()=>this.toogleUploadModal()}>
            <UploadModal setImageUri={this.setImageUri} onRequestClose={()=>this.toogleUploadModal()}></UploadModal>
        </Modal>
        <BackButton onPress={() => this.props.navigation.goBack()}></BackButton>
        <Text style={[styles.text_center, {marginTop: 10}]}>UPLOAD</Text>
        <Text style={styles.text_center}>your certification</Text>
        <View 
            style={{
                height: 4, 
                backgroundColor: COLORS.purple, 
                borderRadius: 50,
                width: 120,
                alignSelf: 'center',
                margin: 15 }}></View>
        <View style={{height: scale(260)}}>
          {this.state.isShowImage && 
          <ScrollView vertical style={{alignSelf: 'center'}}>
              {this.state.certification.map((uri, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={{ uri: uri }} style={{ width: 230, height: 120, marginBottom: 5, borderRadius: 10 }} />
                  <TouchableOpacity
                      style={{ position: 'absolute', right: 0, top: 0 }} 
                      onPress={() => this.removeImage(index)}
                      >
                      <AntDesign name='close' size={scale(20)} color={COLORS.orange} />
                  </TouchableOpacity>
                </View>
                ))}
          </ScrollView>}
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <TouchableOpacity 
              onPress={()=>this.toogleUploadModal()} 
              style={[{flexDirection: 'row', marginLeft: scale(20), marginTop: 10}]}>
              <AntDesign 
                name='upload' 
                size={scale(15)} 
                color={COLORS.orange} 
                marginRight={5} 
                marginTop={5}/>
              <Text 
                style={{fontSize: scale(14), 
                fontFamily: 'Coda-Regular', 
                color: COLORS.orange}}>Upload</Text>
          </TouchableOpacity>       
          <CustomButton text='Next' onPress={()=>{
            // if(this.state.certification.length === 0){
            //   alert('Please upload your certification');
            //   return;
            // }
            this.props.navigation.navigate('ChooseTopic', params)
          }
            }></CustomButton>             
        </View>
      </GradienLayout>
    );
  }
}
export default UploadCertification;