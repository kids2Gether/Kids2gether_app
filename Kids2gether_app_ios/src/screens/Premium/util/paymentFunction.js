import axios from "axios";

const BASE_URL = "https://us-central1-kids2gether-4ca94.cloudfunctions.net";

export const pagar = async (paymentInfo, token_user, id_user) => {
  try {
    const options = {
      method: "POST",
      url: `${BASE_URL}/subscriptions`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_user}`,
        Accept: "application/json",
      },
      data: {
        user: id_user,
        plan: paymentInfo.plan || paymentInfo,
        card: paymentInfo.card || null,
      },
    };
    let payment_info = await axios.request(options);
    return payment_info;
  } catch (error) {
    throw error;
  }
};

export const addCard = async (cardData, token_user, id_user) => {
  try {
    const options = {
      method: "POST",
      url: `${BASE_URL}/payment/source`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_user}`,
        Accept: "application/json",
      },
      data: {
        user: id_user,
        card_number: cardData.card_number,
        card_holder_name: cardData.card_holder_name,
        card_expiration_date: cardData.card_expiration_date,
        card_cvv: cardData.card_cvv,
      },
    };
    let user_source = await axios.request(options);
    return user_source;
  } catch (error) {
    throw error;
  }
};

export const cancelSubscription = async (token_user, id_user) => {
  try {
    const options = {
      method: "POST",
      url: `${BASE_URL}/subscriptions/cancel`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token_user}`,
        Accept: "application/json",
      },
      data: {
        user: id_user,
      },
    };
    let response = await axios.request(options);
    return response;
  } catch (error) {
    throw error;
  }
};
