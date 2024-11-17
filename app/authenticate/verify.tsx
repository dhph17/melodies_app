import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ToastAndroid } from 'react-native';
import back from '../../assets/images/back.png';
import { fetchApiData } from '@/app/api/appService';

interface OTPFormProps {
    setIsOTP: (value: boolean) => void;
}

const OTPForm: React.FC<OTPFormProps> = ({ setIsOTP }) => {
    const router = useRouter()
    const otpInputs = useRef<(TextInput | null)[]>([]);
    const [otpValues, setOtpValues] = useState(Array(5).fill(''));
    const handleOTPInputChange = (index: number, value: string) => {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        if (value === '') {
            if (index > 0) {
                otpInputs.current[index - 1]?.focus();
            }
        } else {
            if (index < otpInputs.current.length - 1) {
                otpInputs.current[index + 1]?.focus();
            }
        }
    };
    const handleKeyPress = (index: number, event: any) => {
        if (event.nativeEvent.key === 'Backspace') {
            if (index > 0 && otpValues[index] === '') {
                otpInputs.current[index - 1]?.focus();
            }
        }
    };
    const handleSubmitOTP = async () => {
        try {
            const username = await AsyncStorage.getItem("username");
            const email = await AsyncStorage.getItem("email");
            const password = await AsyncStorage.getItem("password");

            const combinedValues = {
                otp: otpValues.join(''),
                username,
                email,
                password,
            };

            const result = await fetchApiData(
                "/api/user/register",
                "POST",
                JSON.stringify(combinedValues)
            );

            if (result.success) {
                console.log("Registration result:", result.data);
                await AsyncStorage.removeItem("username");
                await AsyncStorage.removeItem("email");
                await AsyncStorage.removeItem("password");
                ToastAndroid.show("Registration successful!", ToastAndroid.LONG);
                router.push('/authenticate/login')
            } else {
                ToastAndroid.show("Registration failed!", ToastAndroid.LONG);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            ToastAndroid.show("Something went wrong. Please try again.", ToastAndroid.LONG);
        }
    }

    return (
        <View style={styles.otpFormContainer}>
            <TouchableOpacity onPress={() => setIsOTP(false)} style={styles.backButton}>
                <Image source={back} style={styles.backImage} />
            </TouchableOpacity>
            <Text style={styles.otpHeaderText}>Verify OTP</Text>
            <Text style={styles.otpDescription}>An authentication code has been sent to your email.</Text>
            <View style={styles.otpInputContainer}>
                {[0, 1, 2, 3, 4].map((index) => (
                    <TextInput
                        key={index}
                        placeholder=""
                        style={styles.otpInput}
                        keyboardType="numeric"
                        maxLength={1}
                        value={otpValues[index]}
                        onChangeText={(value) => handleOTPInputChange(index, value)}
                        onKeyPress={(event) => handleKeyPress(index, event)}
                        ref={(ref) => (otpInputs.current[index] = ref)}
                    />
                ))}
            </View>
            <Text style={styles.otpValidity}>The OTP is valid for 1:59 minutes.</Text>

            <TouchableOpacity onPress={handleSubmitOTP} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('Resend OTP')} style={styles.resendButton}>
                <Text style={styles.resendButtonText}>Haven't got the email yet? Resend</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: 'center',
        width: '100%',
    },
    otpFormContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: 'center',
        width: '100%',
        top: 70,
    },
    otpHeaderText: {
        fontSize: 24,
        color: '#EE10B0',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    otpDescription: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    otpInput: {
        width: 50,
        height: 50,
        backgroundColor: '#444',
        borderRadius: 5,
        paddingVertical: 10,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        marginHorizontal: 5,
    },
    otpValidity: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        padding: 10,
        backgroundColor: '#EE10B0',
        borderRadius: 5,
    },
    backImage: {
        width: 20,
        height: 20,
    },
    headerText: {
        fontSize: 24,
        color: '#EE10B0',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#EE10B0',
        padding: 12,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginBottom: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    resendButton: {
        marginTop: 10,
    },
    resendButtonText: {
        color: '#EE10B0',
    },
});

export default OTPForm;