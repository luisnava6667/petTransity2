/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const AuthContext = createContext()
const AuthProvider = ({ children }) => {
  const user = localStorage.getItem('role')
  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  useEffect(() => {
    const autenticarUsuario = async () => {
      setCargando(true)
      if (!token) {
        setCargando(false)
        return
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      try {
        const { data } = await clienteAxios.get(`/${user}/perfil`, config)
        setAuth(data)
        setCargando(false)
      } catch (error) {
        console.log(error)
        setAuth({})
      }
    }
    autenticarUsuario()
  }, [token, user])
  const cerrarSesionAuth = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setAuth({})
    navigate('/login')
  }

  const actualizarPerfil = async (values) => {}
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        actualizarPerfil,
        cerrarSesionAuth,
        cargando,
        setCargando
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext
