import { useEffect, useRef, useState } from "react";
import TweetCard from "../components/tweetCard";
import { authorFilter, fetchTweets } from "../libs/fetchTweets";
import useWalletHook from "../libs/useWalletHook";

const IndexPage = () => {
  const { program } = useWalletHook();
  const [allTweets, setAllTweets] = useState([]);
  const [author, setAuthor] = useState("");
  const autherRef = useRef();

  useEffect(() => {
    fetchTweets(program).then((tweets: any) => {
      setAllTweets(tweets);
    });
  }, []);

  useEffect(() => {
    if (author !== "") {
      console.log("was in here", author);
      fetchTweets(program, [authorFilter(author)])
        .then((tweets: any) => {
          setAllTweets(tweets);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [author]);

  const handleAuthorFilter = () => {
    const af = autherRef.current.value;
    setAuthor(af);
  };

  if (!allTweets.length) {
    return (
      <div className="container p-5 m-5 bg-warning bg-opacity-10">
        <h3>Loading please wait...</h3>
      </div>
    );
  }

  return (
    <>
      <div className="row d-flex justify-content-center ">
        <div className="col-md-7 bg-warning  bg-opacity-10 p-3">
          <input
            type="text"
            className="form-control"
            placeholder="259wikzVEWyMeV1TyockW9SE7BbZSqunjaQs8Gwv9KA6"
            ref={autherRef}
          />
          <button className="btn btn-primary mt-3" onClick={handleAuthorFilter}>
            <i className="bi bi-funnel"> Filter</i>
          </button>
        </div>
      </div>

      {allTweets.map((tweet, idx) => {
        return <TweetCard tweet={tweet} key={`tweet_${idx}`} />;
      })}
    </>
  );
};

export default IndexPage;
