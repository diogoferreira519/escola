import { Navigate } from "react-router-dom";

const PrivateRoute = ({children})=> {
    const hasToken = localStorage.getItem('token');

    return hasToken ? children : <Navigate to="/login"/>;
}
export default PrivateRoute;