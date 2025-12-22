import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { loadFonts, styles } from "./mainMess.style";

const CardMessage = (props) => {
    const OnOff = props.Status == "online" ? styles.Online : styles.Offline;
    const recentMessage = props.Recent || "Start a conversation...";

    return (
        <View style={styles.CardContainer}>
            <View style={styles.AvatarContainer}>
                <Image source={(props.Avatar == "" || !props.Avatar) ? require('assets/images/avatarDefault.jpg') : { uri: '' + props.Avatar }}
                    style={styles.Avatar} />
            </View>
            <View style={[styles.Status, OnOff]}></View>
            <View style={styles.MessageContainer}>
                <Text style={styles.Name} numberOfLines={1} ellipsizeMode="tail">{props.Name}</Text>
                <Text style={[styles.RecentMessage, !props.Recent && { fontStyle: 'italic', color: '#999', marginTop: 1 }]} numberOfLines={1}
                    ellipsizeMode="tail">{recentMessage}</Text>
            </View>
            <View style={styles.StatusContainer}>

            </View>
        </View>

    );
}
export default CardMessage;