import { getProvider, Program } from "@project-serum/anchor";
import {
  useConnection,
  useWallet as useAdapterWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import idl from "../../target/idl/sol_twitter.json";
import { TweetModel } from "./tweetModel";

const programID = new PublicKey(idl.metadata.address);
console.log("programID", programID.toBase58());

export const useWalletHook = async () => {
  const { connection } = useConnection();
  const adapterWalletObj = useAdapterWallet();
  const anchorWalletObj = useAnchorWallet();

  const program = await new Program(idl, programID, connection);
  const xx = await program.account.TweetOnSolana;

  console.log(xx);

  // // console.log("program =", program);

  // // const tweets = await program.account.tweetOnSolana.all();
  // // console.log(tweets);

  const tweets = await connection.getProgramAccounts(programID);

  tweets.forEach((tweet, idx) => {
    console.log(tweet.account.data.toString());
  });
  // connection.getProgramAccounttconsole.log("Res=", res[0].key, res[0].author_display);

  return {
    connection,
    adapterWalletObj,
    anchorWalletObj,
    program,
  };
};

export default useWalletHook;
