import useWalletHook from "../libs/useWalletHook";

const IndexPage = () => {
  // const { program } = useWalletHook();
  // console.log(program.programId.toBase58());

  // const fetchTweets = async () => {

  //   if (program) {
  //     const tweets = await program.account.tweetOnSolana.all();
  //     return tweets;
  //   }
  // };

  // fetchTweets()
  //   .then((t) => {
  //     console.log(t);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  const tweets = ["t1", "t2"];
  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-md-9 bg-primary bg-opacity-10 rounded mt-5">
          {tweets.map((tweet, idx) => {
            return (
              <p className="p-4" key={idx}>
                {tweet}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
