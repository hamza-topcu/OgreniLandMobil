import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function HomeScreen() {
    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const handlePurchase = (game) => {
        navigation.navigate("GameDetails", { game });
    };

    const handleAbout = () => {
        navigation.navigate("About");  // AboutScreen sayfasına yönlendirme
    };

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "games"));
                const gamesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setGames(gamesData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching games:", error);
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            })
            .catch(error => alert(error.message));
    };


    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={{ marginTop: 30 }}>Oyunlar Yükleniyor...</Text>
            </View>
        );
    }

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
                        <Image source={{ uri: item.logo }} style={styles.gameImage} />
                        <Text style={styles.gameName}>{item.name}</Text>
                        <Text style={styles.gameDetails}>{item.details}</Text>
                        <TouchableOpacity
                            style={styles.purchaseButton}
                            onPress={() => handlePurchase(item)}
                        >
                            <Text style={styles.purchaseButtonText}>Oyuna Git</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Hakkımızda butonu */}
            <TouchableOpacity onPress={handleAbout} style={styles.aboutButton}>
                <Text style={styles.aboutButtonText}>Hakkımızda</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    gameImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    gameDetails: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    container: {
        marginTop: 10,
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
        paddingTop: 80,
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
    // Yeni eklenen Hakkımızda butonunun stili
    aboutButton: {
        backgroundColor: '#0782F9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    aboutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
