import NavBarLogin from '../../components/NavBarLogin'
import ComponentImage from '../../components/ComponentImage'
import canUsuario from '../../assets/canUsuario.svg'
import canRefugio from '../../assets/canRefugio.svg'
import flecha from '../../assets/flechaNav.svg'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Register = () => {
  useEffect(() => {
    document.title = 'Registro'
  }, [])
  return (
    <main className='h-screen bg-[#ccc4bb] '>
      <NavBarLogin
        imgButton={flecha}
        textButtonNav={'Volver'}
        styles={
          'flex rounded-md bg-[#E59D1C] px-5 py-2.5 text-3xl justify-around font-medium text-black transition w-44 h-14 shadow-md'
        }
        ruta={'/login'}
      />
      <div className='grid items-center bg-[#ccc4bb]'>
        <p className='text-5xl font-bold text-[#6F4C48] mt-12 text-center'>
          REGISTRARME COMO:
        </p>
        <div className='md:flex grid justify-around mt-12 rounded-full '>
          <Link to={'/register-usuario'} className='grid text-center'>
            <p className='text-3xl font-bold text-[#6F4C48] underline'>
              Usuario
            </p>
            <ComponentImage
              image={canUsuario}
              stylesImg={'rounded-full w-72 2xl:w-96'}
            />
          </Link>
          <Link to={'/register-refugio'} className='grid text-center'>
            <p className='text-3xl font-bold text-[#6F4C48] underline'>
              Refugio
            </p>
            <ComponentImage
              image={canRefugio}
              stylesImg={'rounded-full w-72 2xl:w-96'}
            />
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Register
