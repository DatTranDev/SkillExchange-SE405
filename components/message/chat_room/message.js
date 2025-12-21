import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TouchableHighligh,
    TextInput,
    Modal,
    Alert,
} from 'react-native';
import { registerRootComponent } from 'expo';
import { icons } from '@constants';
import { Audio } from 'expo-av';
import { loadFonts, styles } from './mainRoom.style';
import { MessageContext } from './messageContext';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';

export const Message = (props) => {
    const { soundcheck, setSoundCheck } = useContext(MessageContext);
    const [sound, setSound] = useState(null);
    const [isPlay, setIsPlay] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [urlModal, setUrlModal] = useState();
    const [idCount, setIdCount] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [check, setCheck] = useState(false);
    const isFocused = useIsFocused();

    // Helper function to get border radius based on position
    const getBorderRadius = (position, isMyMessage) => {
        if (isMyMessage) {
            // My messages (right side) - adjust bottom-right corner
            switch (position) {
                case 'first':
                    return {
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 4,
                    };
                case 'middle':
                    return {
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                    };
                case 'last':
                    return {
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 4,
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                    };
                case 'single':
                default:
                    return {
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 4,
                    };
            }
        } else {
            // Other's messages (left side) - adjust bottom-left corner
            switch (position) {
                case 'first':
                    return {
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 18,
                    };
                case 'middle':
                    return {
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                    };
                case 'last':
                    return {
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 18,
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                    };
                case 'single':
                default:
                    return {
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 18,
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                    };
            }
        }
    };

    useEffect(() => {
        if (isPlay) {
            setIsPlay(false);
            setCheck(false);
        }
    }, [isFocused]);
    let contentType;
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const modalImage = () => {
        return (
            <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(217, 217, 217, 0.95)',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 'auto',
                            marginRight: '2%',
                            marginTop: '1%',
                        }}
                    >
                        <TouchableOpacity style={styles.closeButton} onPress={downloadImage}>
                            <Image
                                source={icons.download}
                                style={{
                                    width: 28,
                                    height: 28,
                                    marginLeft: 'auto',
                                    marginRight: 5,
                                    marginTop: '12%',
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Image
                                source={icons.close}
                                style={{ width: 35, height: 35, marginLeft: 'auto' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{ width: '90%', height: '90%', marginLeft: '5%', marginTop: '5%' }}
                    >
                        <Image
                            source={{ uri: props.Content }}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                </View>
            </Modal>
        );
    };

    // Delete message modal handlers
    const openDeleteModal = () => {
        setDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalVisible(false);
    };

    const handleDeleteMessage = async () => {
        if (props.OnDelete) {
            props.OnDelete();
        }
        closeDeleteModal();
    };

    const deleteMessageModal = () => {
        return (
            <Modal
                visible={deleteModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeDeleteModal}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    activeOpacity={1}
                    onPress={closeDeleteModal}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 16,
                            padding: 20,
                            width: '80%',
                            maxWidth: 320,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <View style={{
                            alignItems: 'center',
                            marginBottom: 16,
                        }}>
                            <View style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#FFE5E5',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 12,
                            }}>
                                <Image
                                    source={icons.delete_icon}
                                    style={{ width: 28, height: 28 }}
                                />
                            </View>
                            <Text style={{
                                fontSize: 18,
                                fontFamily: 'Inter-SemiBold',
                                color: '#333333',
                                marginBottom: 8,
                            }}>
                                Delete Message
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: 'Inter-Regular',
                                color: '#666666',
                                textAlign: 'center',
                            }}>
                                Are you sure you want to delete this message? This action cannot be undone.
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            gap: 12,
                        }}>
                            <TouchableOpacity
                                onPress={closeDeleteModal}
                                style={{
                                    flex: 1,
                                    paddingVertical: 12,
                                    borderRadius: 10,
                                    backgroundColor: '#F5F5F5',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    fontFamily: 'Inter-SemiBold',
                                    color: '#666666',
                                }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDeleteMessage}
                                style={{
                                    flex: 1,
                                    paddingVertical: 12,
                                    borderRadius: 10,
                                    backgroundColor: '#FF3B30',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    fontFamily: 'Inter-SemiBold',
                                    color: '#FFFFFF',
                                }}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        );
    };
    useEffect(() => {
        if (sound && isPlay) {
            clearInterval(idCount);
            setIdCount(null);
            setIsPlay(false);
            sound.stopAsync();
            setCheck(false);
        }
    }, [soundcheck]);

    useEffect(() => {
        if (seconds <= 0) {
            setCheck(false);
            setIsPlay(false);
            clearInterval(idCount);
            setIdCount(null);
            if (sound) {
                sound.stopAsync();
            }
        }
    }, [seconds]);
    useEffect(() => {
        if (props.style == 'record') {
            loadSound();
        }
    });
    const loadSound = async () => {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: props.Content });
        setSound(newSound);
    };

    const formatTimeRecord = (time) => {
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handlePressPlay = async () => {
        if (isPlay) {
            clearInterval(idCount);
            setIdCount(null);
            setIsPlay(false);
            if (sound) {
                setCheck(false);
                await sound.stopAsync();
            }
        } else {
            if (!check) {
                setCheck(true);
                clearInterval(idCount);
                setIdCount(null);
                // Create a new sound object and play it
                if (!sound) {
                    const { sound: newSound } = await Audio.Sound.createAsync({
                        uri: props.Content,
                    });
                    setSound(newSound);
                    setSoundCheck(newSound);
                    await newSound.playAsync();
                    const status = await newSound.getStatusAsync();
                    const time = status.durationMillis / 1000;
                    setSeconds(time);
                    setIsPlay(true);
                    if (idCount) {
                        clearInterval(idCount);
                    }
                    setIdCount(
                        setInterval(() => {
                            checksound(newSound, time);
                        }, 1000)
                    );
                } else {
                    setSoundCheck(sound);
                    await sound.playAsync();
                    const status = await sound.getStatusAsync();
                    const time = status.durationMillis / 1000;
                    setSeconds(time);
                    setIsPlay(true);
                    if (idCount) {
                        clearInterval(idCount);
                    }
                    setIdCount(
                        setInterval(() => {
                            checksound(sound, time);
                        }, 1000)
                    );
                }
            }
        }
    };
    const checksound = async (sound2, time) => {
        if (sound2) {
            const status2 = await sound2.getStatusAsync();
            const timeRemaining = time - status2.positionMillis / 1000;
            setSeconds(timeRemaining);
        }
    };

    const getFileName = (url) => {
        const parsedUrl = new URL(url);
        // Lấy phần query params từ URL
        const queryParams = parsedUrl.searchParams;
        // Lấy giá trị của tham số 'alt' từ query params
        const altParam = queryParams.get('alt');
        // Nếu giá trị của tham số 'alt' là 'media', tức là đường dẫn trỏ đến nội dung truyền thông
        if (altParam === 'media') {
            // Lấy phần path từ URL (bao gồm tên tệp)
            const filePath = parsedUrl.pathname;
            // Tách tên tệp từ phần path
            const fileName = filePath.split('/').pop();
            try {
                return decodeURIComponent(decodeURIComponent(fileName.replace('files%2F', '')));
            } catch (e) {
                return decodeURIComponent(fileName.replace('files%2F', ''));
            }
        }
    };
    const getFile = () => {
        props.Function(props.Content);
    };
    const getFileExtensionFromMimeType = (mimeType) => {
        switch (mimeType) {
            case 'image/jpeg':
                return 'jpg';
            case 'image/png':
                return 'png';
            case 'image/gif':
                return 'gif';
            default:
                return '';
        }
    };
    const downloadImage = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Unable to access media library');
            return;
        }
        imageUrl = props.Content;
        const currentTime = new Date();
        const timestamp = currentTime.getTime();
        const fileName = '' + timestamp;
        try {
            // Yêu cầu quyền truy cập thư viện phương tiện
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Unable to access media library');
                return;
            }

            // Tải xuống tệp tạm thời để lấy loại MIME
            const downloadResumable = FileSystem.createDownloadResumable(
                imageUrl,
                `${FileSystem.documentDirectory}${fileName}`
            );

            const { uri, headers } = await downloadResumable.downloadAsync();
            const mimeType = headers['content-type'];
            const extension = getFileExtensionFromMimeType(mimeType);

            if (!extension) {
                Alert.alert('Error', 'Unable to download image');
                return;
            }

            const finalUri = `${FileSystem.documentDirectory}${fileName}.${extension}`;
            await FileSystem.moveAsync({
                from: uri,
                to: finalUri,
            });

            // Lưu hình ảnh vào thư viện phương tiện
            const asset = await MediaLibrary.createAssetAsync(finalUri);
            await MediaLibrary.createAlbumAsync('Download', asset, false);
            Alert.alert('Download successful', 'Image saved to media library');
        } catch (error) {
            Alert.alert('Error', 'Unable to download image');
        }
    };

    //Self-messages
    if (props.User == 'My message') {
        const borderRadius = getBorderRadius(props.Position || 'single', true);
        switch (props.Type) {
            case 'text':
                contentType = <Text style={[styles.Message, borderRadius]}> {props.Content}</Text>;
                break;
            case 'image':
                contentType = (
                    <View style={{ marginTop: 3, marginRight: 5 }}>
                        <TouchableOpacity
                            style={{
                                width: 150,
                                height: 200,
                                overflow: 'hidden',
                                borderRadius: 15,
                                borderColor: '#FFBE98',
                                borderWidth: 1,
                            }}
                            onPress={openModal}
                            onLongPress={openDeleteModal}
                        >
                            <Image
                                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                source={{ uri: props.Content }}
                            />
                        </TouchableOpacity>
                    </View>
                );
                break;
            case 'record':
                contentType = (
                    <TouchableOpacity
                        onLongPress={openDeleteModal}
                        activeOpacity={0.9}
                    >
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                maxWidth: 200,
                                height: 45,
                                borderRadius: 18,
                                backgroundColor: '#FF9557',
                                marginTop: 5,
                                marginRight: 5,
                                flexDirection: 'row',
                                paddingHorizontal: 12,
                                paddingVertical: 7,
                            }}
                        >
                            <TouchableOpacity onPress={handlePressPlay}>
                                <Image
                                    source={isPlay ? icons.pause : icons.play}
                                    style={
                                        isPlay
                                            ? { width: 23, height: 23, resizeMode: 'cover' }
                                            : {
                                                width: 30,
                                                height: 30,
                                                resizeMode: 'cover',
                                                marginHorizontal: 5,
                                            }
                                    }
                                />
                            </TouchableOpacity>
                            {!isPlay ? (
                                ''
                            ) : (
                                <Text style={{ marginLeft: 2, fontSize: 16 }}>
                                    {' '}
                                    {formatTimeRecord(seconds)}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                );
                break;
            case 'file':
                const fileName = getFileName(props.Content);
                contentType = (
                    <TouchableOpacity
                        onPress={getFile}
                        onLongPress={openDeleteModal}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                backgroundColor: '#FF9557',
                                paddingVertical: 7,
                                marginTop: 5,
                                marginRight: 5,
                                paddingHorizontal: 10,
                            }}
                        >
                            <Image
                                source={icons.file}
                                style={{ width: 35, height: 35, resizeMode: 'cover' }}
                            />
                            <Text style={styles.TextFile} numberOfLines={1} ellipsizeMode="tail">
                                {fileName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
                break;
        }
        return (
            <View style={styles.Layout}>
                {modalImage()}
                {deleteMessageModal()}
                <View style={styles.MessContainer}>
                    <TouchableOpacity
                        onLongPress={openDeleteModal}
                        activeOpacity={0.7}
                    >
                        {contentType}
                    </TouchableOpacity>
                </View>
                {props.Time != '' ? <Text style={styles.Time}>{props.Time}</Text> : <View />}
            </View>
        );
    }
    //not Self-messages
    else {
        const borderRadius = getBorderRadius(props.Position || 'single', false);
        switch (props.Type) {
            case 'text':
                contentType = <Text style={[styles.Message2, borderRadius]}> {props.Content}</Text>;
                break;
            case 'image':
                contentType = (
                    <View style={{ marginTop: 3, marginLeft: 5 }}>
                        <TouchableOpacity
                            style={{
                                width: 150,
                                height: 200,
                                overflow: 'hidden',
                                borderRadius: 15,
                                borderColor: '#FF823A',
                                borderWidth: 1,
                            }}
                            onPress={openModal}
                        >
                            <Image
                                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                source={{ uri: props.Content }}
                            />
                        </TouchableOpacity>
                    </View>
                );
                break;
            case 'record':
                contentType = (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxWidth: 200,
                            height: 45,
                            borderRadius: 18,
                            backgroundColor: '#FF9557',
                            marginTop: 5,
                            marginRight: 5,
                            flexDirection: 'row',
                            paddingHorizontal: 12,
                            paddingVertical: 7,
                        }}
                    >
                        <TouchableOpacity onPress={handlePressPlay}>
                            <Image
                                source={isPlay ? icons.pause : icons.play}
                                style={
                                    isPlay
                                        ? { width: 23, height: 23, resizeMode: 'cover' }
                                        : {
                                            width: 30,
                                            height: 30,
                                            resizeMode: 'cover',
                                            marginHorizontal: 5,
                                        }
                                }
                            />
                        </TouchableOpacity>
                        {!isPlay ? (
                            ''
                        ) : (
                            <Text style={{ marginLeft: 2, fontSize: 16 }}>
                                {' '}
                                {formatTimeRecord(seconds)}
                            </Text>
                        )}
                    </View>
                );
                break;
            case 'file':
                const fileName = getFileName(props.Content);
                contentType = (
                    <TouchableOpacity onPress={getFile}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                backgroundColor: '#FF9557',
                                paddingVertical: 7,
                                marginTop: 5,
                                marginLeft: 5,
                                paddingHorizontal: 10,
                            }}
                        >
                            <Image
                                source={icons.file}
                                style={{ width: 35, height: 35, resizeMode: 'cover' }}
                            />
                            <Text style={styles.TextFile} numberOfLines={1} ellipsizeMode="tail">
                                {fileName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
                break;
        }
        return (
            <View style={styles.Layout2}>
                {modalImage()}
                <View style={styles.MessContainer}>
                    <View style={styles.AvatarContainer}>
                        <Image
                            source={
                                props.Avatar == 'no'
                                    ? icons.while_icon
                                    : props.Avatar == '' || !props.Avatar
                                        ? require('assets/images/avatarDefault.jpg')
                                        : { uri: props.Avatar }
                            }
                            style={styles.Avatar}
                        />
                    </View>
                    {contentType}
                </View>
                {props.Time != '' ? <Text style={styles.Time2}>{props.Time}</Text> : <View />}
            </View>
        );
    }
};
