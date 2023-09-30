import React, { useContext } from "react";
import { Route, redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/// private routes not allowing access to route if logged out.
/// not implented for development
function PrivateRoute({ exact, path, children }) {
    const { currentUser } = useContext(UserContext);

    console.debug(
        "PrivateRoute",
        "exact=", exact,
        "path=", path,
        "currentUser=", currentUser,
    );

    if (!currentUser) {
        return redirect("/");
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;