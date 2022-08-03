import { AccountInfo, PublicKey } from "@solana/web3.js";
import dayjs from "dayjs";

export class TweetModel {
  publicKey: PublicKey;
  accountData: AccountInfo<Buffer>;
  //   author: String;

  //   timestamp: any;
  //   topic: String;
  //   content: String;

  //   DISCRIMINATOR_LENGTH = 8;
  //   PUBLIC_KEY_LENGTH = 32;
  //   PUBLIC_TIMESTAMP_LENGTH = 8;
  //   STRING_LENGTH_PREFIX = 4; // Stores the size of the string.
  //   MAX_TOPIC_LENGTH = 50 * 4; // 50 chars max.
  //   MAX_CONTENT_LENGTH = 280 * 4; // 280 chars max.

  constructor(publicKey: PublicKey, accountData: AccountInfo<Buffer>) {
    this.publicKey = publicKey;
    this.accountData = accountData;
  }

  get key() {
    return this.publicKey.toBase58();
  }

  get author_display() {
    const author = this.ac;
    console.log(author);

    return author.slice(0, 4) + ".." + author.slice(-4);
  }

  get created_at() {
    return dayjs.unix(this.timestamp).format("lll");
  }

  get created_ago() {
    return dayjs.unix(this.timestamp).diff(new Date());
  }
}
