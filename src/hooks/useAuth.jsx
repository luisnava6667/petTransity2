import { useContext } from 'react'
import AuhtContext from '../context/AuthContext'

const useAuth = () => {
  return useContext(AuhtContext)
}

export default useAuth
