import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { COLORS } from '@constants';
import Background from '@assets/icons/Background.png';
import EditProfile from '@assets/icons/Edit profile.png';
import { useEffect, useState } from 'react';
import { Stack, router, useNavigation } from 'expo-router';
import { useSession } from '../../context/AuthContext';
import avatarDefault from '@assets/images/avatarDefault.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSocketContext } from '../../context/SocketContext';
import axios from 'axios';

const Profile = () => {
    const { user, logout } = useSession();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigation = useNavigation();
    const { socket } = useSocketContext();
    const baseUrl = 'https://se346-skillexchangebe.onrender.com/api/v1';
    useEffect(() => {
        if (user) {
            // User data loaded
        }
    }, [user]);

    function convertDate(isoDate) {
        const date = new Date(isoDate);
        const formattedDate = date.toLocaleDateString('en-GB');
        return formattedDate;
    }

    if (!user) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.darkGrayProfile,
                }}
            >
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    const handleYourSkillsPress = () => {
        router.push('/change-your-skills');
    };

    const handleNewSkillsPress = () => {
        router.navigate('/change-new-skills');
    };

    const handleCertificationsPress = () => {
        router.navigate('/change-certifications');
    };

    const handleSkillDescription = () => {
        router.navigate('/change-skill-description');
    };

    const handleAboutYou = () => {
        router.navigate('/change-about-you');
    };

    const handleEditProfilePress = () => {
        router.navigate('/edit-profile');
    };

    const handleChangeInformationPress = () => {
        router.navigate({
            pathname: '/change-information',
            params: {
                name: user.username,
                mail: user.email,
                number: user.phoneNumber,
            },
        });
    };

    const handleOpenModal = () => {
        setShowLogoutModal(true);
    };

    const handleCloseModal = () => {
        setShowLogoutModal(false);
    };

    const logoutApi = async () => {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        try {
            const response = await axios.post(
                `${baseUrl}/user/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                }
            );
        } catch (e) {
            // Handle logout error silently
        }
    };
    const handleLogout = async () => {
        logoutApi();
        await AsyncStorage.clear();
        navigation.navigate('EnterName');
        socket.disconnect();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Stack.Screen
                options={{
                    title: 'Profile',
                    headerShown: false,
                }}
            />

            <ImageBackground source={Background} style={styles.backgroundImage} resizeMode="cover">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Profile Header Section */}
                    <View style={styles.profileHeader}>
                        <Text style={styles.Header}>Personal</Text>

                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarWrapper}>
                                <Image
                                    source={
                                        user.avatar === '' ? avatarDefault : { uri: user.avatar }
                                    }
                                    style={styles.avatarImage}
                                />
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={handleEditProfilePress}
                                    activeOpacity={0.7}
                                >
                                    <Image source={EditProfile} style={styles.editIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.usernameText}>{user.username}</Text>
                    </View>

                    {/* Information Cards Container */}
                    <View style={styles.cardsContainer}>
                        {/* General Information Card */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>General Information</Text>
                                <TouchableOpacity
                                    onPress={handleChangeInformationPress}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.changeButton}>Edit</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Birthday</Text>
                                <Text style={styles.infoValue}>
                                    {user && convertDate(user.birthDay)}
                                </Text>
                            </View>

                            <View style={[styles.infoRow, styles.lastInfoRow]}>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text
                                    style={[styles.infoValue, styles.emailText]}
                                    numberOfLines={1}
                                >
                                    {user && user.email}
                                </Text>
                            </View>
                        </View>

                        {/* Skills Information Card */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>Skills Information</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.skillRow}
                                onPress={handleYourSkillsPress}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.skillLabel}>Your Skills</Text>
                                <Text style={styles.changeButton}>Change</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.skillRow}
                                onPress={handleNewSkillsPress}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.skillLabel}>New Skills</Text>
                                <Text style={styles.changeButton}>Change</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.skillRow}
                                onPress={handleCertificationsPress}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.skillLabel}>Certifications</Text>
                                <Text style={styles.changeButton}>Change</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.skillRow}
                                onPress={handleSkillDescription}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.skillLabel}>Skill Description</Text>
                                <Text style={styles.changeButton}>Change</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.skillRow, styles.lastSkillRow]}
                                onPress={handleAboutYou}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.skillLabel}>About You</Text>
                                <Text style={styles.changeButton}>Change</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Logout Button */}
                        <TouchableOpacity
                            style={styles.logoutButtonContainer}
                            onPress={handleOpenModal}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.logoutButtonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Logout Modal */}
                    <Modal
                        transparent={true}
                        visible={showLogoutModal}
                        onRequestClose={handleCloseModal}
                        animationType="fade"
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Log Out</Text>
                                <Text style={styles.modalText}>
                                    Are you sure you want to log out?
                                </Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.cancelModalButton]}
                                        onPress={handleCloseModal}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.cancelModalButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.confirmModalButton]}
                                        onPress={async () => {
                                            await handleLogout();
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.confirmModalButtonText}>Log Out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Header: {
        marginTop: '10%',
        textAlign: 'center',
        fontFamily: 'Inter-SemiBold',
        fontSize: 22,
        marginBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.darkGrayProfile,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },

    // Profile Header Styles
    profileHeader: {
        alignItems: 'center',
        paddingBottom: 30,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 32,
        letterSpacing: 0.5,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatarImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: '#ffffff',
        backgroundColor: '#f5f5f5',
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: -4,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    editIcon: {
        width: 24,
        height: 24,
    },
    usernameText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
        letterSpacing: 0.3,
    },

    // Cards Container
    cardsContainer: {
        paddingHorizontal: 20,
        gap: 16,
    },

    // Card Styles
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1a1a1a',
        letterSpacing: 0.2,
    },

    // Info Row Styles
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    lastInfoRow: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    infoLabel: {
        fontSize: 15,
        color: '#666666',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 15,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    emailText: {
        maxWidth: '60%',
    },

    // Skill Row Styles
    skillRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    lastSkillRow: {
        borderBottomWidth: 0,
        paddingBottom: 0,
    },
    skillLabel: {
        fontSize: 15,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    changeButton: {
        fontSize: 15,
        color: '#0386D0',
        fontWeight: '600',
    },

    // Logout Button
    logoutButtonContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ff3b30',
        letterSpacing: 0.3,
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 28,
        width: '100%',
        maxWidth: 340,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 28,
        lineHeight: 22,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelModalButton: {
        backgroundColor: '#f5f5f5',
    },
    cancelModalButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
    },
    confirmModalButton: {
        backgroundColor: '#ff3b30',
    },
    confirmModalButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});

export default Profile;
