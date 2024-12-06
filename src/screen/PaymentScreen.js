import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function PaymentScreen({ route, navigation }) {
    const { game } = route.params;
    const [isLoading, setIsLoading] = useState(false); // Ödeme işlemi sırasında yükleniyor durumu

    const handlePayment = async () => {
        setIsLoading(true);

        // Gerçek ödeme işlemine entegre edeceğiniz kısım burasıdır.
        // Burada ödeme sağlayıcı API'sine bağlanabilir ve ödeme doğrulamasını gerçekleştirebilirsiniz.

        try {
            // Simülasyon: Ödeme başarılı
            const isPaymentSuccessful = await fakePaymentProcessing(game.price);
            if (isPaymentSuccessful) {
                Alert.alert(`${game.name} başarıyla satın alındı!`);
                navigation.navigate('Home');
            } else {
                Alert.alert('Ödeme işlemi başarısız. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            Alert.alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    // Simüle edilmiş ödeme işlemi (Gerçek ödeme API'si burada kullanılmalı)
    const fakePaymentProcessing = (amount) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // 50% şansla ödeme başarılı
                resolve(Math.random() > 0.5);
            }, 2000); // 2 saniye bekleme simülasyonu
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ödeme Ekranı</Text>
            <Text style={styles.details}>Oyun: {game.name}</Text>
            <Text style={styles.details}>Fiyat: {game.price} TL</Text>

            <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Text style={styles.payButtonText}>Ödeme Yapılıyor...</Text>
                ) : (
                    <Text style={styles.payButtonText}>Ödemeyi Tamamla</Text>
                )}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    details: {
        fontSize: 18,
        marginBottom: 10,
    },
    payButton: {
        backgroundColor: '#0782F9',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    payButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '700',
    },
});
