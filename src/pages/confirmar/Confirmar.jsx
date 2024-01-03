import NavBarLogin from '../../components/NavBarLogin'
import donar from '../../assets/donar.svg'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clienteAxios from '../../config/clienteAxios'
import Alerta from './components/Alerta'

const Confirmar = () => {
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const { token } = useParams()
  // console.log(token)
  useEffect(() => {
    document.title = 'Confirmar Cuenta'

    const confirmarCuenta = async () => {
      try {
        const url = `confirm/${token}`
        const { data } = await clienteAxios(url)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
        return
      } catch (error) {
        setAlerta({
          msg: error.response.data,
          error: true
        })
      }
    }
    confirmarCuenta()
  }, [])
  const { msg } = alerta
  return (
    <main className='h-screen bg-[#CCC4BB] grid'>
      <NavBarLogin
        imgButton={donar}
        textButtonNav={'Donar'}
        ruta={'/donar'}
        styles={
          'flex rounded-md bg-[#E59D1C] px-5 py-2.5 text-3xl justify-around font-medium text-black transition w-44 h-14 shadow-md'
        }
      />
      <div className='flex flex-col items-center'>
        {msg && <Alerta alerta={alerta} />}
        <div className='grid text-white font-bold'>
          {cuentaConfirmada ? (
            <Link
              className='text-center my-5 bg-[#6F4C48] uppercase text-sm p-4 rounded-xl'
              to='/login'>
              Inicia Sesión
            </Link>
          ) : (
            <Link
              className='text-center my-5 bg-[#6F4C48] uppercase text-sm p-4 rounded-xl'
              to='/'>
              Regresar
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}

export default Confirmar
