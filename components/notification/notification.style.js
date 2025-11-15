import { StyleSheet } from 'react-native';

import * as Font from 'expo-font';

// Định nghĩa các font chữ
export const loadFonts = async () => {
    await Font.loadAsync({
        'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    });
};

export const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    Header: {
        marginTop: '10%',
        textAlign: 'center',
        fontFamily: 'Inter-SemiBold',
        fontSize: 22,
    },
    Search: {
        height: 44,
        backgroundColor: '#F5F5F5',
        borderRadius: 24,
        paddingHorizontal: 4,
        marginTop: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '70%',
    },
    Choose: {
        backgroundColor: '#FFBE98',
        color: '#FFFFFF',
        borderRadius: 18,
    },
    Option: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        paddingVertical: 10,
        paddingHorizontal: 32,
        color: '#8E8E93',
        letterSpacing: 0.1,
        flex: 1,
        textAlign: 'center',
    },
    RequestContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        height: 'auto',
        flexDirection: 'row',
        width: '90%',
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 16,
        marginLeft: '5%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    AvatarContainer: {
        borderRadius: 26,
        width: 52,
        height: 52,
        overflow: 'hidden',
        backgroundColor: '#FFF5F0',
        borderWidth: 2,
        borderColor: '#FFE5D9',
    },
    Avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    ButtonContainer: {
        width: 130,
        height: 38,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFBE98',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#FFF9F5',
    },
    ButtonContainer2: {
        flex: 1,
        height: 38,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FAFAFA',
    },
    Button: {
        fontSize: 15,
        fontFamily: 'Inter-SemiBold',
        color: '#FFBE98',
        letterSpacing: 0.2,
    },
    ContentContainer: {
        marginLeft: 14,
        flex: 1,
        justifyContent: 'center',
    },
    Time: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        color: '#B0B0B0',
        marginBottom: 4,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '100%',
        marginBottom: 2,
    },
    Name: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        maxWidth: 140,
        color: '#1A1A1A',
    },
    Content: {
        fontFamily: 'Inter-Regular',
        fontSize: 15,
        color: '#666666',
        lineHeight: 20,
    },
    System: {
        marginTop: 4,
        fontFamily: 'Inter-SemiBold',
        fontSize: 15,
        color: '#333333',
        lineHeight: 21,
    },
    Scroll: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: 4,
    },

    navbar: {
        height: 90,
    },
    Horizon: {
        height: '100%',
        backgroundColor: '#FAFAFA',
    },
    Response: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 10,
    },
});
