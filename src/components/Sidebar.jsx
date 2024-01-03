import logoYellow from '../assets/logoYellow.svg'
import mapa from '../assets/mapa.svg'
import mapaOrange from '../assets/gpsOrange.svg'
import homeOrange from '../assets/homeOrange.svg'
import huellaOrange from '../assets/huellaOrange.svg'
import perfilOrange from '../assets/perfilOrange.svg'
import salir from '../assets/salir.svg'
import huella from '../assets/huella.svg'
import perfil from '../assets/perfil.svg'
import estadistica from '../assets/estadistica.png'
import homeText from '../assets/homeTextoNav.svg'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
  const { pathname } = useLocation()
  const { cerrarSesionAuth } = useAuth()
  const { auth } = useAuth()

  const handleCerrarSesion = () => {
    cerrarSesionAuth()
  }
  return (
    <header className=' min-h-screen bg-[#503734]'>
      <div className=' hidden bg-[#503734] h-full md:flex items-center lg:gap-8 lg:px-3  xl:px-8 rounded-r-lg rounded-br-lg  shadow-[4px_0_6px_0] shadow-[#483938]'>
        <div className='flex flex-1 flex-col items-center  md:justify-between '>
          <Link className='block text-teal-600' to='/dashboard'>
            <img
              className='md:w-56 md:h-9 lg:w-52 lg:h-11'
              alt='logo'
              src={logoYellow}
            />
          </Link>
          <div className='h-[41rem]   flex flex-col justify-evenly lg:mb-28'>
            <div
              className={`${
                pathname === '/dashboard' && 'bg-[#442F2C] rounded-xl'
              } md:flex  pl-3  md:h-20 md:w-44 lg:w-64`}>
              <Link
                className={`flex items-center md:gap-4 lg:gap-6 ${
                  pathname === '/dashboard'
                    ? ' text-[#E59D1C]  text-3xl font-semibold'
                    : 'text-white text-3xl font-semibold'
                }`}
                to='/dashboard'>
                <img
                  className='lg:w-7 lg:h-6'
                  width={26}
                  height={22}
                  alt='icono home'
                  src={pathname === '/dashboard' ? homeOrange : homeText}
                />
                Home
              </Link>
            </div>
            {auth.role === 'usuarios' && (
              <div
                className={`${
                  pathname === '/mapa' && 'bg-[#442F2C] rounded-xl'
                } md:flex  pl-3  md:h-20 md:w-44 lg:w-64`}>
                <Link
                  className={`flex items-center md:gap-4 lg:gap-6 ${
                    pathname === '/mapa'
                      ? ' text-[#E59D1C]  text-3xl font-semibold'
                      : 'text-white text-3xl font-semibold'
                  }`}
                  to='/mapa'>
                  <img
                    className='lg:w-7 lg:h-6 '
                    width={26}
                    height={22}
                    alt='icono mapa'
                    src={pathname === '/dashboard/mapa' ? mapaOrange : mapa}
                  />
                  Mapa
                </Link>
              </div>
            )}
            <div
              className={`${
                pathname === '/animales' && 'bg-[#442F2C] rounded-xl'
              } md:flex  pl-3  md:h-20 md:w-44 lg:w-64`}>
              <Link
                className={`flex items-center md:gap-4 lg:gap-6 ${
                  pathname === '/animales' || pathname === '/register-animales'
                    ? ' text-[#E59D1C]  text-3xl font-semibold'
                    : 'text-white text-3xl font-semibold'
                }`}
                to='/animales'>
                <img
                  className='lg:w-7 lg:h-6 '
                  width={26}
                  height={24}
                  alt='icono de animales'
                  src={
                    pathname === '/animales' ||
                    pathname === '/register-animales'
                      ? huellaOrange
                      : huella
                  }
                />
                Animales
              </Link>
            </div>
            <div
              className={`${
                pathname === '/perfil' && 'bg-[#442F2C] rounded-xl'
              } md:flex  pl-3  md:h-20 md:w-44 lg:w-64`}>
              <Link
                className={`flex items-center md:gap-4 lg:gap-6 ${
                  pathname === '/perfil'
                    ? ' text-[#E59D1C]  text-3xl font-semibold'
                    : 'text-white text-3xl font-semibold'
                }`}
                to='/perfil'>
                <img
                  className='lg:w-7 lg:h-6 '
                  width={26}
                  height={22}
                  alt='icono perfil'
                  src={pathname === '/dashboard/perfil' ? perfilOrange : perfil}
                />
                Perfil
              </Link>
            </div>
            {auth.role === 'refugio' && (
              <div>
                <Link
                  className={`flex items-center md:gap-4 lg:gap-6 text-white text-3xl font-semibold
                  `}
                  target='_blank'
                  to='https://app.powerbi.com/links/_dqQYBpePk?ctid=659e1dba-b3cc-4dcc-8730-d23877e7ab7b&pbi_source=linkShare'>
                  <img
                    className='lg:w-7 lg:h-6 '
                    width={26}
                    height={22}
                    alt='icono perfil'
                    src={estadistica}
                  />
                  Estadística
                </Link>
              </div>
            )}
          </div>

          <div className='sm:flex'>
            <button
              onClick={handleCerrarSesion}
              className='flex items-center rounded-md  text-xl justify-around font-semibold text-white transition md:w-44  md:h-11 lg:w-64  lg:h-16 '>
              <p className='h-full flex items-center'>Cerrar sesión</p>
              <img src={salir} alt='' />
            </button>
          </div>
          {/* <div className="flex items-center gap-4">
            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
      <div className=' flex  bg-[#503734] h-full md:hidden items-center  rounded-r-lg rounded-br-lg  shadow-[4px_0_6px_0] shadow-[#483938]'>
        <div className='flex flex-1 flex-col items-center'>
          <div className='h-[41rem] w-14 flex flex-col justify-evenly '>
            <div
              className={`${
                pathname === '/dashboard' && 'bg-[#5E413D]  rounded-xl'
              } sm:flex  pl-3  sm:h-[5.38rem]`}>
              <Link to='/dashboard'>
                <img
                  className='lg:w-7 lg:h-6'
                  width={26}
                  height={22}
                  alt='icono home'
                  src={pathname === '/dashboard' ? homeOrange : homeText}
                />
              </Link>
            </div>
            {auth.role === 'usuario' && (
              <div
                className={`${
                  pathname === '/mapa' && 'bg-[#5E413D] rounded-xl'
                } sm:flex  pl-3  sm:h-[5.38rem]`}>
                <Link to='/mapa'>
                  <img
                    className='lg:w-7 lg:h-6 '
                    width={26}
                    height={22}
                    alt='icono mapa'
                    src={pathname === '/dashboard/mapa' ? mapaOrange : mapa}
                  />
                </Link>
              </div>
            )}
            <div
              className={`${
                pathname === '/animales' && 'bg-[#5E413D] rounded-xl'
              } sm:flex  pl-3  sm:h-[5.38rem]`}>
              <Link to='/animales'>
                <img
                  className='lg:w-7 lg:h-6 '
                  width={26}
                  height={24}
                  alt='icono de animales'
                  src={
                    pathname === '/animales' ||
                    pathname === '/register-animales'
                      ? huellaOrange
                      : huella
                  }
                />
              </Link>
            </div>
            <div
              className={`${
                pathname === '/perfil' && 'bg-[#5E413D] rounded-xl'
              } sm:flex  pl-3  sm:h-[5.38rem]`}>
              <Link to='/perfil'>
                <img
                  className='lg:w-7 lg:h-6 '
                  width={26}
                  height={22}
                  alt='icono perfil'
                  src={pathname === '/dashboard/perfil' ? perfilOrange : perfil}
                />
              </Link>
            </div>
          </div>

          <div className='sm:flex'>
            <button
              onClick={handleCerrarSesion}
              className='flex items-center rounded-md  text-xl justify-around font-semibold text-white transition md:w-44  md:h-11 lg:w-64  lg:h-16 '>
              <img className='w-9 h-9' src={salir} alt='' />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Sidebar
