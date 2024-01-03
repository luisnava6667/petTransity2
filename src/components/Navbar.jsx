import logoWhite from '../../assets/logoWhite.svg'
import home from '@/assets/home.svg'
import mapa from '@/assets/mapa.svg'
import mapaOrange from '@/assets/gpsOrange.svg'
import homeOrange from '@/assets/homeOrange.svg'
import huellaOrange from '@/assets/huellaOrange.svg'
import perfilOrange from '@/assets/perfilOrange.svg'
import huella from '@/assets/huella.svg'
import perfil from '@/assets/perfil.svg'
import homeText from '@/assets/homeTextoNav.svg'

import { usePathname } from 'next/navigation'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <header className='w-full bg-[#6F4C48]'>
      <div className='mx-auto py-14 bg-[#6F4C48] flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-1 items-center justify-end md:justify-between'>
          <Link className='block text-teal-600' to='/dashboard'>
            <img
              className=''
              width={215}
              height={46}
              alt='logo'
              src={logoWhite}
            />
          </Link>
          <div className='sm:flex sm:gap-4 px-auto'>
            <Link
              className={`flex items-center gap-1 ${
                pathname === '/'
                  ? ' text-[#E59D1C]  border-b-2'
                  : 'text-white text-xl font-semibold'
              }`}
              to='#'>
              <img
                className=''
                width={20}
                height={20}
                alt='icono home'
                src={pathname === '/' ? homeOrange : homeText}
              />
              Home
            </Link>
          </div>
          <div className='sm:flex sm:gap-4 px-auto'>
            <Link
              className={`flex items-center gap-1 ${
                pathname === '/dashboard/mapa'
                  ? ' text-[#E59D1C]  border-b-2'
                  : 'text-white text-xl font-semibold'
              }`}
              to='#'>
              <img
                className=' '
                width={20}
                height={20}
                alt='icono mapa'
                src={pathname === '/dashboard/mapa' ? mapaOrange : mapa}
              />
              Mapa
            </Link>
          </div>
          <div className='sm:flex sm:gap-4 px-auto'>
            <Link
              className={`flex items-center gap-1 ${
                pathname === '/dashboard/mis-mascotas'
                  ? ' text-[#E59D1C]  border-b-2'
                  : 'text-white text-xl font-semibold'
              }`}
              to='/'>
              <img
                className=' '
                width={20}
                height={20}
                alt='icono de huella de mascota'
                src={
                  pathname === '/dashboard/mis-mascotas' ? huellaOrange : huella
                }
              />
              Mis mascotas
            </Link>
          </div>
          <div className='sm:flex sm:gap-4 px-auto'>
            <Link
              className={`flex items-center gap-1 ${
                pathname === '/dashboard/perfil'
                  ? ' text-[#E59D1C]  border-b-2'
                  : 'text-white text-xl font-semibold'
              }`}
              to='/'>
              <img
                className=' '
                width={20}
                height={20}
                alt='icono perfil'
                src={pathname === '/dashboard/perfil' ? perfilOrange : perfil}
              />
              Perfil
            </Link>
          </div>
          <div className='sm:flex sm:gap-4 px-auto'>
            <Link
              className='flex items-center rounded-md bg-[#E59D1C] px-5 py-2.5 text-xl justify-around font-semibold text-black transition w-36  h-10 shadow-md'
              to='/'>
              <img
                className=' '
                width={30}
                height={30}
                alt='icono botón'
                src={home}
              />
              Botón
            </Link>
          </div>
          <div className='flex items-center gap-4'>
            <button className='block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden'>
              <span className='sr-only'>Toggle menu</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
