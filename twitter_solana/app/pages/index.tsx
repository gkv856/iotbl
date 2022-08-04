import { useEffect, useState } from "react";
import TweetCard from "../components/tweetCard";
import useWalletHook from "../libs/useWalletHook";

const IndexPage = () => {
  const { program } = useWalletHook();
  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    program.account.tweetOnSolana.all().then((tweets: any) => {
      setAllTweets(tweets);
    });
  }, []);

  if (!allTweets.length) {
    return (
      <div className="container p-5 m-5 bg-warning bg-opacity-10">
        <h3>Loading please wait...</h3>
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

export default IndexPage;
