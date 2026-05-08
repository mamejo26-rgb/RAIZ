import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Interprete from './pages/Interprete'
import Boveda from './pages/Boveda'
import Herederos from './pages/Herederos'
import Servicios from './pages/Servicios'
import ModoHeredero from './pages/ModoHeredero'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('raiz_token')
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pública */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* App — requiere auth */}
        <Route path="/app" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/app/organizar" element={<PrivateRoute><Interprete /></PrivateRoute>} />
        <Route path="/app/boveda" element={<PrivateRoute><Boveda /></PrivateRoute>} />
        <Route path="/app/herederos" element={<PrivateRoute><Herederos /></PrivateRoute>} />
        <Route path="/app/servicios" element={<PrivateRoute><Servicios /></PrivateRoute>} />

        {/* Modo heredero — acceso especial */}
        <Route path="/heredero/:titularId" element={<ModoHeredero />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
