import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const handleSignOut = () => {
        auth.signOut()
            .then(() => navigation.navigate('Login'))
            .catch(error => alert(error.message));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                ❤️Yelda❤️
            </Text>
            <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Çıkış Yap</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    welcomeText: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '700',
    },
});
