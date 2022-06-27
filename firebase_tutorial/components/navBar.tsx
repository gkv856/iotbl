import Link from "next/link";
import { Fragment } from "react";
import LoginWithGoogle from "../firebase/loginWithGoogle";

const NavBar = (props: any) => {
    const auth = props.auth || null;

    const getLoggedInMenu = () => {
        return (
            <nav className="navbar navbar-expand-lg bg-dark text-light mb-3 ">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler  bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="bi bi-list"></i>
                    </button>
                    <div
                        className="collapse navbar-collapse navbar-brand "
                        id="navbarText"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link href="/">
                                    <button
                                        type="button"
                                        className="btn  btn-outline-light btn-sm me-2"
                                    >
                                        <i className="bi bi-house-door">
                                            {" "}
                                            Home
                                        </i>
                                    </button>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link href="/profile">
                                    <button
                                        type="button"
                                        className="btn btn-outline-light  btn-sm "
                                    >
                                        <i className="bi bi-person"> Profile</i>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                        <span className="navbar-text">
                            <button
                                type="button"
                                className="btn btn-outline-light btn-sm"
                                onClick={() => {
                                    auth.logOut();
                                }}
                            >
                                <i className="bi bi-box-arrow-left"> Logout</i>
                            </button>
                        </span>
                    </div>
                </div>
            </nav>
        );
    };
    const getLoggedOutMenu = () => {
        return (
            <nav className="navbar navbar-expand-lg bg-dark text-light mb-3">
                <div className="container-fluid ">
                    <Link href="#">
                        <button className="btn btn-outline-light btn-sm ms-md-5 ">
                            My Awesome APP
                        </button>
                    </Link>
                    <div className=" me-md-5">
                        <LoginWithGoogle />
                    </div>
                </div>
            </nav>
        );
    };
    return (
        <Fragment>
            {auth && getLoggedInMenu()}
            {!auth && getLoggedOutMenu()}
        </Fragment>
    );
};

export default NavBar;
