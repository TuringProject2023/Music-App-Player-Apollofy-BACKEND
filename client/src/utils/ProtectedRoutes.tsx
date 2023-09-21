import {Navigate} from 'react-router-dom'

export const ProtectedRoutes = ({user, redirectPath = '/private', children}) => {
    if (!user) {
        <Navigate to={redirectPath} replace/>
    } 
    return children;
}