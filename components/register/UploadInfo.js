import GradienLayout from "./TemplateLayout/GradientLayout";
import { Text, Modal, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import BackButton from "./Button/BackButton";
import CustomButton from "./Button/CustomButton";
import InputText from "./Button/InputText";
import { ScrollView} from "react-native-gesture-handler";
import Policy from "./Policy";
import Spinner from "react-native-loading-spinner-overlay";
import mime from 'react-native-mime-types';
import Notification from "../common/Notification";
class UploadInfo extends React.Component {
  state = {
      //Input fields
      password: null,
      confirmPassword: null,
      phoneNumber: null,
      email: null,
      birthDay: null,
      date: new Date(),
     
      //Error messages
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      phoneNumberError: null,
      birthDayError: null,
      
      //State of components
      loading: false,
      alertMessage: null,
      showPicker: false,
      showPolicy: false,
      showAlert: false,
      success: false,

      //Data
      numCerti: 1,
      avatar: null,
      imageCerti: [],
    }
  tooglePicker = () => {
    this.setState({showPicker: !this.state.showPicker});
  }
  tooglePolicy = () => {
    this.setState({showPolicy: !this.state.showPolicy});
  }
  toogleAlert = () => {
    this.setState({showAlert: !this.state.showAlert});
  }
  onDateChange = ({type}, selectedDate) => {
      this.tooglePicker();
      const currentDate = selectedDate;
      this.setState({date: currentDate});
      this.setState({birthDay: this.formatDate(currentDate)});
  }
  formatDate = (rawDate) => {
    let date = new Date(rawDate);
    const formattedDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    return formattedDate;
  }
  validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  validatePassword = (password) => {
      const regex = /^.{8,}$/;
      return regex.test(password);
  };
  validatePhoneNumber = (phoneNumber) => {
    const regex = /^0\d{9}$/;
    return regex.test(phoneNumber);
  };
  normalizeName = (str) => {
    const from = "đĐ";
    const to   = "dD";

    let newStr = str.split('').map((letter) => {
        const index = from.indexOf(letter);
        return index !== -1 ? to[index] : letter;
    }).join('');

    return newStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '');
  }
  
  handleRegister = async () => {
    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const phoneNumber = this.state.phoneNumber;
    const birthDay = this.state.birthDay;
    let check=true;
      if(password !== this.state.confirmPassword) {
        check=false;
        this.setState({confirmPasswordError: 'Password does not match'});
      } 
      if(!this.validateEmail(email)) {
        check=false;
        this.setState({emailError: 'Invalid email address'});
      }
      if(!this.validatePassword(password)) {
        check=false;
        this.setState({passwordError: 'Password must contain at least 8 characters'});
      }
      if(!this.validatePhoneNumber(phoneNumber)) {
        check=false;
        this.setState({phoneNumberError: 'Invalid phone number'});
      }
      if(birthDay === null) {
        check=false;
        this.setState({birthDayError: 'Please choose your birthday'});
      }
      if(check) {
        this.setState({loading: true});
        const passing = this.props.route.params;
        const name = this.normalizeName(passing.name);
        const avatar = await uploadImage(passing.image, name + 'Avatar');
        if(avatar === false){
          this.setState({loading: false});
          return;
        }
        else{
          this.setState({avatar: avatar});
        }
        let imageCerti = [];
        for(let i = 0; i < passing.certification.length; i++){
          const certi = await uploadImage(passing.certification[i], name + 'Certi' + i);
          console.log("Certi ", certi);
          if(certi!==false){
            imageCerti.push(certi);
          }
          else{
            this.setState({loading: false});
            return;
          }       
        }
        this.setState({imageCerti: imageCerti});
        params ={
          username: passing.name,
          email: this.state.email, 
          password: this.state.password,
          phoneNumber: this.state.phoneNumber,
          skill: passing.skills,
          birthDay: this.state.birthDay,
          userTopicSkill: passing.userTopic,
          learnTopicSkill : passing.topic,      
          avatar:  avatar,
          imageCerti: imageCerti,
          description: [passing.description],
        }
        try{
          const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)});
            if(!response.ok){
              const json = await response.json();
              alert(json.message);
              this.setState({success: false});
              this.setState({loading: false});
            }   
            else{
              const json = await response.json();
              
              user = json.data;
              this.setState({success: true}); 
              this.setState({loading: false});
              this.setState({alertMessage: 'Welcome ' + user.username + ' to Skill Exchange'});
              this.toogleAlert();
            }   
        }
        catch(error){
          console.error('register err: '+error);
          alert('Register failed: ' + error.message);
          this.setState({loading: false});
        }
        finally{
          this.setState({loading: false});
        }
      }
  }
  render() {
    return (
      <GradienLayout innerStyle={{height: scale(600)}}>
        <BackButton onPress={() => this.props.navigation.goBack()}></BackButton>
        <Text style={[styles.text_center, {marginTop: 5}]}>YOUR ACCOUNT</Text>
        <ScrollView style={{marginVertical: 10}}>

          <InputText 
            placeholder='Enter your email address'
            label='Email'
            error={this.state.emailError}
            onFocus={()=>this.setState({emailError: null})}
            iconName='mail'
            onChangeText={(text)=>this.setState({email: text})}/>
          <InputText 
            placeholder='Enter your password'
            label='Password'
            error={this.state.passwordError}
            onFocus={()=>this.setState({passwordError: null})}
            password={true}
            iconName='lock'
            onChangeText={(text)=>this.setState({password: text})}/>
          
          <InputText 
            placeholder='Confirm your password'
            label='Confirm Password'
            error={this.state.confirmPasswordError}
            onFocus={()=>this.setState({confirmPasswordError: null})}
            password={true}
            iconName='lock'
            onChangeText={(text)=>this.setState({confirmPassword: text})}/>
          <InputText 
            placeholder='Your phone number'
            label='Phone Number'
            error={this.state.phoneNumberError}
            onFocus={()=>this.setState({phoneNumberError: null})}
            iconName='phone'
            keyboardType='numeric'
            onChangeText={(text)=>this.setState({phoneNumber: text})}/>
          <TouchableOpacity onPress={
            ()=>{
              this.tooglePicker();
              this.setState({birthDayError: null})
            }
            }>
            <InputText
              placeholder='Your birthday'
              label='Birthday'
              error={this.state.birthDayError}
              editable={false}
              iconName='calendar'
              value={this.state.birthDay? this.state.birthDay : "Your birthday"}
              />
          </TouchableOpacity>
        </ScrollView>
        {this.state.showPicker && <DateTimePicker
          display="spinner"
          testID="dateTimePicker"
          value={this.state.date}
          mode="date"
          minimumDate={new Date(1900, 1, 1)}
          maximumDate={new Date()}
          onChange={(event, selectedDate)=>this.onDateChange(event, selectedDate)}/>}
        
        <Text style={[styles.termText]}>By signing up you are agreeing our</Text>
        <TouchableOpacity onPress={()=>this.tooglePolicy()}>
          <Text style={[styles.termText, {color: COLORS.orange, textDecorationLine: 'underline'}]}>Terms of Service and Privacy Policy</Text>
        </TouchableOpacity>
        
        <CustomButton text='Finish' onPress={()=>this.handleRegister()} style={{marginBottom: 10}}></CustomButton>   
        <Modal 
          transparent={true}
          visible={this.state.showPolicy}
          onRequestClose={()=>this.tooglePolicy()}>
            <Policy onPress={() =>this.tooglePolicy()}></Policy>
        </Modal>
        <Modal
          transparent={true}
          visible={this.state.showAlert}>
          <Notification
            text={this.state.alertMessage}
            iconName={!this.state.success?'warning':'check-circle'}
            iconColor={!this.state.success? COLORS.red: COLORS.green}
            buttonColor={COLORS.skyBlue}
            onPress={()=>{
               this.toogleAlert(); 
              if(this.state.success) this.props.navigation.navigate('Login')               
              } }/>
          </Modal>          
          <Spinner
            visible={this.state.loading}
            textContent={'Loading...'}
            textStyle={{color: '#FFF'}}
          />
      </GradienLayout>
    );
  }
}
export default UploadInfo;

export const uploadImage = async (imageUri, name) => {
  const formData = new FormData();
  const extension = imageUri.split('.').pop();
  const type = mime.lookup(extension) || 'image/jpeg';
  formData.append('image', {
      name: `${name}`,
      type: type,
      uri: imageUri,
  });
  try{
    const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/upload/image', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    if(response.ok){
      const json = await response.json();
      return json.image;
    }
    else{
      alert('Upload image failed: ' + response.status);
      return false;
    }
  }
  catch(error){
    alert('Upload image failed: ' + error.message);
    return false;
  }
}