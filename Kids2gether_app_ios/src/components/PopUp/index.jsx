import React, { useContext } from 'react'
import { StyleSheet, Image, View, Text, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import icon_crown from '../../../assets/popup/crown.png';
import icon_star from '../../../assets/popup/star.png';
import icon_diamond from '../../../assets/popup/diamond.png';
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../contexts/AppContext';
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated';

const TextField = ({ children }) => {
    return (
        <Text style={styles.description}>{children}</Text>
    )
}

const MemberBenefits = ({ value }) => {
    return (
        <Animated.View 
        entering={BounceIn.delay(200).duration(1000)}
        style={styles.benefits_container}
        >
            <Icon name='check-decagram' color='#01d566' size={30} />
            <Text style={styles.benefits_text}>{value}</Text>
        </Animated.View>
    )
}

const CardPlan = ({ image, color, time, price, description }) => {

    return (
        <Animated.View
            style={[styles.card_container]}
            entering={BounceIn.delay(300).duration(1500)}
        >
            <View 
            style={[styles.card_container, { gap: 20 }]}>
                <View style={[styles.card_image_container, { backgroundColor: color }]}>
                    <Image style={styles.image_icon} source={image} />
                </View>
                <View>
                    <Text style={{ fontFamily: "Roboto_bold", fontSize: 18 }}>{time}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
            <Text style={{ marginRight: 10, color: '#FDB72E', fontFamily: "Roboto_bold", fontSize: 18, letterSpacing: -0.5 }}>{price}</Text>
        </Animated.View>
    )
}

export default function PopUp() {
    const { setPopUpController } = useContext(AppContext);
    const navigation = useNavigation();

    const onGetPremiumClicked = () => {
        navigation.navigate('profile-routes', { screen: 'get-premium' })
        setPopUpController(false);
    }

    return (
        <ScrollView>
            <Animated.View style={styles.pop_up_container}
                entering={FadeIn.delay(200)}
                exiting={FadeOut}
            >
                <View>
                    <Text style={styles.title}>Seja assinante Kids2gether</Text>
                    <Text style={styles.title}>e tenha benefícios exclusivos!</Text>
                    <View style={{ marginTop: 5 }}>
                        <TextField>Desfrute de vantagens exclusivas ao se</TextField>
                        <TextField>tornar um membro assinante. Junte-se</TextField>
                        <TextField>a nós e tenha acesso a uma variedade</TextField>
                        <TextField>de benefícios.</TextField>
                    </View>
                </View>
                <View style={{ gap: 10, marginBottom: 5 }}>
                    <MemberBenefits value="Conteúdos exclusivos" />
                    <MemberBenefits value="Descontos exclusivos" />
                    <MemberBenefits value="E muito mais !" />
                </View>
                <View>
                    <Text style={{ marginBottom: 10, fontFamily: "Roboto_bold", fontSize: 16 }}>Escolha seu plano de assinatura</Text>
                    <View style={{ gap: 20 }}>
                        <CardPlan target={12} color={"#e252ff"} image={icon_crown} time="12 meses" description="Valor total: R$ 98,90" price={"R$ 8,24/mês"} />
                        <CardPlan target={6} color={"#fed94c"} image={icon_diamond} time="6 meses" description="Valor total: R$ 49,90" price={"R$ 8,32/mês"} />
                        <CardPlan target={1} color={"#7f5aff"} image={icon_star} time="1 mês" description="Valor total: R$ 9,90" price={"R$ 9,90/mês"} />
                    </View>
                </View>
                <CustomButton value={"QUERO ASSINAR"} onPress={() => onGetPremiumClicked()} sx={{ marginTop: 10 }} />
            </Animated.View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pop_up_container: {
        gap: 20,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        fontFamily: "Roboto_bold"
    },
    description: {
        color: "#00000077",
        fontSize: 14
    },
    benefits_container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    benefits_text: {
        fontFamily: "Roboto_bold",
        color: "#000000",
        fontSize: 18,
    },
    card_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
    },
    card_image_container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        padding: 15
    },
    image_icon: {
        width: 35,
        height: 35,
        objectFit: 'contain'
    }
});