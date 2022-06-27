import Image from "next/image";

import { getDatabase, ref, set, onValue } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import useFireBaseAuth from "../firebase_tutorial/firebase/useAuth";

const ProfilePage = () => {
    const { user } = useFireBaseAuth();
    const bioTrRef = useRef();
    const [msg, setMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);

    const [userDetails, setUserDetails] = useState({});

    const userDbRef = `users/${user?.uid}`;

    useEffect(() => {
        getUpdatedUser();
    }, [user]);

    const getUpdatedUser = () => {
        try {
            const db = getDatabase();
            // db - is the data connection
            // appConstants.dbBookRef is the node where we store the books/users/etc
            // bookDetails.fileHex is the unique book id
            const reference = ref(db, userDbRef);
            onValue(reference, (snapshot) => {
                setUserDetails(snapshot.val());
            });
        } catch (err) {
            console.log(err);
        }
    };
    const showNewMsg = () => {
        setShowMsg(true);
        setTimeout(() => {
            setShowMsg(false);
        }, 2000);
    };

    const handleProfileUpdate = (event: any) => {
        event.preventDefault();
        const newBio = bioTrRef.current?.value;
        console.log("newBio = ", newBio);

        try {
            const db = getDatabase();
            // db - is the data connection
            // appConstants.dbBookRef is the node where we store the books/users/etc
            // bookDetails.fileHex is the unique book id
            const reference = ref(db, userDbRef);
            const newUserDetails = {
                bio: newBio,
                password: "mynew passwrod",
                isPremium: false,
                address: "Toronto",
            };

            //update tje data base
            set(reference, newUserDetails);

            // if everything is ok, then update the state variable
            getUpdatedUser();

            setMsg("Profile Updated");
            showNewMsg();
        } catch (err) {
            console.log(err);
            setMsg("Error!! Try again");
            showNewMsg();
        }
    };

    if (!user) {
        return <>Loading/...</>;
    }
    return (
        <>
            <div className="container bg-primary p-5 rounded text-center bg-opacity-25">
                <h1 className="mb-3">I am from Profile page</h1>
                <div className="row mt-4 d-flex justify-content-center bg-secondary bg-opacity-50">
                    <div className="col border p-2">
                        <Image
                            className="img-fluid rounded "
                            src={user.photoURL}
                            height={100}
                            width={100}
                            alt="user profile pic"
                        />
                    </div>
                    <div className="col-md-7 border p-2 ">
                        <p>
                            <i className="bi bi-file-earmark-person">
                                {" "}
                                {userDetails?.bio || "Bio not found"}
                            </i>
                        </p>
                        <p>
                            <i className="bi bi-geo-alt-fill">
                                {" "}
                                {userDetails?.address || "Address Not Found"}
                            </i>
                        </p>
                    </div>
                </div>

                <div className="row mt-4 d-flex justify-content-center">
                    <div className="col-md-7">
                        <div className="input-group">
                            <span className="input-group-text">
                                With textarea
                            </span>
                            <textarea
                                className="form-control"
                                aria-label="With textarea"
                                ref={bioTrRef}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="btn btn-success mt-md-3 mt-1"
                    onClick={handleProfileUpdate}
                >
                    Update Profile
                </button>
                {showMsg && (
                    <div className="border mt-4  rounded p-3 bg-info">
                        {msg}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfilePage;
