import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import Animated, { SlideInDown } from 'react-native-reanimated';
import { AppContext } from '../../contexts/AppContext';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import PopUp from '../PopUp';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function OffCanvas({ children, variant }) {
    const { offCanvasController, setOffCanvasController, setPopUpController } = useContext(AppContext);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const show = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });
        const hide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });
        return () => {
            show.remove();
            hide.remove();
        };
    }, []);

    const handleClose = () => {
        setOffCanvasController(false);
    }

    if (variant == 'map') {
        return (
            <>
                {offCanvasController &&
                    <View
                        style={styles.offcanvas_container} >
                        <View style={styles.offcanvas_overlay} />
                        {children &&
                            <View style={[styles.offcanvas_content, { bottom: keyboardHeight }]}>
                                <Animated.View entering={SlideInDown} style={{ width: '100%' }}>
                                    <View style={styles.offcanvas_header}>
                                        <TouchableOpacity onPress={() => handleClose()}>
                                            <Text>Fechar</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.separator_line}></View>
                                    {children}
                                </Animated.View>
                            </View>
                        }
                    </View>
                }
            </>
        )
    } else if (variant == 'popup') {
        return (
            <>
                <View
                    style={[styles.offcanvas_container, { marginTop: 30 }]} >
                    <View style={styles.offcanvas_overlay} />
                    <View style={popup_styles.container}>
                        <Animated.View entering={SlideInDown} style={{ width: '100%' }}>
                            <View style={styles.offcanvas_header}>
                                <TouchableOpacity onPress={() => setPopUpController(false)}>
                                    <Icon name='close' color="#333" size={32} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator_line}></View>
                            <PopUp />
                        </Animated.View>
                    </View>
                </View>
            </>
        )
    }
}

export const popup_styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        padding: 10,
        position: 'absolute',
        zIndex: 502,
        bottom: 0,
    }
});
