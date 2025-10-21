import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View, Dimensions } from 'react-native';
import { router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

const Category = (props) => {
    const handleOnPress = () => {
        router.push({
            pathname: "/result/[id]",
            params: {
              data: props.name,
            },
        });
    }

    return(
        <TouchableOpacity
        activeOpacity={0.8} onPress={handleOnPress}
        style={{ height: windowWidth * 0.45, width: windowWidth * 0.45, marginLeft: 5, marginBottom: 5, borderWidth: 0.5, borderColor: '#dddddd',  borderRadius: 20  }}>
            <View style = {{height:windowWidth * 0.45, width: windowWidth * 0.45, borderWidth: 0.5, borderColor: '#dddddd',  borderRadius: 20,  overflow: 'hidden' }}>
                <View style ={{flex: 2, }}>
                    <ImageBackground style = {[styles.backgroundImage, {borderRadius: 20, width: windowWidth * 0.45}]} source={{ uri: props.imageUri }} resizeMode="cover" onError={(error) => console.log(error)}>
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Text style ={styles.fixToImage} numberOfLines={2}>{props.name}</Text>
                    </LinearGradient>
                    </ImageBackground>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({ 
    fixToImage: {
    position: 'absolute',
      top: '40%', // Điều chỉnh theo yêu cầu
      textAlign: 'center',
      color: 'white', // Màu văn bản 
      fontSize: 15,
      fontWeight: 'bold',
    },
    backgroundImage: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }
});

export default Category; 