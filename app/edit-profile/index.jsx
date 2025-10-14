import { Text, View, TouchableOpacity, Alert, Image, StyleSheet, Modal } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS } from "../../constants";
import { useEffect, useState, useRef } from "react";
import { Stack, router } from "expo-router";
import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import UploadImages from "../../utils/upload-images";
import { useSession } from "../../context/AuthContext";
import PatchData from "../../utils/patchdata";
import { Scale, VerticalScale, scale } from 'react-native-size-matters';
import avatarDefault from "@assets/images/avatarDefault.jpg";
import UploadModal from "../../components/register/UploadModal";
import UploadImage from "../../utils/uploadImage";

const EditAvatarProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { user, login } = useSession();
    const [imageUri, setImageUri] = useState("")
    const [certificationImages, setCertificationImages] = useState([
        ...user.imageCerti,
    ]);
    const [uploadVisible, setUploadedVisible] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([]);
    const updatedCertificationImages = useRef([]);

    const toogleUploadModal= ()=>{
        setUploadedVisible(!uploadVisible)
    }
    const handleChangeAvatar = async () => {
        setIsUpdating(true);
        const baseUrl = "https://se346-skillexchangebe.onrender.com";
        let avatar =""
        if (imageUri !== "") {
            const uploadImagesResponse = await UploadImage(
                `${baseUrl}/api/v1/upload/file`,
                imageUri
            );
            if (
                !uploadImagesResponse ||
                uploadImagesResponse === "Something went wrong"
            ) {
                alert("Something went wrong when uploading image");
                setIsUpdating(false);
                return;
            }else{
                avatar= uploadImagesResponse
            }
        }

        const data = await PatchData(`${baseUrl}/api/v1/user/update/${user.id}`, {
           avatar: avatar
        });
        if (!data || data === "404" || data === "Something went wrong") {
            alert("Something went wrong when updating user's certifications");
            setIsUpdating(false);
            return;
        }

        login({
            ...user,
            avatar: avatar,
        });
        Alert.alert("Successfully", "Update successfully", [
            {
                text: "OK",
                onPress: () => {
                    router.replace("/profile");
                },
            },
        ]);
        setIsUpdating(false);
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                backgroundColor: COLORS.white,
            }}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <Modal
                    transparent={true}
                    visible={uploadVisible}
                    onRequestClose={() => toogleUploadModal()}>
                    <UploadModal setImageUri={setImageUri} onRequestClose={() => toogleUploadModal()}></UploadModal>
                </Modal>
            <Spinner
                visible={isUpdating}
                textContent={"Updating..."}
                textStyle={{ color: "#FFF" }}
            />
            <LinearGradient
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                colors={["#FFBE98", "#7751C7"]}
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 30,
                        height: "auto",
                        width: "95%", //372/410,
                        paddingVertical: 25,
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <AntDesign
                            name="arrowleft"
                            size={16}
                            color={COLORS.orange}
                            style={{ marginRight: 5 }}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: "CodaRegular",
                                color: COLORS.orange,
                            }}
                        >
                            Back
                        </Text>
                    </TouchableOpacity>

                    {/* <Image
                        source={require('../../assets/images/teamwork.png')}
                        style={styles.image}
                    /> */}

                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.orange,
                            borderRadius: 27,
                            alignSelf: "center",
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                        onPress={toogleUploadModal}
                    >

                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                color: COLORS.white,
                            }}
                        >
                            Upload new avatar
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 4,
                            backgroundColor: COLORS.purple,
                            borderRadius: 50,
                            width: 120,
                            alignSelf: "center",
                            margin: 15,
                        }}
                    />
                    {
                        imageUri==="" ? 
                    (
                        <View style={styles.imgContainer}>
                            <Image source={user.avatar === "" ?  avatarDefault:{ uri: user.avatar }} style={styles.avatarImage} />
                        </View>
                    ) : (
                        <View style={styles.imgContainer}>
                            <Image source={{ uri: imageUri }} style={styles.avatarImage} />
                        </View>
                    )
                    }
                    

                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.orange,
                            borderRadius: 27,
                            alignSelf: "flex-end",
                            paddingHorizontal: 20,
                            paddingVertical: 7,
                            marginTop: 16,
                        }}
                        onPress={handleChangeAvatar}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                color: COLORS.white,
                            }}
                        >
                            Update
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    avatarImage: {
        width: 120,
        height: 120,
        marginTop: 20,
        marginLeft: 100,
        borderRadius: 60,
        resizeMode: "cover",
        overflow: "hidden",
    },
    image: {
        width: 130,
        height: 130,
        marginTop: 20,
        marginLeft: 100,
        marginBottom: 20,
    },
});

export default EditAvatarProfile;