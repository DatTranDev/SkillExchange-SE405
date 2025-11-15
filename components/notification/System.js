import React from 'react';
import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import { loadFonts, styles } from './notification.style';
import { icons } from '@constants';
const System = (props) => {
    return (
        <View style={[styles.RequestContainer, { minHeight: 80 }]}>
            <View
                style={[
                    styles.AvatarContainer,
                    {
                        backgroundColor: '#FFF5ED',
                        borderColor: '#FFE5D9',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
            >
                <Image
                    source={icons.app}
                    style={[styles.Avatar, { width: 28, height: 28, resizeMode: 'contain' }]}
                />
            </View>
            <View style={styles.ContentContainer}>
                {/* thời gian */}
                <Text style={styles.Time}>{props.Time}</Text>
                {/* Tên+ thông báo */}
                <Text style={styles.System}>{props.Content}</Text>
            </View>
        </View>
    );
};
export default System;
