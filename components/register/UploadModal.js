import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";

export default class UploadModal extends Component {
  state = {
    loading: false,
    imageUri: "",
  };

  uploadImage = async (mode) => {
    try {
      this.setState({ loading: true });
      let result = {};
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, 
          allowsEditing: true,
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          quality: 1,
        });
      }
      if (!result.canceled) {
        this.saveImage(result.assets[0].uri); // Adjusted to directly use result.uri based on expo-image-picker's usual response
      }
    } catch (e) {
      alert("Error uploading image: " + (e.message || "Unknown error)"));
      this.props.onRequestClose();
    } finally {
      this.setState({ loading: false });
    }
  };

  saveImage = async (image) => {
    try {
      this.setState({ imageUri: image });
      this.props.setImageUri(this.state.imageUri);
      this.props.onRequestClose();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { loading } = this.state.loading;
    return (
      <View style={[styles.centeredView, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
        <View style={styles.modalView}>
          <Text style={styles.header}>Upload</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={[styles.centeredView]}
              onPress={() => this.uploadImage("camera")}
            >
              <AntDesign name="camerao" size={40} color={COLORS.orange} />
              <Text style={styles.text}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.centeredView]}
              onPress={() => this.uploadImage("gallery")}
            >
              <AntDesign name="picture" size={40} color={COLORS.orange} />
              <Text style={styles.text}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && <ActivityIndicator size="large" color={COLORS.orange} />}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: scale(280),
    height: scale(120),
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Coda-Regular",
  },
  text: {
    fontSize: 12,
    fontFamily: "Coda-Regular",
  },
});
