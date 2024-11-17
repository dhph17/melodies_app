import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import google from '../../assets/images/google.png';
import { Image } from 'react-native';

interface SignUpFormProps {
    toggleForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ toggleForm }) => {
    return (
        <View style={styles.formContainer}>
            <Text style={styles.headerText}>Create An Account</Text>
            <TextInput placeholder="Enter Your Name" placeholderTextColor="#ccc" style={styles.input} />
            <TextInput placeholder="Enter Your E-Mail" placeholderTextColor="#ccc" style={styles.input} />
            <TextInput placeholder="Enter Your Password" placeholderTextColor="#ccc" style={styles.input} secureTextEntry />
            <TextInput placeholder="Confirm Your Password" placeholderTextColor="#ccc" style={styles.input} secureTextEntry />

            <TouchableOpacity onPress={() => console.log('Perform Sign Up Logic')} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={google} style={styles.icon} />
                    <Text style={styles.socialButtonText}>Google Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        top: 30,
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: 'center',
        width: '100%',
    },
    headerText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#444',
        borderRadius: 5,
        color: '#fff',
        width: '100%',
        padding: 10,
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#EE10B0',
        width: '100%',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    actionButton: {
        marginBottom: 10,
    },
    actionButtonText: {
        color: '#EE10B0',
        fontSize: 14,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
    },
    socialButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    socialButtonText: {
        color: '#fff',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
});

export default SignUpForm;
