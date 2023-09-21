import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { LOGIN } from '../../config/routes/paths';


export const PrivateRoute = () => {
    const {  isAuthenticated, user } = useAuth0();

    if (!isAuthenticated) {
        return <div>Loading ...</div>;
    }
    return (
        <>
            {user ? (
                <div>
                    <Outlet />
                </div>
            ) : (
                <Navigate to={LOGIN} />
            )}
        </>
    )

}