import React, { useContext } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { styles } from './styles'
import { UserContext } from '../../../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'

export default function PremiumInfo() {
    const navigation = useNavigation();
    const { setShowModal, setShowPremiumModal } = useContext(UserContext);

    const handleGoBack = () => {
        setShowModal(false);
        setShowPremiumModal(false);
        navigation.navigate('home');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header_content}>
                <Text style={styles.header_title}>CONTEÚDO PREMIUM</Text>
            </View>
            <View style={styles.main_content}>
                <Text style={[styles.main_text]}>Você precisa ser assinante para ter acesso a esse conteúdo do nosso aplicativo.</Text>
            </View>
            <View style={styles.footer_content}>
                <TouchableOpacity style={styles.actions_button} onPress={() => navigation.navigate('profile-routes', { screen: 'get-premium' })}>
                    <Text style={styles.actions_text}>ASSINAR</Text>
                </TouchableOpacity>
                <Text style={styles.actions_back_text} onPress={() => handleGoBack()}>CONTINUAR SEM ASSINAR</Text>
            </View>
        </View>
    )
}
