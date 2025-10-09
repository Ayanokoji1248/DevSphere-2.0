import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />} >
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Route>

      <Route path='/home' element={<HomePage />} />

    </Routes>
  )
}

export default App