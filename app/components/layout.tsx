import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import NavBar from "./navbar";

const Layout = (props) => {
  return (
    <>
      <NavBar />

      {props.children}
    </>
  );
};

export default Layout;
