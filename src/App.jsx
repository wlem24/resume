// TODO Day 1: import Header and EvaluatorPage and render them here
// TODO Day 4: import Routes, Route from react-router-dom
//             import LoginPage and RegisterPage
//             add route definitions
import Header from './components/Header'
import Footer from './components/Footer'
import EvaluatorPage from './pages/EvaluatorPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Routes, Route,NavLink,Outlet } from 'react-router-dom'


export default function App() {
  return (
    <div className="App">
      <Header />
    
      <Routes>
        <Route path="/" element={<EvaluatorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<EvaluatorPage />} />
      </Routes>
      
      <Footer />
    </div>
  )
}
