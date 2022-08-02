import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolTwitter } from "../target/types/sol_twitter";
import * as assert from "assert";

describe("sol_twitter", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.SolTwitter as Program<SolTwitter>;

  it("can send a new tweet", async () => {
    const tweetKeyPair = anchor.web3.Keypair.generate();

    await program.methods
      .sendTweet("GKV's Tweet", "My First Tweet")
      .accounts({
        myTweet: tweetKeyPair.publicKey,
        senderOfTweet: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([tweetKeyPair])
      .rpc();

    const tweetAccount = await program.account.tweetOnSolana.fetch(
      tweetKeyPair.publicKey
    );

    assert.equal(
      tweetAccount.author.toBase58(),
      program.provider.publicKey.toBase58()
    );
    assert.equal(tweetAccount.topic, "GKV's Tweet");
    assert.equal(tweetAccount.content, "My First Tweet");
    assert.ok(tweetAccount.timestamp);
  });

  it("can send a new tweet without a topic", async () => {
    const tweetKeyPair = anchor.web3.Keypair.generate();

    await program.methods
      .sendTweet("", "I will like this video")
      .accounts({
        myTweet: tweetKeyPair.publicKey,
        senderOfTweet: program.provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([tweetKeyPair])
      .rpc();

    const tweetAccount = await program.account.tweetOnSolana.fetch(
      tweetKeyPair.publicKey
    );

    assert.equal(
      tweetAccount.author.toBase58(),
      program.provider.publicKey.toBase58()
    );
    assert.equal(tweetAccount.topic, "");
    assert.equal(tweetAccount.content, "I will like this video");
    assert.ok(tweetAccount.timestamp);
  });

  it("can send a new tweet from a different user", async () => {
    const otherUser = anchor.web3.Keypair.generate();
    const tweetKeyPair = anchor.web3.Keypair.generate();

    // 1 solana = 1b lamports
    const signature = await program.provider.connection.requestAirdrop(
      otherUser.publicKey,
      1000000000
    );

    const latestBlockHash =
      await program.provider.connection.getLatestBlockhash();

    await program.provider.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: signature,
    });

    await program.methods
      .sendTweet("Like and Subscribe", "I will subscribe to IOTBL channel")
      .accounts({
        myTweet: tweetKeyPair.publicKey,
        senderOfTweet: otherUser.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([otherUser, tweetKeyPair])
      .rpc();

    const tweetAccount = await program.account.tweetOnSolana.fetch(
      tweetKeyPair.publicKey
    );

    assert.equal(
      tweetAccount.author.toBase58(),
      otherUser.publicKey.toBase58()
    );
    assert.equal(tweetAccount.topic, "Like and Subscribe");
    assert.equal(tweetAccount.content, "I will subscribe to IOTBL channel");
    assert.ok(tweetAccount.timestamp);
  });

  it("can send a new tweet with topic more than 50 chars", async () => {
    const topicTooLong = "I am loving it".repeat(51);
    try {
      const tweetKeyPair = anchor.web3.Keypair.generate();
      await program.methods
        .sendTweet(topicTooLong, "I will like this video")
        .accounts({
          myTweet: tweetKeyPair.publicKey,
          senderOfTweet: program.provider.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([tweetKeyPair])
        .rpc();
    } catch (error) {
      assert.ok("It failed, hence test passed");
      return;
    }

    assert.fail("The test should have failed because topic is too long");
  });

  it("can fetch all tweets", async () => {
    const tweetAccounts = await program.account.tweetOnSolana.all();
    console.log(tweetAccounts);
  });

  it("can filter tweets by author", async () => {
    const authorPublickey = program.provider.publicKey;
    const tweetAccounts = await program.account.tweetOnSolana.all([
      {
        memcmp: {
          offset: 8, // Discriminator,
          bytes: authorPublickey.toBase58(),
        },
      },
    ]);

    assert.equal(tweetAccounts.length, 2);
  });
});
