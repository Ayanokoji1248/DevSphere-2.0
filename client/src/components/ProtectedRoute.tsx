import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore"
import useUserStore from "../stores/userStore";

const ProtectedRoute = () => {

    const { isAuthenticated } = useAuthStore();
    const { user } = useUserStore()

    if (!isAuthenticated || user == null) {
        return <Navigate to='/login' replace />
    }
    else {
        return <Outlet />
    }

}

export default ProtectedRoute