import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

const LoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const router = useRouter();

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.

                // The signed-in user info.
                const user = result.user;

                // you would insert this detail to your database and proceed from there.
                console.log(user);

                router.push("/home");

                // ...
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-light btn-sm "
                onClick={handleLogin}
            >
                Login with Google
            </button>
        </>
    );
};

export default LoginWithGoogle;
