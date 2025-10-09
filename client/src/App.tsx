import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import MainLayout from './layouts/MainLayout'

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />} >
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>

      <Route element={<MainLayout />} >
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

    </Routes>
  )
}

export default App