import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import useUserStore from './stores/userStore'
import axios from 'axios'
import { BACKEND_URL } from './utils'
import { useEffect, useState } from 'react'
import useAuthStore from './stores/authStore'
import Lottie from 'lottie-react'
import loadingAnimation from "./assets/Minimal Style 3D Sphere Animation.json"
import PostPage from './pages/PostPage'

const App = () => {

  const { setUser } = useUserStore();
  const { setIsAuthenticated } = useAuthStore()

  const [initialing, setInitialing] = useState(true)



  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/me`, { withCredentials: true });
        setUser(response.data.user)
        console.log(response.data)
        setIsAuthenticated(true)
      } catch (error) {
        console.error(error)
        setIsAuthenticated(false)
      } finally {
        setInitialing(false)
      }
    }
    restoreSession()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (initialing) return (
    <div className="flex justify-center items-center h-screen bg-white text-white">
      <Lottie animationData={loadingAnimation} loop={true} style={{ width: 200, height: 200 }} />
    </div>
  )

  return (
    <Routes>
      <Route element={<AuthLayout />} >
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />} >
        <Route element={<MainLayout />} >
          <Route path='/home' element={<HomePage />} />
          <Route path='/user/:id' element={<ProfilePage />} />
          <Route path='/post/:id' element={<PostPage />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App