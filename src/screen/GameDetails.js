import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function GameDetails({ route }) {
    const { game } = route.params;
    const [loadingresim, setLoadingresim] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        const getPermission = async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getPermission();
    }, []);

    // Resmi indir ve galeriyi kaydet
    const handleImageDownload = async () => {
        if (!hasPermission) {
            Alert.alert('Hata', 'Galeriye erişim izni verilmedi.');
            return;
        }

        try {
            if (game.Image) {
                setLoadingresim(true);

                // Resmi indir
                const uri = await FileSystem.downloadAsync(game.Image, FileSystem.documentDirectory + game.name + '.jpg');

                // Resmi galeriye kaydet
                const asset = await MediaLibrary.createAssetAsync(uri.uri);
                await MediaLibrary.createAlbumAsync('Download', asset, false);

                setLoadingresim(false);
                Alert.alert('Başarılı', 'Resim galeriye kaydedildi!');
            } else {
                Alert.alert('Hata', 'İndirme linki bulunamadı.');
            }
        } catch (error) {
            setLoadingresim(false);
            Alert.alert('Hata', 'Resim indirilemedi.');
        }
    };

    // Oyunu indir
    const handleGameDownload = async () => {
        if (game.link) {
            setLoading(true);

            try {
                // Platforma göre linki aç
                await Linking.openURL(game.link);
                setLoading(false);
            } catch (error) {
                console.error('Oyun indirme hatası:', error);
                setLoading(false);
                Alert.alert('Hata', 'Oyun indirilemedi.');
            }
        } else {
            Alert.alert('Hata', 'İndirme linki bulunamadı.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: game.logo }} style={styles.gameImage} />
            <Text style={styles.gameName}>{game.name}</Text>
            <Text style={styles.gameDetails}>{game.details}</Text>

            {/* Resim İndirme Butonu */}
            <TouchableOpacity
                style={styles.downloadButtonImage}
                onPress={handleImageDownload}
                disabled={loadingresim}
            >
                <Image source={{ uri: game.Image }} style={styles.gameImage} />
                <Text style={styles.downloadButtonText}>
                    {loadingresim ? 'İndiriliyor...' : 'Resmi İndir'}
                </Text>
            </TouchableOpacity>

            <Text style={styles.downloadButtonTextBilgi}>
                Resmi indirip okutarak oyunu oynayabilirsiniz...
            </Text>

            {/* Oyun İndirme Butonu */}
            <TouchableOpacity
                style={styles.downloadButton}
                onPress={handleGameDownload}
                disabled={loading}
            >
                <Text style={styles.downloadButtonText}>
                    {loading ? 'İndiriliyor...' : 'Oyunu İndir'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    gameImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    gameName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    gameDetails: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    downloadButton: {
        backgroundColor: '#0782F9',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 30,
        marginBottom: 130,
    },
    downloadButtonImage: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    downloadButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    downloadButtonTextBilgi: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'light',
        fontSize: 10,
        fontStyle: 'italic',
    },
});
