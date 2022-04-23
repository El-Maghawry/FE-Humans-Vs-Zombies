import {Navigate, Outlet, useLocation} from "react-router-dom";

const isAuthenticated = () => {
    const userData = JSON.parse(localStorage.getItem('<USER>'));
    return userData !== null;
};

export function RequireAuth() {
    let auth = isAuthenticated();
    let location = useLocation();

    if (!auth) {
        console.log(location)
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return <Outlet/>;
}