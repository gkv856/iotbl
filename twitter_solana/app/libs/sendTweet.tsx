import useWalletHook from "./useWalletHook";
import { Program, web3 } from "@project-serum/anchor";
import {
  useWallet as useAdapterWallet,
  WalletContextState,
  AnchorWallet,
} from "@solana/wallet-adapter-react";

export const sendTweet = async (
  topic: String,
  content: String,

  anchorWalletObj: AnchorWallet | undefined,
  adapterWalletObj: WalletContextState,
  program: Program
) => {
  //   const { anchorWalletObj, adapterWalletObj, program } = useWalletHook();

  // 2. Generate a new Keypair for our new tweet account.
  const tweet = web3.Keypair.generate();

  console.log("new tweet key", tweet.publicKey.toBase58());

  // 3. Send a "SendTweet" instruction with the right data and the right accounts.
  await program.methods
    .sendTweet(topic, content)
    .accounts({
      myTweet: tweet.publicKey,
      senderOfTweet: anchorWalletObj.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([tweet])
    .rpc();

  // 4. Fetch the newly created account from the blockchain.
  const newTweetAccount = await program.account.tweetOnSolana.fetch(
    tweet.publicKey
  );

  return newTweetAccount;
};
