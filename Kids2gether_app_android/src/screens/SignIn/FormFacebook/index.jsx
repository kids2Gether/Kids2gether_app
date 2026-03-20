import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from "react-native";

const FB_CLIENT_ID = "1344205309501238"

export default function FormFacebook() {
    // const [initializing, setInitializing] = useState(true);
    // const [user, setUser] = useState();
    
    // const onAuthStateChanged = (user) => {
    //     setUser(user);
    //     if (initializing) {
    //         setInitializing(false);
    //     }
    // }

    // useEffect(() => {
    //     const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber
    // }, []);

    const handleFacebookLogin = async () => {
        console.log('Efetuando login');
        // try {
        //     await LoginManager.logInWithPermissions(['public_profile', 'email']);
        //     const data = await AccessToken.getCurrentAccessToken();
        //     if (!data) {
        //         return;
        //     }
        //     const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
        //     const auth = getAuth();
        //     const response = await signInWithCredential(auth, facebookCredential);
        //     console.log(response);
        //     console.log('credential --->', facebookCredential);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    // const handleFacebookLogout = async () => {
    //     console.log('Efetuando Logout');
    //     try {
    //         await firebase.auth().signOut();
    //         setUser(null);
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     if (initializing) {
    //         return null;
    //     }
    // }

    return (
        <TouchableOpacity
            style={styles.actions_button}
            onPress={() => handleAuthFacebook()}
        >
            <Text style={styles.actions_text}>Entrar com o Facebook</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    actions_button: {
        backgroundColor: '#3b5998',
        padding: 15,
        marginTop: 25,
        width: '100%',
    },
    actions_text: {
        fontSize: 16,
        fontFamily: 'FredokaOne',
        textAlign: 'center',
        color: '#fff',
    },
});

