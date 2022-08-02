const IndexPage = () => {
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
