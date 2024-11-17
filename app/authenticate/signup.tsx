import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import google from '../../assets/images/google.png';
import { Image } from 'react-native';
import { fetchApiData } from '@/app/api/appService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignUpFormProps {
    toggleForm: () => void;
    setIsOTP: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ toggleForm, setIsOTP }) => {
    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        setError('');
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const payload = {
            email,
            username: name,
            password,
            confirmPassword
        }

        const result = await fetchApiData(
            "/api/user/otp",
            "POST",
            JSON.stringify(payload)
        );

        if (result.success) {
            await AsyncStorage.setItem('email', payload.email);
            await AsyncStorage.setItem('username', payload.username);
            await AsyncStorage.setItem('password', payload.password);
            setIsOTP(true)
        } else {

        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.headerText}>Create An Account</Text>

            <TextInput
                placeholder="Enter Your Name"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="Enter Your E-Mail"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={email}
                onChangeText={(text) => { setEmail(text); setError('') }}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor="#ccc"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                placeholder="Confirm Your Password"
                placeholderTextColor="#ccc"
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            <View style={styles.errorContainer}>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <TouchableOpacity onPress={handleSignUp} style={styles.loginButton}>
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
    errorContainer: {
        height: 40,
        justifyContent: 'center',
        marginTop: -10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default SignUpForm;
