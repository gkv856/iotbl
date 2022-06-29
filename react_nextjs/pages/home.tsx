import useFireBaseAuth from "../firebase_tutorial/firebase/useAuth";

const HomePage = () => {
    const { user } = useFireBaseAuth();
    return (
        <div className="container bg-warning p-5 rounded text-center bg-opacity-25">
            <h1 className="mb-3">Welcome back '{user?.displayName}'</h1>
            <h6>You should see me only if you are logged in. </h6>
            <br />
        </div>
    );
};

export default HomePage;
