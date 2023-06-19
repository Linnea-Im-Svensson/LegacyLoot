import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { firebaseAuth, firebaseDB } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const LoginScreen = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    phoneNr: '',
    password: '',
    password2: '',
  });

  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = firebaseAuth;

  const handleLogIn = async () => {
    if (loginForm.email !== '' && loginForm.password !== '') {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          loginForm.email,
          loginForm.password
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleRegister = async () => {
    const accountCollectionRef = collection(firebaseDB, 'accounts');
    if (
      loginForm.email !== '' &&
      loginForm.phoneNr !== '' &&
      loginForm.password !== '' &&
      loginForm.password2 !== ''
    ) {
      if (loginForm.password === loginForm.password2) {
        setLoading(true);
        try {
          const response = await createUserWithEmailAndPassword(
            auth,
            loginForm.email,
            loginForm.password
          );
          const uid = response.user.uid;

          const newAccount = await addDoc(accountCollectionRef, {
            uid,
            phoneNr: loginForm.phoneNr,
            savedItems: [],
          });

          console.log(response);
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        alert('password doesnt match');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={loginForm.email}
          onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
          style={styles.input}
          inputMode='email'
        />
        {register && (
          <TextInput
            placeholder='Phonenumber'
            value={loginForm.phoneNr}
            onChangeText={(text) =>
              setLoginForm({ ...loginForm, phoneNr: text })
            }
            style={styles.input}
            inputMode='numeric'
          />
        )}
        <TextInput
          placeholder='Password'
          value={loginForm.password}
          onChangeText={(text) =>
            setLoginForm({ ...loginForm, password: text })
          }
          style={styles.input}
          secureTextEntry
        />
        {register && (
          <TextInput
            placeholder='Re-enter password'
            value={loginForm.password2}
            onChangeText={(text) =>
              setLoginForm({ ...loginForm, password2: text })
            }
            style={styles.input}
            secureTextEntry
          />
        )}
      </View>
      {loading ? (
        <ActivityIndicator
          size='large'
          color='lightblue'
          style={styles.btnContainer}
        />
      ) : (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={register ? handleRegister : handleLogIn}
            style={[styles.btn, styles.btnFilled]}
          >
            <Text>{register ? 'Register' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.btnRegisterContainer}>
        <Text style={styles.registerText}>
          {register ? 'Already have an account? ' : 'Dont have an account? '}
        </Text>
        <TouchableOpacity onPress={() => setRegister(!register)}>
          <Text style={styles.registerBtn}>
            {register ? 'Login' : 'Click here'}{' '}
          </Text>
        </TouchableOpacity>
        {!register && <Text style={styles.registerText}>to register</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    gap: 10,
    marginBottom: 50,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  btnContainer: {
    width: '60%',
    gap: 10,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnFilled: {
    backgroundColor: 'lightblue',
  },
  btnRegisterContainer: {
    flexDirection: 'row',
  },
  registerBtn: {
    color: 'lightblue',
    textDecorationLine: 'underline',
  },
  registerText: {
    color: '#eee',
  },
  logo: {
    height: 200,
    width: 300,
    marginBottom: 50,
  },
});
