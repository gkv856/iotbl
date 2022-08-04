import { PublicKey } from "@solana/web3.js";
import Link from "next/link";
import dayjs from "dayjs";

const TweetCard = (props: any) => {
  const tweet = props.tweet;
  const tweetPbKey = tweet.publicKey.toBase58();
  const author: PublicKey = tweet.account.author;
  const timestamp = tweet.account.timestamp;
  const topic = tweet.account.topic;
  const content = tweet.account.content;
  const href = `https://explorer.solana.com/address/${tweetPbKey}?cluster=devnet`;
  return (
    <>
      <div className="row d-flex justify-content-center my-3">
        <div className="col-md-7 bg-info bg-opacity-10 rounded p-5">
          <div className="card w-100" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{topic || "Topic Missing"}</h5>

              <p className="card-text">{content}</p>
              <Link href={href}>
                <a target="_blank" className="card-link">
                  View on Solana Explorer
                </a>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted mt-4">
                <figure>
                  <blockquote className="blockquote">
                    <p className="small">Author: {author.toBase58()}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer mt-1">
                    <cite title="Source Title">
                      {dayjs.unix(timestamp).format("DD-MMM-YYYY HH:MM:ss")}
                    </cite>
                  </figcaption>
                </figure>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetCard;
