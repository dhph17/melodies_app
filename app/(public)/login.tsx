import React, { useRef, useState } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';

import bgImage from '../../assets/images/bg.png';
import logoImage from '../../assets/images/logo.png';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const animatedPosition = useRef(new Animated.Value(0)).current;

  const toggleForm = () => {
    setIsLogin(!isLogin);
    Animated.timing(animatedPosition, {
      toValue: isLogin ? -350 : 0, 
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.title}>Melodies</Text>
      </View>

      <Animated.View style={[styles.panel, { transform: [{ translateY: animatedPosition }] }]}>
        {isLogin && (
          <View style={styles.formContainer}>
            <Text style={styles.headerText}>Login To Continue</Text>
            
            <View style={styles.inputContainer}>
              <TextInput placeholder="Enter Your Name" placeholderTextColor="#ccc" style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Enter Your E-Mail" placeholderTextColor="#ccc" style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholder="Enter Your Password" placeholderTextColor="#ccc" style={styles.input} secureTextEntry />
            </View>

            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot password</Text>
            </TouchableOpacity>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Facebook Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>

      {/* Sign-Up Form (Remains visible when Login form slides up) */}
      {!isLogin && (
        <View style={styles.signUpForm}>
          <Text style={styles.headerText}>Create An Account</Text>
          
          <View style={styles.inputContainer}>
            <TextInput placeholder="Enter Your Name" placeholderTextColor="#ccc" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Enter Your E-Mail" placeholderTextColor="#ccc" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Enter Your Password" placeholderTextColor="#ccc" style={styles.input} secureTextEntry />
          </View>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Confirm Your Password" placeholderTextColor="#ccc" style={styles.input} secureTextEntry />
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toggle Button */}
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText}>
          {isLogin ? "Don't Have An Account?" : "Already have an account?"}
        </Text>
        <TouchableOpacity onPress={toggleForm}>
          <Text style={[styles.toggleButtonText, !isLogin && styles.signUpButtonText]}>
            {isLogin ? 'Sign Up' : 'Login Here'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#8a2be2',
    fontWeight: 'bold',
  },
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 200,
    backgroundColor: '#333',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 30, 
    alignItems: 'center',
  },
  signUpForm: {
    position: 'absolute',
    bottom: 200,
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
  inputContainer: {
    width: '100%',
    backgroundColor: '#444',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#ff00ff',
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
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontSize: 14,
  },
  toggleButtonText: {
    color: '#00f',
    fontSize: 16,
    marginTop: 8,
  },
  signUpButtonText: {
    color: '#ff00ff',
  },
});

export default LoginPage;
