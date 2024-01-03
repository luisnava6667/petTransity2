import { useContext } from 'react'
import RefugioContext from '../context/RefugioContext'

const useRefugio = () => {
  return useContext(RefugioContext)
}

export default useRefugio
