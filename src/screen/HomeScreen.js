import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { games } from '../data/games';

export default function HomeScreen() {
    const navigation = useNavigation();

    const [user, setUser] = useState(null);

    const handlePurchase = (game) => {
        navigation.navigate("Payment", { game: { name: "Oyun Adı", price: 100 } });

    };

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
            <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                <Text style={styles.signOutButtonText}>Çıkış Yap</Text>
            </TouchableOpacity>
            <FlatList
                data={games}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.gameList}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.gameName}>{item.name}</Text>
                        <Text style={styles.gamePrice}>{item.price} TL</Text>
                        <TouchableOpacity
                            style={styles.purchaseButton}
                            onPress={() => handlePurchase(item)}
                        >
                            <Text style={styles.purchaseButtonText}>Satın Al</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    signOutButton: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundColor: '#ff4d4d',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 25,
        zIndex: 1,
    },
    signOutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    gameList: {
        paddingTop: 80, // To provide space for the sign-out button
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    gameName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    gamePrice: {
        fontSize: 16,
        color: 'green',
        marginVertical: 5,
    },
    purchaseButton: {
        backgroundColor: '#0782F9',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    purchaseButtonText: {
        color: 'white',
        fontWeight: '700',
    },
});
