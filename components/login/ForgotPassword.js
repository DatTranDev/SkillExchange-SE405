import React from 'react';
import { View, Text, Image, Modal, ActivityIndicator} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import GradienLayout from '../register/TemplateLayout/GradientLayout';
import { COLORS } from '../../constants';
import styles from '../register/style';
import InputText from '../register/Button/InputText';
import { scale } from 'react-native-size-matters';
import BackButton from '../register/Button/BackButton';
import CustomButton from '../register/Button/CustomButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Notification from '../common/Notification';

class ForgotPassword extends React.Component {
    state = {
        email: null,
        errorMail: null,
        errorPassword: null,

        newPassword: null,
        confirmPassword: null,

        errorCode: null,
        sended: false,
        existEmail: false,
        code: null,

        verified: false,
        showMessage: false,

        user: null,
        checkCode: null,
        resultMessage: null,
        isLoading: false
    }

    handleResetPassword = async () => {
        //Check if password is valid
        if(this.state.newPassword === null || this.state.newPassword === '') {
            this.setState({errorPassword: 'Password is required'});
        }
        else {
            if(this.state.newPassword !== this.state.confirmPassword) {
                this.setState({errorPassword: 'Password does not match'});
            }
            else{
                if(this.state.newPassword.length < 8) {
                    this.setState({errorPassword: 'Password must be at least 8 characters'});
                }
                else {
                    //Reset password
                    this.setState({isLoading: true});
                    try {
                        const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/user/changepassword', {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: this.state.email,
                                password: this.state.newPassword
                            })
                        });
                    
                        if (!response.ok) {
                            alert('Error: ' + response.status);
                        }
                        else{
                            let json;
                            try{
                                json = await response.json();
                                this.setState({ resultMessage: json.message });
                                this.setState({ showMessage: true });
                            }
                            catch(error) {
                                console.error('Response is not JSON:', response);
                                throw new Error('Invalid response from server');
                            }
                        }
                    } catch (error) {
                        alert('Network error: ' + error.message);
                    } finally{
                        this.setState({isLoading: false});
                    }
                }
        }}
    };

    toogleCode = () =>{
        this.setState({sended: true});
    }

    sendMail = async () => {
            if(this.state.email == null || this.state.email == '') {
                this.setState({errorMail: 'Email is required'});
            }
            else {
                this.setState({isLoading : true});
                try{
                    const response = await fetch('https://se346-skillexchangebe.onrender.com/api/v1/service/sendEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email
                    })});   
                    const json = await response.json();
                    if(response.status == 400 || response.status == 404) {
                        alert('User not found');
                    }
                    else{
                        this.setState({checkCode: json.userCode});
                        alert('Send code successfully');
                        this.toogleCode();
                    }  
                }
                catch(error) {
                    alert('Network error: ' + error.message);
                } finally{
                    this.setState({isLoading: false});
                }
            }             
    }    
    
    checkCode = () => {
        if(this.state.code === null || this.state.code === '') {
            this.setState({errorCode: 'Code is required'});
        }
        else {
            //Check if code is correct
            if(this.state.code !== this.state.checkCode) {
                this.setState({errorCode: 'Invalid code'});
            }
            else{
                this.setState({sended: false});
                this.setState({verified: true});
            }

        }
    }
render() {
    return (
        <GradienLayout innerStyle={this.state.verified ? {height: scale(500)}: {} }>
            <BackButton onPress={()=>this.props.navigation.goBack()}/>
            <Text style={[styles.text_center, {color: COLORS.orange, marginBottom: 20}]}>Forgot Password</Text>
            <Image source={require('../../assets/images/forgot-password.png')} style={[styles.image, {height: scale(120), width: scale(120), marginVertical: 15}]}/>
            
            {/* Enter your email */}
            {!this.state.sended && !this.state.verified && 
            <View>
                <InputText 
                    placeholder='Enter your email address'
                    label='Email'
                    iconName='mail'
                    error={this.state.errorMail}
                    onFocus={()=>this.setState({errorMail: null})}
                    onChangeText={(text)=>this.setState({email: text})}/>
                <Text style={{
                    marginHorizontal: 20,
                    marginVertical: 10,
                    alignSelf: 'center', 
                    textAlign: 'center', 
                    fontFamily: 'Coda-Regular'}}>We will send you an email to reset your password</Text>
                <CustomButton text={'Send'} style={{height: scale(35), width: scale(90)}}  onPress={()=>this.sendMail()}/>
            </View>}         
            
            {/* Varify code */}
            {this.state.sended && 
            <Text style={{marginHorizontal: 20, fontFamily: 'Coda-Regular'}}>Email: {this.state.email}</Text>}
            {this.state.sended && <InputText
                placeholder='Verify code'
                label='Verify Code'
                error={this.state.errorCode}
                onFocus={()=>this.setState({errorCode: null})}
                onChangeText={(text)=>this.setState({code: text})}
                iconName='key'/>}
            {this.state.sended && 
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                    onPress={()=>this.sendMail()}>
                    <Text style={{marginHorizontal: 20,
                    marginVertical: 10, 
                    fontFamily: 'Coda-Regular',
                    textDecorationLine: 'underline'
                }}>Resend Code?</Text>
                </TouchableOpacity>
            </View>}
            {this.state.sended && 
            <CustomButton text={'Submit'} onPress={()=>this.checkCode()} 
                style={{height: scale(35), width: scale(90)}}/>}

            {/* Reset password */}
            {this.state.verified && 
            <View>
            <ScrollView height={scale(200)}>
                <InputText
                    placeholder='Enter your new password'
                    label='New Password'
                    onChangeText={(text)=>this.setState({newPassword: text})}
                    error={this.state.errorPassword}
                    onFocus={()=>this.setState({errorPassword: null})}
                    password={true}
                    iconName='lock'/>
                <InputText
                    placeholder='Confirm your new password'
                    onChangeText={(text)=>this.setState({confirmPassword: text})}
                    label='Confirm Password'
                    error={'New '+this.state.errorPassword}
                    onFocus={()=>this.setState({errorPassword: null})}
                    password={true}
                    iconName='lock'/>
            </ScrollView>
                <CustomButton 
                    text={'Reset Password'} 
                    style={{height: scale(35), width: scale(140)}}
                    onPress={()=>this.handleResetPassword()}/>
                <Modal
                    transparent={true}
                    visible={this.state.showMessage}>
                <Notification
                    text={this.state.resultMessage}
                    iconName={'check-circle'}
                    iconColor={COLORS.green}
                    buttonColor={COLORS.skyBlue}
                    onPress={()=>{
                        this.setState({showMessage: false});
                        this.props.navigation.navigate('Login')
                    } }/>
                </Modal>
            </View>
            }
            <Spinner
                visible={this.state.isLoading}
                textContent={'Loading...'}
                textStyle={{color: '#FFF'}}
                />
        </GradienLayout>
    );}
}   

export default ForgotPassword;