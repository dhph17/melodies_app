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
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

import bgImage from '../../assets/images/bg.png';
import logoImage from '../../assets/images/logo.png';
import LoginForm from '@/app/authenticate/login';
import SignUpForm from '@/app/authenticate/signup';
import OTPForm from '@/app/authenticate/verify';


const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  const [isOTP, setIsOTP] = useState(false);
  const animatedPosition = useRef(new Animated.Value(0)).current;
  const [otpValues, setOtpValues] = useState(Array(5).fill(''));
  const { height } = Dimensions.get('window');
  const otpInputs = useRef<(TextInput | null)[]>([]);

  const toggleForm = () => {
    setIsAnimationComplete(false);
    setIsLogin(!isLogin);
    setIsOTP(false);
  
    const offset = height * 0.47; // Adjust this multiplier as needed for responsiveness
  
    Animated.timing(animatedPosition, {
      toValue: isLogin ? -offset : 0, // Use dynamic offset based on screen height
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsAnimationComplete(true);
    });
  };

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

  const handleSignUp = () => {
    setIsOTP(true); // Show OTP form after signing up
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <ImageBackground source={bgImage} style={styles.background}>
            <View style={[styles.logoContainer, isLogin ? styles.logoTop : styles.logoInPanel]}>
              <Image source={logoImage} style={styles.logo} />
              <Text style={styles.title}>Melodies</Text>
            </View>
            <Animated.View style={[styles.panel, { transform: [{ translateY: animatedPosition }] }]}>
              {isLogin && !isOTP && isAnimationComplete && (
                <LoginForm toggleForm={toggleForm} setIsOTP={setIsOTP} />
              )}
            </Animated.View>

            {!isLogin && isAnimationComplete && !isOTP && (
              <SignUpForm toggleForm={toggleForm} />
            )}

            {isOTP && isAnimationComplete && (
              <OTPForm setIsOTP={setIsOTP} />
            )}


            <View style={styles.bottomContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>
                  {isLogin ? "Don't Have An Account?" : "Already have an account?"}
                </Text>
                <Text style={styles.subText}>
                  {isLogin ? "Sign Up Here" : "Login Here"}
                </Text>
              </View>
              <TouchableOpacity onPress={toggleForm} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>
                  {isLogin ? 'Sign Up' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 2,
  },
  logoTop: {
    position: 'absolute',
    top: 50,
  },
  logoInPanel: {
    position: 'absolute',
    top: 50,
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
    bottom: 250,
    backgroundColor: '#181818',
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
    width: '100%',
    top: 80,
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
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#EE10B0',
    width: '100%',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    backgroundColor: '#EE10B0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backImage: {
    width: 20,
    height: 20,
  },
  resendButton: {
    marginTop: 10,
  },
  resendButtonText: {
    color: '#EE10B0',
    fontSize: 14,
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
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#EE10B0',
    fontSize: 14,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    flexDirection: 'column',
  },
  mainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    color: '#ccc',
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;
