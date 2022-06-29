/** @type {import('next').NextConfig} */

const firebaseConfig = {
    FB_API_KEY: "AIzaSyCMVE-OSaAdsUfXlBVXOHAH3eqh0zquwSY",
    FB_AUTH_DOMAIN: "testappyt-aa8c0.firebaseapp.com",
    FB_PROJECT_ID: "testappyt-aa8c0",
    FB_STORAGE_BUCKET: "testappyt-aa8c0.appspot.com",
    FB_MESSAGIN_SENDER_ID: "398003895989",
    FB_APP_ID: "1:398003895989:web:8feda8d6691dd30f9fc8fc",
    FB_MEASUREMENT_ID: "G-D4TVF4NDJQ",
    FB_DATABSE_URL: "https://testappyt-aa8c0-default-rtdb.firebaseio.com/",
};
const nextConfig = (phase) => {
    const commonSettings = {
        images: {
            domains: ["lh3.googleusercontent.com"],
        },
        reactStrictMode: true,
    };

    return {
        ...commonSettings,
        env: {
            ...firebaseConfig,
        },
    };
};

module.exports = nextConfig;
