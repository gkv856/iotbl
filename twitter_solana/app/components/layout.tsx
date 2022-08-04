import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useWalletHook from "../libs/useWalletHook";
import CreateNewTweet from "./createNewTweet";
import NavBar from "./navbar";

const Layout = (props: any) => {
  const { connection, adapterWalletObj, anchorWalletObj } = useWalletHook();

  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (anchorWalletObj?.publicKey) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      router.push("/");
    }
  }, [anchorWalletObj]);

  return (
    <>
      <NavBar loggedIn={loggedIn} />
      <CreateNewTweet loggedIn={loggedIn} />

      {props.children}
    </>
  );
};

export default Layout;
