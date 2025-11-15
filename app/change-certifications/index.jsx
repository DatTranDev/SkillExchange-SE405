import { Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { COLORS } from '../../constants';
import { useState, useRef } from 'react';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UploadImages from '../../utils/upload-images';
import { useSession } from '../../context/AuthContext';
import PatchData from '../../utils/patchdata';

const ChangeCertifications = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { user, login } = useSession();

    const [certificationImages, setCertificationImages] = useState([...user.imageCerti]);

    const [uploadedImages, setUploadedImages] = useState([]);
    const updatedCertificationImages = useRef([]);

    const handleChangeCertifications = async () => {
        setIsUpdating(true);
        const baseUrl = 'https://se346-skillexchangebe.onrender.com';
        if (uploadedImages.length !== 0) {
            const uploadImagesResponse = await UploadImages(
                `${baseUrl}/api/v1/upload/files`,
                uploadedImages
            );
            if (!uploadImagesResponse || uploadImagesResponse === 'Something went wrong') {
                alert('Something went wrong when uploading images');
                setIsUpdating(false);
                return;
            }
            uploadImagesResponse.forEach((image) => {
                updatedCertificationImages.current.push(image.url);
            });
        }

        certificationImages.forEach((imageUri) => {
            if (imageUri.startsWith('http')) {
                updatedCertificationImages.current.push(imageUri);
            }
        });

        const data = await PatchData(`${baseUrl}/api/v1/user/update/${user.id}`, {
            imageCerti: updatedCertificationImages.current,
        });
        if (!data || data === '404' || data === 'Something went wrong') {
            alert("Something went wrong when updating user's certifications");
            setIsUpdating(false);
            return;
        }

        login({
            ...user,
            imageCerti: updatedCertificationImages.current,
        });
        Alert.alert('Successfully', 'Update successfully', [
            {
                text: 'OK',
                onPress: () => {
                    router.replace('/profile');
                },
            },
        ]);
        setIsUpdating(false);
    };

    const handleUploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsMultipleSelection: true,
        });
        if (!result.canceled) {
            result.assets.forEach((asset) => {
                setCertificationImages((prev) => [...prev, asset.uri]);
                setUploadedImages((prev) => [...prev, asset.uri]);
            });
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: COLORS.white,
            }}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <Spinner
                visible={isUpdating}
                textContent={'Updating...'}
                textStyle={{ color: '#FFF' }}
            />
            <LinearGradient
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                colors={['#FFBE98', '#7751C7']}
            >
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 30,
                        height: 'auto',
                        width: '95%', //372/410,
                        paddingVertical: 25,
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
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
                                fontFamily: 'CodaRegular',
                                color: COLORS.orange,
                            }}
                        >
                            Back
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.orange,
                            borderRadius: 27,
                            alignSelf: 'center',
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}
                        onPress={handleUploadImage}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 16,
                                color: COLORS.white,
                            }}
                        >
                            Upload image
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            height: 4,
                            backgroundColor: COLORS.purple,
                            borderRadius: 50,
                            width: 120,
                            alignSelf: 'center',
                            margin: 15,
                        }}
                    />

                    {certificationImages.length !== 0 ? (
                        <FlatList
                            style={{
                                width: '100%',
                                minHeight: 200,
                                maxHeight: 410,
                                overflow: 'scroll',
                            }}
                            data={certificationImages}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <ImageBackground
                                    source={{ uri: item }}
                                    style={{
                                        width: '100%',
                                        height: 200,
                                    }}
                                    borderRadius={10}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'rgba(0,0,0,0.3)',
                                            flex: 1,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                            }}
                                            onPress={() => {
                                                setCertificationImages((prev) =>
                                                    prev.filter((image) => image !== item)
                                                );
                                                setUploadedImages((prev) =>
                                                    prev.filter((image) => image !== item)
                                                );
                                            }}
                                        >
                                            <AntDesign
                                                name="closecircle"
                                                size={30}
                                                color={COLORS.white}
                                                style={{}}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            )}
                            numColumns={1}
                            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                        />
                    ) : (
                        <Text
                            style={{
                                fontSize: 15,
                                color: COLORS.lightOrange,
                                fontWeight: '500',
                                lineHeight: 23,
                                textAlign: 'center',
                            }}
                        >
                            No certification images yet. Click on the button above to upload one.
                        </Text>
                    )}

                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.orange,
                            borderRadius: 27,
                            alignSelf: 'flex-end',
                            paddingHorizontal: 20,
                            paddingVertical: 7,
                            marginTop: 16,
                        }}
                        onPress={handleChangeCertifications}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 16,
                                color: COLORS.white,
                            }}
                        >
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ChangeCertifications;
