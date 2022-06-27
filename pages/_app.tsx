import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect } from "react";
import initMyFirebase from "../firebase_tutorial/firebase/firebaseInIt";
import Layout from "../firebase_tutorial/components/layout";

function MyApp({ Component, pageProps }: AppProps) {
    initMyFirebase();
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
