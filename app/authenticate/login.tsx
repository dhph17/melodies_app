import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import google from '../../assets/images/google.png';
import { Image } from 'react-native';
import { fetchApiData } from '@/app/api/appService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginFormProps {
  toggleForm: () => void;
  setIsOTP: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm, setIsOTP }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const payload = {
      username,
      password
    };

    try {
      const response = await fetchApiData('/api/auth/login', 'POST', JSON.stringify(payload), null, null, null);
      if (response.success) {
        console.log('Login successful', response.data);
        console.log('Success', 'Login successful');
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        await AsyncStorage.setItem('role', response.data.role);
      } else {
        Alert.alert('Errorrrr', response.error || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred, please try again later');
      console.error('Login error', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.headerText}>Login To Continue</Text>
      <TextInput
        placeholder="Enter Your Name or E-Mail"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Enter Your Password"
        placeholderTextColor="#ccc"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsOTP(true)} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Forgot password?</Text>
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
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
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

export default LoginForm;
