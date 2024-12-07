import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';

export default function AboutScreen({ navigation }) {
    const handlePayment = () => {
        // Ödeme ekranına yönlendirme
        navigation.navigate('Payment');
    };

    const handleVisitWebsite = () => {
        // Web sitesini ziyaret etme
        Linking.openURL('https://www.ogreniland.website/');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../resim/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Hakkımızda</Text>
            <Text style={styles.content}>
                Bu oyun platformu, kullanıcılarının en iyi oyun deneyimini yaşaması için
                sürekli olarak gelişmektedir. En yeni oyunları, detaylı açıklamaları ve
                kullanıcı dostu arayüzüyle biz her zaman yanınızdayız.
            </Text>

            <View style={styles.section}>
                <Text style={styles.subTitle}>Web Sitemizi Ziyaret Edin:</Text>
                <View style={styles.linkContainer}>
                    <TouchableOpacity onPress={handleVisitWebsite}>
                        <Text style={styles.link}>https://www.ogreniland.website/</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subTitle}>Bağış Yapın:</Text>
                <Text style={styles.content}>
                    Oyunlarımız ücretsizdir size daha iyi hizmet etmemiz için bize bağış yapmak isterseniz, aşağıdaki butona tıklayarak ödeme ekranına geçebilirsiniz.
                </Text>
                <TouchableOpacity style={styles.donateButton} onPress={handlePayment}>
                    <Text style={styles.donateButtonText}>Bağış Yap</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0782F9',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0782F9',
        marginBottom: 20,
        textAlign: 'center',
    },
    content: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    linkContainer: {
        alignItems: 'center', // Bu, bağlantıyı yatayda ortalar
        justifyContent: 'center',
        marginVertical: 10, // Dikeyde biraz boşluk bırakır
    },
    link: {
        textAlign: 'center',
        color: '#0782F9',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 30,
        width: '100%',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    donateButton: {
        backgroundColor: '#0782F9',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 15,
        elevation: 5,
    },
    donateButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
