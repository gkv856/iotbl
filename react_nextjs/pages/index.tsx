import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFireBaseAuth from "../firebase_tutorial/firebase/useAuth";

const IndexPage = () => {
    const { user, loading } = useFireBaseAuth();
    const router = useRouter();

    if (loading) {
        return "Loading please wait...";
    }

    // we are logged in
    if (user) {
        router.push("/home");
    }

    return (
        <div className="container bg-secondary p-5 rounded text-center bg-opacity-25">
            <h1 className="mb-3 text-success">Hello World!!</h1>
            <h4 className="text-muted">Login to Continue!!</h4>
        </div>
    );
};

export default IndexPage;
