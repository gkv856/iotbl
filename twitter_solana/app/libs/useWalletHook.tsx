import {
  useConnection,
  useWallet as adapterWallet,
} from "@solana/wallet-adapter-react";

export const useWallet = () => {
  const { connection } = useConnection();
  const adapterWalletObj = adapterWallet();

  return {
    connection,
    adapterWalletObj,
  };
};

export default useWallet;
