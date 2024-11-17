import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import back from '../../assets/images/back.png';

interface OTPFormProps {
    setIsOTP: (value: boolean) => void;
}

const OTPForm: React.FC<OTPFormProps> = ({ setIsOTP }) => {
    return (
        <View style={styles.formContainer}>
            <TouchableOpacity onPress={() => setIsOTP(false)} style={styles.backButton}>
                <Image source={back} style={styles.backImage} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Verify OTP</Text>
            <Text style={styles.description}>An authentication code has been sent to your email.</Text>
            <View style={styles.otpInputContainer}>
                {[0, 1, 2, 3, 4].map((index) => (
                    <TextInput key={index} style={styles.otpInput} maxLength={1} keyboardType="numeric" />
                ))}
            </View>
            <Text style={styles.otpValidity}>The OTP is valid for 1:59 minutes.</Text>
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resendButton}>
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
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    otpInput: {
        width: 50,
        height: 50,
        backgroundColor: '#444',
        borderRadius: 10,
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
    },
    otpValidity: {
        color: '#fff',
        marginBottom: 20,
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
