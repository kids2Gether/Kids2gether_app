import React, { useContext } from 'react'
import { Image, Text } from 'react-native'
import { View } from 'react-native'
import { styles } from './styles'
import pin_plan from '../../../../../assets/map/pin-plan.png'
import pin_trip from '../../../../../assets/map/pin-trip.png'
import { AppContext } from '../../../../contexts/AppContext'
import CustomButton from './../../../../components/CustomButton/index';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function MapInfo() {
    const { setMapController, setAuthRedirectIntent } = useContext(AppContext);
    const navigation = useNavigation();
    const user = useSelector((state) => state.user);

    const handleGoToAuth = () => {
        setMapController(false);
        setAuthRedirectIntent({ source: 'maps-info' });
        navigation.navigate('profile-routes', { screen: 'login' });
    };

    const handleContinueWithoutAccount = () => {
        setAuthRedirectIntent(null);
        setMapController(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header_content}>
                <Text style={styles.header_title}>KIDS2GETHER NO MUNDO!</Text>
            </View>
            <View style={styles.main_content}>
                <Text style={[styles.main_text]}>O mapa do Kids2Gether mostra os lugares mais interessantes que visitamos.</Text>
                <Text style={[styles.main_text, styles.borded_text]}>Você pode criar seus próprios "pins" no mapa.</Text>
                <View style={styles.pin_content}>
                    <Text style={[styles.main_text]}>Para marcar o local, mantenha o dedo pressionado na tela por alguns instantes e preencha os dados do destino.</Text>
                    <View style={styles.image_container}>
                        <Image style={styles.pin_image} source={pin_plan} />
                        <Image style={styles.pin_image} source={pin_trip} />
                    </View>
                </View>
                {user.user ? null : <Text style={[styles.main_text]}>Esta função só está disponível para usuários cadastrados no App.</Text>}
            </View>
            <View style={styles.footer_content}>
                {user.user ?
                    <CustomButton value={"OK"} sx={{ marginTop: 10 }} onPress={() => setMapController(false)} />
                    :
                    <>
                        <CustomButton value={"LOGAR ou CRIAR CONTA"} onPress={handleGoToAuth} />
                        <Text style={styles.actions_back_text} onPress={handleContinueWithoutAccount}>CONTINUAR SEM CONTA</Text>
                    </>
                }
            </View>
        </View>
    )
}
