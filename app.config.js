// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "Tryke-Moto",
    slug: "tryke-moto",
    scheme: "tryke-moto",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.trykemoto.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      ENCRYPTION_SECRET_KEY: process.env.ENCRYPTION_SECRET_KEY,
    },
  }
};
