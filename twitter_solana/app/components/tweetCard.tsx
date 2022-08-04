import Link from "next/link";

const TweetCard = (props) => {
  const tweet = props.tweet;
  const tweetPbKey = tweet.publicKey.toBase58();
  const author = tweet.account.author;
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
              <h6 className="card-subtitle mb-2 text-muted">{tweetPbKey}</h6>
              <p className="card-text">{content}</p>
              <Link href={href}>
                <a target="_blank" className="card-link">
                  View on Solana Explorer
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetCard;
