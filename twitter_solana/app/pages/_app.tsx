import "../styles/globals.css";
import type { AppProps } from "next/app";
import SolWalletProvider from "../components/solWalletProvider";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <SolWalletProvider>
        <Component {...pageProps} />
      </SolWalletProvider>
    </>
  );
}

export default MyApp;
