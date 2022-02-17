import { Navigate } from 'react-router-dom';

function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = getAuth();
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

const getAuth = () => {
    const token = localStorage.getItem('token')
    return token
}

export default RequireAuth;