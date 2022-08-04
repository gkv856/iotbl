import { Program } from "@project-serum/anchor";
import bs58 from "bs58";

export const fetchTweets = async (program: Program, filters = []) => {
  const tweets = await program.account.tweetOnSolana.all(filters);
  return tweets;
};

export const authorFilter = (authorBase58PublicKey: String) => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
  },
});

export const topicFilter = (topic: String) => ({
  memcmp: {
    offset:
      8 + // Discriminator.
      32 + // Author public key.
      8 + // Timestamp.
      4, // Topic string prefix.
    bytes: bs58.encode(Buffer.from(topic)),
  },
});
