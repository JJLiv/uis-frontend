import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
    console.debug("Homepage");

    return (
        <div className="Homepage">
            <div className="container">
                <h1>Up In Sports</h1>
                <p>All things sports!!</p>

                <p>
                    Login Link and Signup Link.
                </p>
            </div>
        </div>
    )
}

export default Homepage;