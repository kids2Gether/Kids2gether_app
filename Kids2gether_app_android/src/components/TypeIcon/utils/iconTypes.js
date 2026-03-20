import praia_icon from "./imgs/icone_praia.png";
import neve_icon from "./imgs/icone_neve.png";
import urbano_icon from "./imgs/icone_urbano.png";
import exotico_icon from "./imgs/icone_exotico.png";
import resort_icon from "./imgs/icone_resort.png";
import parque_icon from "./imgs/icone_parque.png";
import aventura_icon from "./imgs/icone_aventura.png";
import viagem_icon from "./imgs/icone_viagem.png";

import nannies_icon from "./imgs/icone_nannies.png";
import bike_icon from "./imgs/icone_bike.png";
import makeup_icon from "./imgs/icone_makeup.png";
import hair_icon from "./imgs/icone_hair.png";
import conci_icon from "./imgs/icone_conci.png";
// import dicas_icon from "./imgs/icone_dicas.png";


export const ICON_TYPES = [
    {
        id: 2,
        name: "praia",
        icon: praia_icon,
        color: '#FDB72E'
    },
    {
        id: 3,
        name: "neve",
        icon: neve_icon,
        color: '#B9D4E1'
    },
    {
        id: 4,
        name: "urbano",
        icon: urbano_icon,
        color: '#C37CB3'
    },
    {
        id: 5,
        name: "exótico",
        icon: exotico_icon,
        color: '#EF955D'
    },
    {
        id: 6,
        name: "resort",
        icon: resort_icon,
        color: '#F9B5B3'
    },
    {
        id: 7,
        name: "parque",
        icon: parque_icon,
        color: '#F15C42'
    },
    {
        id: 8,
        name: "aventura",
        icon: aventura_icon,
        color: '#538CAE'
    },
    // {
    //     id: 9,
    //     name: "nossas-dicas",
    //     icon: dicas_icon,
    //     color: '#538CAE'
    // },
    {
        id: 116,
        name: "viagem virtual",
        icon: viagem_icon,
        color: '#80CAA7'
    },
];

export const MARKETPLACE_ICON = [
    {
        id: 135,
        name: "concierge",
        icon: conci_icon,
        color: '#F0955E'
    },
    {
        id: 130,
        name: "babá",
        icon: nannies_icon,
        color: '#B8D4E0'
    },
    {
        id: 139,
        name: "bike",
        icon: bike_icon,
        color: '#C37CB4'
    },
    {
        id: 134,
        name: "maquiagem",
        icon: makeup_icon,
        color: '#F9B5B4'
    },
    {
        id: 137,
        name: "cabeleireiro",
        icon: hair_icon,
        color: '#F25C43'
    },
];

export const getFooterColor = (check) => {
    let slug;
    switch (check) {
        case 'aventura':
            slug = '#538CAE';
            break;
        case 'exotico':
            slug = '#EF955D';
            break;
        case 'neve':
            slug = '#B9D4E1';
            break;
        case 'parque':
            slug = '#F15C42';
            break;
        case 'praia':
            slug = '#FDB72E';
            break;
        case 'resort':
            slug = '#F9B5B3';
            break;
        case 'urbano':
            slug = '#C37CB3';
            break;
        case 'viagem':
            slug = '#80CAA7';
            break;
        case 'maquiagem':
            slug = '#F9B5B4'
            break;   
        case 'bike':
            slug = 'C37CB4'
            break;
        case 'babas':
            slug = '#B8D4E0'
            break; 
        case 'cabeleireiro':
            slug = '#F25C43'
            break;
        case 'concierge':
            slug = '#F0955E'
            break;
        case 'ecoturismo':
            slug = '#7CB342'
            break;       
        default:
            slug = '#000'
            break;
    }
    return slug
};