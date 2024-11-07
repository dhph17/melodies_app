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
  Platform,
} from 'react-native';

import bgImage from '../../assets/images/bg.png';
import logoImage from '../../assets/images/logo.png';
import facebook from '../../assets/images/facebook.png';
import google from '../../assets/images/google.png';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  const [isOTP, setIsOTP] = useState(false);
  const animatedPosition = useRef(new Animated.Value(0)).current;

  const toggleForm = () => {
    setIsAnimationComplete(false);
    setIsLogin(!isLogin);
    setIsOTP(false);

    Animated.timing(animatedPosition, {
      toValue: isLogin ? -330 : 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsAnimationComplete(true);
    });
  };

  const handleLogin = () => {
    setIsOTP(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              {isLogin && isAnimationComplete && !isOTP && (
                <View style={styles.formContainer}>
                  <Text style={styles.headerText}>Login To Continue</Text>
                  <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter Your Name or E-Mail" placeholderTextColor="#ccc" style={styles.input} />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput placeholder="Enter Your Password" placeholderTextColor="#ccc" style={styles.input} secureTextEntry />
                  </View>

                  <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                  </TouchableOpacity>

                  <View style={styles.forgotPasswordContainer}>
                    <TouchableOpacity>
                      <Text style={styles.forgotPasswordText}>Forgot password? {'>'}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                      <Image source={google} style={styles.icon} />
                      <Text style={styles.socialButtonText}>Google Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {isOTP && isAnimationComplete && (
                <View style={styles.otpFormContainer}>
                  <TouchableOpacity onPress={() => setIsOTP(false)} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back to login</Text>
                  </TouchableOpacity>
                  <Text style={styles.otpHeaderText}>Verify OTP</Text>
                  <Text style={styles.otpDescription}>An authentication code has been sent to your email.</Text>
                  <View style={styles.otpInputContainer}>
                    <TextInput placeholder="" style={styles.otpInput} keyboardType="numeric" maxLength={1} />
                    <TextInput placeholder="" style={styles.otpInput} keyboardType="numeric" maxLength={1} />
                    <TextInput placeholder="" style={styles.otpInput} keyboardType="numeric" maxLength={1} />
                    <TextInput placeholder="" style={styles.otpInput} keyboardType="numeric" maxLength={1} />
                    <TextInput placeholder="" style={styles.otpInput} keyboardType="numeric" maxLength={1} />
                  </View>
                  <Text style={styles.otpValidity}>The OTP is valid for 1:59 minutes.</Text>

                  <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => console.log('Resend OTP')} style={styles.resendButton}>
                    <Text style={styles.resendButtonText}>Haven't got the email yet? Resend</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>

            {!isLogin && isAnimationComplete && (
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

                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot password? {'>'}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.socialButtonsContainer}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image source={google} style={styles.icon} />
                    <Text style={styles.socialButtonText}>Google Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialButton}>
                    <Image source={facebook} style={styles.icon} />
                    <Text style={styles.socialButtonText}>Facebook Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  otpFormContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
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
    paddingHorizontal: 20, 
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
  signUpForm: {
    position: 'absolute',
    bottom: 100,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
    width: '100%',
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
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
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
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
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