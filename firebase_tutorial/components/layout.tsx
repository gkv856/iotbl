import { Fragment, useState } from "react";
import useFireBaseAuth from "../firebase/useAuth";
import NavBar from "./navBar";

const Layout = (props: any) => {
    const auth = useFireBaseAuth();
    if (auth.loading) {
        return <Fragment>"Loading Please wait..."</Fragment>;
    }
    return (
        <Fragment>
            {auth.user && <NavBar isLoggedIn={true} auth={auth} />}
            {!auth.user && <NavBar isLoggedIn={false} />}

            <main
                style={{ minHeight: "100vh" }}
                className="spacer mt-1 mt-md-1 "
            >
                {props.children}
            </main>
        </Fragment>
    );
};

export default Layout;
