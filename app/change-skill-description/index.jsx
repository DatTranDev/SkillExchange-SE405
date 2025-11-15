import {
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import styles from '../../components/register/style';
import { COLORS } from '../../constants';
import { scale } from 'react-native-size-matters';
import { useState } from 'react';
import { router } from 'expo-router';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useSession } from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import PatchData from '../../utils/patchdata';

export const handleChangeSkillDescription = async (user, skill) => {
    const baseUrl = 'https://se346-skillexchangebe.onrender.com';
    const data = await PatchData(`${baseUrl}/api/v1/user/update/${user.id}`, {
        skill: [skill],
    });
    if (!data || data === '404' || data === 'Something went wrong') {
        alert("Something went wrong when updating user's skill");
        return false;
    }
    alert('Update successfully');
    return true;
};

const ChangeSkillDescription = () => {
    const [skill, setSkill] = useState('');
    const { user, login } = useSession();
    const [isUpdating, setIsUpdating] = useState(false);

    const handle = async () => {
        setIsUpdating(true);
        const check = await handleChangeSkillDescription(user, skill);
        if (check) {
            router.replace('/profile');
            login({
                ...user,
                skill: [skill],
            });
        }
        setIsUpdating(false);
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <Stack.Screen
                    options={{
                        title: 'Change skill description',
                        headerShown: false,
                        headerTitle: '',
                    }}
                />
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
                            height: 'auto', //554/896
                            width: scale(320), //372/410,
                            padding: 20,
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
                        <Image
                            source={require('../../assets/images/skill.png')}
                            style={{
                                height: scale(122),
                                width: scale(210),
                                alignSelf: 'center',
                            }}
                        />
                        <Text style={[styles.text_center, { marginTop: 10 }]}>DESCRIPTION</Text>
                        <Text style={styles.text_center}>your skills</Text>
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
                        <TextInput
                            multiline={true}
                            placeholder={user.skill[0]}
                            style={styles.bigInput}
                            value={skill}
                            onChangeText={(text) => setSkill(text)}
                        />

                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.orange,
                                borderRadius: 27,
                                alignSelf: 'flex-end',
                                paddingHorizontal: 20,
                                paddingVertical: 7,
                                marginTop: 16,
                            }}
                            onPress={handle}
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
        </TouchableWithoutFeedback>
    );
};

export default ChangeSkillDescription;
