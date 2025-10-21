import { COLORS } from '../../constants'
import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Dimensions } from 'react-native';
import { registerRootComponent } from 'expo';
import { Scale, VerticalScale, scale } from 'react-native-size-matters';
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import UploadModal from './UploadModal';
import * as Font from 'expo-font';
import customFonts from '../useFonts'
import styles from './style';
import CustomButton from './Button/CustomButton';
import GradienLayout from './TemplateLayout/GradientLayout';
import BackButton from './Button/BackButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


class UploadPhoto extends React.Component {
    state = {
        fontsLoaded: false,
        image: '',
        uploadVisible: false
    }
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    setImageUri = (uri) => {
        this.setState({ image: uri });
    };
    toogleUploadModal = () => {
        this.setState({ uploadVisible: !this.state.uploadVisible });
    }
    componentDidMount() {
        this._loadFontsAsync();
    }
    render() {
        if (!this.state.fontsLoaded) {
            return null;
        }
        const params = {
            name: this.props.route.params.name,
            image: this.state.image
        }
        return (
            <GradienLayout>
                <Modal
                    transparent={true}
                    visible={this.state.uploadVisible}
                    onRequestClose={() => this.toogleUploadModal()}>
                    <UploadModal setImageUri={this.setImageUri} onRequestClose={() => this.toogleUploadModal()}></UploadModal>
                </Modal>
                <BackButton onPress={() => this.props.navigation.goBack()}></BackButton>
                <Image
                    source={require('../../assets/images/teamwork.png')}
                    style={styles.image}
                />
                <Text style={styles.text_center}>UPLOAD your photo</Text>
                <Text style={styles.text_center}>Let people know who you are</Text>
                <View
                    style={{
                        height: 4,
                        backgroundColor: COLORS.purple,
                        borderRadius: 50,
                        width: 120,
                        alignSelf: 'center',
                        margin: 15 }}></View>
                <View style={{ width: scale(125), alignSelf: 'center' }}>
                    <Image source={this.state.image == '' ? require('../../assets/images/emptyAvatar.jpg') :
                        { uri: this.state.image }} style={styles.avatar}>
                    </Image>
                    <TouchableOpacity
                        style={{ position: 'absolute', bottom: 0, right: 0 }}
                        onPress={() => this.toogleUploadModal()}>
                        <AntDesign name="camerao" size={25} color={COLORS.orange}
                            style={{ backgroundColor: COLORS.lightWhite, borderRadius: 50, padding: 5 }} />
                    </TouchableOpacity>
                </View>
                <CustomButton style={{ marginTop: 30 }} text={'Next'} onPress={() => {
                    if (this.state.image == '') {
                        alert('Please upload your photo')
                        return
                    }
                    this.props.navigation.navigate('About', params)
                }} />
            </GradienLayout>
        )
    }
}
export default UploadPhoto;