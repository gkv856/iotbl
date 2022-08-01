import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const NavBar = () => {
  const wallet = useWallet();
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (wallet.publicKey) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      router.push("/");
    }
  }, [wallet]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark ">
        <div className="container-fluid">
          <button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link href="/">
              <button className="btn btn-sm navbar-brand text-light">
                Twitter on Solana
              </button>
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <Link href="/myTweets">
                  <button
                    className="btn btn-sm navbar-brand text-light"
                    disabled={!loggedIn}
                  >
                    My Tweets
                  </button>
                </Link>
              </li>
            </ul>
            <WalletMultiButton />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
