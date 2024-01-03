import { Link } from 'react-router-dom'
import donarB from '../assets/donarB.svg'
import huellaLogo from '../assets/huellaLogo.svg'
import useAuth from '../hooks/useAuth'
const TopBar = () => {
  const { auth } = useAuth()

  return (
    <div className='mx-auto w-full py-14 bg-[#503734] flex h-20  items-center  px-4 lg:px-8'>
      <img className='md:hidden' src={huellaLogo} alt='' />
      <div className='flex flex-1 items-center justify-end md:justify-between'>
        <div className='flex flex-col mr-3 md:gap-2  px-auto'>
          <Link className='' to='/dashboard'>
            {auth.avatar ? (
              <img
                className=''
                width={50}
                height={50}
                alt='imagen de usuario'
                src={auth.avatar}
              />
            ) : (
              <img
                className=''
                width={50}
                height={50}
                alt='imagen de usuario'
                src={huellaLogo}
              />
            )}
          </Link>
          <div className='text-white '>
            <p className='h-full flex'>
              {auth?.nombre} <br /> {auth?.apellido}
            </p>
          </div>
        </div>
        <div className='hidden md:grid text-center text-white'>
          <h1 className='md:text-xl lg:text-2xl text-[#FFA402]'>
            Bienvenido a Pet Transity
          </h1>
          <p className=' md:text-xs lg:text-sm'>
            Una aplicación para los amantes de los animales
          </p>
        </div>
        <div className='flex  items-center gap-4'>
          {auth.role === 'usuarios' && (
            <div className='sm:flex '>
              <Link
                className='flex rounded-md bg-[#FFA402] lg:m-2  justify-around items-center font-medium text-black transition md:w-[7rem] lg:w-36 h-11 shadow-md'
                to='/donar'>
                <img
                  className=''
                  width={22}
                  height={20}
                  alt='logo'
                  src={donarB}
                />
                Donar
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopBar
