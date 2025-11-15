import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import { scale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';

const Policy = ({ onPress }) => {
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.header}>Terms of Service and</Text>
                <Text style={[styles.header, { marginBottom: 20 }]}>Privacy Policy</Text>
                <ScrollView
                    style={{ flexGrow: 1, marginBottom: 16 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.text}>
                        Welcome to Skill Exchange!{'\n\n'}
                        By accessing or using our service, you agree to be bound by these Terms of
                        Service. Please read these Terms carefully before using our Service.{'\n\n'}
                        <Text style={styles.subheader}>Use of the Service: </Text>
                        You agree to use the Service only for lawful purposes and in accordance with
                        these Terms.{'\n'}
                        <Text style={styles.subheader}>Intellectual Property: </Text>
                        The Service and its original content, features, and functionality are owned
                        by AppServiceUIT and are protected by international copyright, trademark,
                        patent, trade secret, and other intellectual property or proprietary rights
                        laws.{'\n'}
                        <Text style={styles.subheader}>User Accounts: </Text>
                        You may be required to create an account to access certain features of the
                        Service. You are responsible for maintaining the confidentiality of your
                        account and password and for restricting access to your computer or device.
                        {'\n'}
                        <Text style={styles.subheader}>Limitation of Liability: </Text>
                        In no event shall AppServiceUIT, nor its directors, employees, partners,
                        agents, suppliers, or affiliates, be liable for any indirect, incidental,
                        special, consequential, or punitive damages, including without limitation,
                        loss of profits, data, use, goodwill, or other intangible losses.{'\n'}
                        <Text style={styles.subheader}>Governing Law: </Text>
                        These Terms shall be governed and construed in accordance with the laws of
                        Viet Nam, without regard to its conflict of law provisions.{'\n'}
                        <Text style={styles.subheader}>Changes: </Text>
                        We reserve the right, at our sole discretion, to modify or replace these
                        Terms at any time. If a revision is material, we will provide at least 30
                        days' notice prior to any new terms taking effect.
                    </Text>
                </ScrollView>
                <BackButton style onPress={onPress}></BackButton>
            </View>
        </View>
    );
};
export default Policy;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 20,
    },
    modalView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
        width: scale(320),
        maxHeight: '75%',
    },
    header: {
        fontSize: scale(20),
        fontWeight: '700',
        fontFamily: 'Coda-Regular',
        textAlign: 'center',
        color: '#1A1A1A',
        letterSpacing: -0.3,
    },
    scrollView: {
        flexGrow: 1,
        width: '100%',
    },
    text: {
        fontSize: 15,
        textAlign: 'left',
        lineHeight: 24,
        color: '#333333',
        letterSpacing: 0.2,
    },
    subheader: {
        fontWeight: '700',
        color: '#1A1A1A',
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.3,
    },
});
