import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import useUserStore from "../stores/userStore";
import Lottie from "lottie-react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { useEffect, useState } from "react";
import loadingAnimation from "../assets/Minimal Style 3D Sphere Animation.json";

const ProtectedRoute = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuthStore();
    const { user, setUser } = useUserStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                console.log("Inside Function")
                const response = await axios.get(`${BACKEND_URL}/user/me`, { withCredentials: true });
                setUser(response.data.user);
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        restoreSession();
    }, [setUser, setIsAuthenticated]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <Lottie animationData={loadingAnimation} loop={true} style={{ width: 200, height: 200 }} />
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
