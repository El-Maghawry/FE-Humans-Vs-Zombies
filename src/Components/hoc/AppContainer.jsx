import {Link} from "react-router-dom";

function AppContainer({children}) {
    return (
        <>

        <div className="container">{children}</div>
        </>
    )
}

export default AppContainer;