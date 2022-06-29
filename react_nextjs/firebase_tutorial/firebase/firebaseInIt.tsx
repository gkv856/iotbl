import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGIN_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID,
    databaseURL: process.env.FB_DATABASE_URL,
};

const initMyFirebase = () => {
    if (!getApps().length) {
        // initialize firebase app with our configs.
        const app = initializeApp(firebaseConfig);

        // creating auth for authentication
        const auth = getAuth(app);

        if (typeof window !== "undefined") {
            if ("measurementId" in firebaseConfig) {
                const analytics = getAnalytics(app);
                const preformance = getPerformance(app);
            }
        }

        console.log("Initialized firebase");
    } else {
        console.log("Already Initialized firebase");
    }
};

export default initMyFirebase;
