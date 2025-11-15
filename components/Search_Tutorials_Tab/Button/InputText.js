import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { forwardRef, useState } from 'react';
const InputText = ({ label, iconName, error, password, onFocus = () => {}, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(password);
    return (
        <View style={{ marginVertical: 5, marginHorizontal: 10, paddingHorizontal: 10 }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: error ? COLORS.red : isFocused ? '#4A90E2' : '#E0E0E0',
                        borderWidth: isFocused ? 2 : 1.5,
                    },
                ]}
            >
                <IconOutline
                    name="search"
                    size={scale(18)}
                    color={isFocused ? '#4A90E2' : '#999999'}
                    style={{ marginRight: 12 }}
                />
                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    ref={ref}
                    {...props}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                        props.onFocus && props.onFocus();
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        props.onBlur && props.onBlur();
                    }}
                    style={{ color: COLORS.black, flex: 1, fontSize: 15 }}
                    placeholderTextColor="#B0B0B0"
                />

                {password && (
                    <IconOutline
                        name={hidePassword ? 'eye-invisible' : 'eye'}
                        size={scale(16)}
                        color={COLORS.gray}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                )}
            </View>
            {error && <Text style={{ color: COLORS.red, fontSize: scale(10) }}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: scale(10),
        color: COLORS.grey,
        fontFamily: 'Coda-Regular',
    },
    inputContainer: {
        height: scale(50),
        backgroundColor: '#FAFAFA',
        flexDirection: 'row',
        paddingHorizontal: 18,
        borderWidth: 1.5,
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
});
export default forwardRef(InputText);
