import auth from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useFireBaseAuth = () => {
    const router = useRouter();

    const [authUser, setAuthUser] = useState<auth.User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth).then((res) => {
            // clear up the cookies
            // maybe update the database
            console.log("Signed out");
            router.push("/");
        });
    };

    const authStateChangeHandler = (authState: any) => {
        if (!authState) {
            // console.log("user is not logged in");
            // redirect the user to index page

            setAuthUser(null);
            setLoading(false);

            // also clear out cookies if you want
            router.push("/");
        } else {
            // console.log("welcome back");

            // also set  cookies if you want
            setAuthUser(authState);
            setLoading(false);
        }
    };

    // this will called once the component is mounted/initialized
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChangeHandler);

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        user: authUser,
        loading: loading,
        logOut: handleLogout,
    };
};

export default useFireBaseAuth;
