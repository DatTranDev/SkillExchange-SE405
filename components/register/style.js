import { StyleSheet, Dimensions } from 'react-native';
import { Scale, VerticalScale, scale } from 'react-native-size-matters';
import { COLORS } from '../../constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    floating: {
        backgroundColor: '#fff',
        borderRadius: 30,
        height: scale(465),  //554/896
        width: scale(320), //372/410,
        paddingTop: 25
    },
    image: {
        height: windowHeight*147/896,
        width: 305,
        alignSelf: 'center'
    },
    text_center: {
        fontSize: 17,
        alignSelf: 'center',
        fontFamily: 'Coda-Regular'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',        
        borderRadius: 25,
        width: 80, height: 33,
        marginTop: 10,
        marginRight: 35 
    },
    buttonText: {
        fontSize: 14, 
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 0,
        fontFamily: 'Coda-Regular'
    },
    avatar: {
        height: scale(120),
        width: scale(120),
        borderRadius: 100,
        alignSelf: 'center',
        borderWidth: 0.3, 
        borderColor: COLORS.lightGray
    },
    bigInput: {
        padding: 10,
        alignSelf: 'center',
        textAlign: 'left',
        textAlignVertical: 'top',
        borderRadius: 15,
        borderColor: COLORS.gray,
        borderWidth: 0.5,
        width: scale(200),
        height: scale(140),
    },
    topicButton: {
        width: '44%', 
        height: scale(50),
        padding: 5, 
        borderWidth: 0.5, 
        borderColor: COLORS.orange,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    topicButtonSelected: {
        width: '44%', 
        padding: 5, 
        height: scale(50),
        borderWidth: 0.5, 
        borderColor: COLORS.orange,
        backgroundColor: COLORS.orange,
        borderRadius: 15,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topicText: {
        fontSize: scale(10),
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Coda-Regular',
        color: COLORS.orange,
        
    },
    topicTextSelected: {
        fontSize: scale(10),
        
        textAlign: 'center',
        fontFamily: 'Coda-Regular',
        color: COLORS.lightWhite
    },
    inputText: {
        padding: 10,
        fontSize: 12,
        marginTop: 5,
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.lightGray,
        width: '85%',
        height: scale(40)
    },
    infoText: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
        marginLeft: 30
    },
    termText: {
        alignSelf: 'center',
        fontSize: scale(9),
        marginTop: 5
    }
});

export default styles;