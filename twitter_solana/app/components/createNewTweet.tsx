import { useRef } from "react";
import { sendTweet } from "../libs/sendTweet";
import useWalletHook from "../libs/useWalletHook";

const CreateNewTweet = (props: any) => {
  const { anchorWalletObj, adapterWalletObj, program } = useWalletHook();

  const loggedIn = props.loggedIn || false;

  const refTopic = useRef();
  const refContent = useRef();

  const handleNewTweet = async () => {
    const topic = refTopic.current.value;
    const content = refContent.current.value;

    console.log(topic, content);

    const newTweet = await sendTweet(
      topic,
      content,
      anchorWalletObj,
      adapterWalletObj,
      program
    );

    console.log(newTweet);
  };

  return (
    <>
      <div className="row d-flex justify-content-center my-3 ">
        <div className="col-md-7 border rounded p-3 bg-success bg-opacity-10">
          <div className="mb-3">
            <label htmlFor="tweetTopic" className="form-label">
              Tweet Topic?
            </label>
            <input
              type="text"
              placeholder="solana"
              className="form-control"
              ref={refTopic}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tweetContent" className="form-label">
              What's on your mind today?
            </label>
            <textarea
              className="form-control"
              id="tweetContent"
              rows={3}
              ref={refContent}
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-success"
            disabled={!loggedIn}
            onClick={handleNewTweet}
          >
            Tweet Now!!
          </button>
          {!loggedIn && (
            <span className="fw-bold text-danger">
              {" "}
              Connect a wallet to tweet!!
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateNewTweet;
