import { useEffect, useRef, useState } from "react";
import TweetCard from "../components/tweetCard";
import { authorFilter, fetchTweets } from "../libs/fetchTweets";
import useWalletHook from "../libs/useWalletHook";

const MyTweets = () => {
  const { program, connection, adapterWalletObj } = useWalletHook();
  const myPbKey = adapterWalletObj.publicKey?.toBase58();

  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    fetchTweets(program, [authorFilter(myPbKey)])
      .then((tweets: any) => {
        setAllTweets(tweets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!allTweets.length) {
    return (
      <div className="container p-5 m-5 bg-warning bg-opacity-10">
        <h3>
          you haven't tweets yet or unable to find tweets from author '{myPbKey}
          '
        </h3>
      </div>
    );
  }

  return (
    <>
      {allTweets.map((tweet, idx) => {
        return <TweetCard tweet={tweet} key={`tweet_${idx}`} />;
      })}
    </>
  );
};

export default MyTweets;
