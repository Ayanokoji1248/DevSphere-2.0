import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore"

const ProtectedRoute = () => {

    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }
    else {
        return <Outlet />
    }

}

export default ProtectedRoute