import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import PostPage from './pages/PostPage'
import ProjectPage from './pages/ProjectPage'
import ProjectLayout from './layouts/ProjectLayout'
import ExplorePage from './pages/ExplorePage'
import ReviewPage from './pages/ReviewPage'
import ParticularProjectPage from './pages/ParticularProjectPage'
import HeroPage from './pages/HeroPage'

const App = () => {

  return (
    <Routes>

      <Route path='/' element={<HeroPage />} />

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
        <Route element={<ProjectLayout />}>
          <Route path='/project' element={<ProjectPage />} />
          <Route path='/project/:id' element={<ParticularProjectPage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/review' element={<ReviewPage />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App