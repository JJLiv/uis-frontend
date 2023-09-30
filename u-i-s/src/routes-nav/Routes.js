import React from "react";
import { Route, redirect } from "react-router-dom";

import Homepage from "../homepage/Homepage";
import TeamDetails from "../teams/TeamDetails";

function Routes() {
    console.debug(
        "Routes",
    );

    return (
        <div>
            <Route exact path="/teams/:code" element={<TeamDetails />} />
            <Route exact path="/home" element={<Homepage />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route path="/" element={<Homepage />} />
        </div>
    )
}

export default Routes;