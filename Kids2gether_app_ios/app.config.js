const dotenv = require("dotenv");

dotenv.config();

module.exports = ({ config }) => ({
  ...config,
  plugins: [...(config.plugins || []), "expo-font", "expo-router"],
  android: {
    ...(config.android || {}),
    package: "com.kids2gether.kids2gether",
    config: {
      ...((config.android && config.android.config) || {}),
      googleMaps: {
        apiKey:
          process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ||
          "AIzaSyCJ2IZN45-MpGFkDZX0oaxENQWCfqXW5AQ",
      },
    },
  },
  extra: {
    ...config.extra,
    googleMapsApiKey:
      process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ||
      "AIzaSyCJ2IZN45-MpGFkDZX0oaxENQWCfqXW5AQ",
    firebase: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    },
  },
});
