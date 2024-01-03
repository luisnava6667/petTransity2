import ubicacionCard from '../assets/ubicacionCard.svg'
import telCard from '../assets/telCard.svg'
import huellaCard from '../assets/huellaCard.svg'
import useAuth from '../hooks/useAuth'
import huellaLogo from '../assets/huellaLogo.svg'
const CardUsuarioDashboard = () => {
  const { auth } = useAuth()
  
  const {
    nombre,
    apellido,
    avatar,
    direccion,
    piso,
    unidad,
    codigoPostal,
    localidad,
    whatsApp,
    role,
    pets
  } = auth

  return (
    <>
      <div className='relative flex flex-col mt-7 '>
        <div className='flex justify-center w-72 h-20 bg-[#6F4C48] rounded-tl-2xl rounded-tr-2xl '>
          {avatar ? (
            <img
              className=''
              width={50}
              height={50}
              alt='imagen de usuario'
              src={avatar}
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
        </div>

        <div className='flex flex-col w-72 h-60 bg-[#E6E2DD] rounded-bl-2xl rounded-br-2xl items-center justify-center'>
          <h2 className='w-48  mb-2 text-2xl font-medium'>
            {nombre} {apellido}
          </h2>

          <div className='flex w-52 gap-1 my-1'>
            <img
              className=' '
              alt='1'
              src={ubicacionCard}
              width={20}
              height={20}
            />
            <p className='text-base font-medium'>
              Direccion: {direccion}, Piso: {piso}, Dpto: {unidad}, CP:{' '}
              {codigoPostal}, Barrio: {localidad}
            </p>
          </div>
          <div className='flex w-52 gap-1 my-1'>
            <img className=' ' alt='1' src={telCard} width={20} height={20} />
            <p className='text-base font-medium'>{whatsApp}</p>
          </div>

          {role === 'usuario' && (
            <div className='flex w-48 gap-1 my-1'>
              <img
                className=' '
                alt=''
                src={huellaCard}
                width={20}
                height={20}
              />
              <p className='text-base font-medium'>
                {pets?.length === 0 ? 'No posee mascotas' : 'Posee mascotas'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CardUsuarioDashboard
