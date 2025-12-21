import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { icons } from '@constants';

const ReportModal = ({ visible, onClose, onSubmit, reportType = 'user' }) => {
    const [reason, setReason] = useState('');
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'We need permission to access your photos');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                quality: 0.8,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const uploadImage = async (imageUri) => {
            const access = await AsyncStorage.getItem('accessToken');
            const formData = new FormData();
            const extension = imageUri.split('.').pop();
            const type = mime.lookup(extension);
            const name = 'report-' + Date.now();
            formData.append('file', {
                name: `${name}`,
                type: type,
                uri: imageUri,
            });
            try {
                const response = await fetch(
                    'https://se405-skillexchangebe.onrender.com/api/v1/upload/file',
                    {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${access}`,
                        },
                    }
                );
                if (response.status == 200) {
                    const json = await response.json();
                    return json.image;
                } else {
                    if (response.status == 401) {
                        access = await loadToken();
                        const response2 = await fetch(
                            'https://se405-skillexchangebe.onrender.com/api/v1/upload/file',
                            {
                                method: 'POST',
                                body: formData,
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    Authorization: `Bearer ${access}`,
                                },
                            }
                        );
                        if (response2.status == 200) {
                            const json = await response2.json();
                            return json.image;
                        }
                    }
                }
                Alert.alert('Alert', 'Unable to send photo');
                return false;
            } catch (error) {
                Alert.alert('Alert', 'Unable to send photo');
                return false;
            } finally {
                setUploading(false);
            }
        };

    const handleSubmit = async () => {
        let imageUrl = null;
        if (image) {
            imageUrl = await uploadImage(image);
        }
        if (!reason.trim()) {
            Alert.alert('Error', 'Please provide a reason for reporting');
            return;
        }
        setIsSubmitting(true);
        try {
            const url= "https://se405-skillexchangebe.onrender.com/api/v1/report"
            handleClose();
        } catch (error) {
            Alert.alert('Error', 'Failed to submit report');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setReason('');
        setImage(null);
        setIsSubmitting(false);
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={handleClose}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                activeOpacity={1}
                onPress={handleClose}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 16,
                        width: '90%',
                        maxWidth: 400,
                        maxHeight: '80%',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Header */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                borderBottomWidth: 1,
                                borderBottomColor: '#F0F0F0',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: 'Inter-SemiBold',
                                    color: '#333333',
                                }}
                            >
                                Report {reportType === 'user' ? 'User' : 'Content'}
                            </Text>
                            <TouchableOpacity onPress={handleClose}>
                                <Text style={{ fontSize: 32, color: '#666666', lineHeight: 32 }}>×</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Content */}
                        <View style={{ padding: 20 }}>
                            {/* Reason Input */}
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'Inter-SemiBold',
                                    color: '#333333',
                                    marginBottom: 8,
                                }}
                            >
                                Reason for reporting
                            </Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#E0E0E0',
                                    borderRadius: 12,
                                    padding: 12,
                                    fontSize: 14,
                                    fontFamily: 'Inter-Regular',
                                    color: '#333333',
                                    minHeight: 100,
                                    textAlignVertical: 'top',
                                    backgroundColor: '#FAFAFA',
                                }}
                                placeholder="Describe the issue in detail..."
                                placeholderTextColor="#999999"
                                multiline
                                numberOfLines={4}
                                value={reason}
                                onChangeText={setReason}
                                maxLength={500}
                            />
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontFamily: 'Inter-Regular',
                                    color: '#999999',
                                    textAlign: 'right',
                                    marginTop: 4,
                                }}
                            >
                                {reason.length}/500
                            </Text>

                            {/* Image Upload */}
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'Inter-SemiBold',
                                    color: '#333333',
                                    marginTop: 20,
                                    marginBottom: 8,
                                }}
                            >
                                Evidence (Optional)
                            </Text>

                            {/* Image Preview */}
                            {image && (
                                <View
                                    style={{
                                        marginBottom: 12,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            height: 200,
                                            borderRadius: 12,
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}
                                    >
                                        <Image
                                            source={{ uri: image }}
                                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                        />
                                        <TouchableOpacity
                                            onPress={handleRemoveImage}
                                            style={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                borderRadius: 20,
                                                width: 32,
                                                height: 32,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text style={{ color: '#FFFFFF', fontSize: 20 }}>
                                                ×
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            {/* Upload Button */}
                            {!image && (
                                <TouchableOpacity
                                    onPress={handlePickImage}
                                    style={{
                                        borderWidth: 1.5,
                                        borderColor: '#FFBE98',
                                        borderRadius: 12,
                                        borderStyle: 'dashed',
                                        padding: 16,
                                        alignItems: 'center',
                                        backgroundColor: '#FFF9F5',
                                    }}
                                >
                                    <Image
                                        source={icons.image}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            tintColor: '#FFBE98',
                                            marginBottom: 8,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontFamily: 'Inter-SemiBold',
                                            color: '#FFBE98',
                                        }}
                                    >
                                        Upload Image
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'Inter-Regular',
                                            color: '#999999',
                                            marginTop: 4,
                                        }}
                                    >
                                        Optional
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Footer Buttons */}
                        <View
                            style={{
                                flexDirection: 'row',
                                padding: 20,
                                paddingTop: 0,
                                gap: 12,
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleClose}
                                disabled={isSubmitting}
                                style={{
                                    flex: 1,
                                    paddingVertical: 14,
                                    borderRadius: 12,
                                    backgroundColor: '#F5F5F5',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: 'Inter-SemiBold',
                                        color: '#666666',
                                    }}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={isSubmitting || !reason.trim()}
                                style={{
                                    flex: 1,
                                    paddingVertical: 14,
                                    borderRadius: 12,
                                    backgroundColor:
                                        isSubmitting || !reason.trim() ? '#CCCCCC' : '#FF3B30',
                                    alignItems: 'center',
                                }}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontFamily: 'Inter-SemiBold',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        Submit Report
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

export default ReportModal;
