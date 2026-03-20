import { Linking } from "react-native";

export const useLink = (url) => {
    const navigate = url;
    Linking.openURL(navigate)
        .catch(err => console.error('Erro ao abrir o link: ', err));
};
