import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';

const firebaseConfig = {
    apiKey: "AIzaSyCyFbK6PDBpBPGm11dEdXKLNL_EmMUVBhg",
    authDomain: "arprojesi-7cc59.firebaseapp.com",
    projectId: "arprojesi-7cc59",
    storageBucket: "arprojesi-7cc59.firebasestorage.app",
    messagingSenderId: "336129837337",
    appId: "1:336129837337:web:b99ae27da5f2550e185d88",
    measurementId: "G-B3G2MP5FMD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginScreen() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        });
        return unsubscribe;
    }, []);


    const handleSignUp = () => {
        setErrorMessage('');
        createUserWithEmailAndPassword(auth, userName, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Kullanıcı kayıt oldu:', user.email);
                navigation.navigate('Home');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('Bu e-posta adresi zaten kullanımda.');
                } else if (error.code === 'auth/invalid-email') {
                    setErrorMessage('Geçersiz e-posta adresi.');
                } else if (error.code === 'auth/weak-password') {
                    setErrorMessage('Şifre çok zayıf. En az 6 karakter olmalıdır.');
                } else {
                    setErrorMessage(error.message);
                }
            });
    };

    const handleLogin = () => {
        setErrorMessage(''); // Hata mesajını sıfırla
        signInWithEmailAndPassword(auth, userName, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Kullanıcı giriş yaptı:', user.email);
                navigation.navigate('Home');
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    setErrorMessage('Hatalı şifre.');
                } else if (error.code === 'auth/user-not-found') {
                    setErrorMessage('Kullanıcı bulunamadı.');
                } else if (error.code === 'auth/invalid-email') {
                    setErrorMessage('Geçersiz e-posta adresi.');
                } else if (error.code === 'auth/invalid-credential') {
                    setErrorMessage('Yanlış kullanıcı adı veya şifre')
                } else {
                    setErrorMessage(error.message);
                }
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.headerText}>Giriş Yap</Text>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label="E-posta"
                    value={userName}
                    onChangeText={text => setUserName(text)}
                    mode="outlined"
                />
                <TextInput
                    style={styles.input}
                    label="Şifre"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                    mode="outlined"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.outlineButton]}>
                    <Text style={styles.outlineButtonText}>Kaydol</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#0782F9',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        backgroundColor: '#0782F9',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '700',
    },
    outlineButton: {
        backgroundColor: 'white',
        borderColor: '#0782F9',
        borderWidth: 1,
    },
    outlineButtonText: {
        color: '#0782F9',
        fontSize: 17,
        fontWeight: '700',
    },
});
