import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/native";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import HTML from "react-native-render-html";
import { styles } from "./styles";
import { ImageBackground } from "react-native";
import { Image } from "react-native";

import icon_praia from "../../../../components/TypeIcon/utils/imgs/icone_praia.png";
import icon_aventura from "../../../../components/TypeIcon/utils/imgs/icone_aventura.png";
import icon_urbano from "../../../../components/TypeIcon/utils/imgs/icone_urbano.png";
import icon_exotico from "../../../../components/TypeIcon/utils/imgs/icone_exotico.png";
import icon_neve from "../../../../components/TypeIcon/utils/imgs/icone_neve.png";
import icon_resort from "../../../../components/TypeIcon/utils/imgs/icone_resort.png";
import icon_parque from "../../../../components/TypeIcon/utils/imgs/icone_parque.png";
import icon_viagem from "../../../../components/TypeIcon/utils/imgs/icone_viagem.png";
import Header from "../../../../components/Header";
import { Alert } from "react-native";
import axios from "axios";
import { ICON_TYPES } from './../../../../components/TypeIcon/utils/iconTypes';
import { useSelector } from "react-redux";

export default function MapTrip() {
    const routes = useRoute();
    const route_data = routes.params;
    const navigation = useNavigation();
    const locals = useSelector((state) => state.locals);
    const [icon, setIcon] = useState(null);
    const [color, setColor] = useState("");
    const [title, setTitle] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        const getPost = async (id) => {
            const data_options = {
                method: 'GET',
                url: `https://www.kids2gether.com.br/wp-json/wp/v2/posts/${id}`,
                headers: { 'Content-Type': 'application/json' }
            };
            try {
                let response = await axios.request(data_options);
                if (!response.data.local || response.data.local.length === 0) {
                    if (response.data.type === 'offer') {
                        setTitle('CONTEÚDO PREMIUM')
                    } else {
                        setTitle('DICAS');
                    }
                } else {
                    let selected_local = locals.locals.filter((item) => item.id === response.data.local[0]);
                    setTitle(selected_local[0].name);
                }

                let selected_category = response.data.categories[0];
                setIcon(
                    selected_category === 2
                        ? icon_praia
                        : selected_category === 3
                            ? icon_neve
                            : selected_category === 4
                                ? icon_urbano
                                : selected_category === 5
                                    ? icon_exotico
                                    : selected_category === 6
                                        ? icon_resort
                                        : selected_category === 7
                                            ? icon_parque
                                            : selected_category === 8
                                                ? icon_aventura
                                                : selected_category === 116
                                                    ? icon_viagem
                                                    : null
                );
                let getColor = ICON_TYPES.filter((item) => item.id === selected_category)[0].color;
                setColor(getColor);
                setData(response.data);
            } catch (error) {
                Alert.alert('', 'Algo inesperado aconteceu.');
                navigation.dispatch(CommonActions.goBack())
            }
        }

        getPost(route_data);
    }, [route_data]);

    return (
        <>
            <ScrollView style={[styles.view_container]}>
                {data && (
                    <>
                        <View style={{ borderBottomWidth: 8, borderBottomColor: color ? color : null }}>
                            <View style={[styles.background_overlay, { backgroundColor: color ? color : null }]}></View>
                            <View style={[styles.header_content]}>
                                <Header
                                    icon={true}
                                    title={title.toUpperCase()}
                                    color={"#fff"}
                                    onBack={() => navigation.dispatch(CommonActions.goBack())}
                                />
                            </View>
                            <ImageBackground
                                source={{
                                    uri: data.yoast_head_json.og_image[0].url,
                                }}
                                style={styles.image}
                            ></ImageBackground>
                            <View style={styles.align_content}>
                                <Text></Text>
                                <Text style={styles.title}>
                                    {data.title.rendered}
                                </Text>
                                <View>
                                    {icon && (<Image source={icon} style={styles.iconPaseio} />)}
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 15 }}>
                            <HTML
                                source={{ html: data.content.rendered }}
                                contentWidth={380}
                            />
                        </View>
                        <View></View>
                    </>
                )}
            </ScrollView>
        </>
    );
}
