/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clienteAxios from '../config/clienteAxios'
import Spinner from './Spinner'
// import useRefugio from '../hooks/useRefugio'
// import cancelar from '../assets/cancelar.svg'
import useAuth from '../hooks/useAuth'

const CardInfoAnimales = () => {
  const { auth } = useAuth()
  const { pets } = auth
  console.log(pets?.length)
  // console.log(auth)
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const [cargando, setCargando] = useState(true)
  const [pet, setPet] = useState([])
  useEffect(() => {
    const getPet = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        if (role === 'usuarios') {
          const { data } = await clienteAxios.get(
            `/animales/view/${pets}`,
            config
          )
          setPet(data)
        }
      } catch (error) {
        console.log(error)
      }
      setCargando(false)
    }
    getPet()
  }, [role, token, pets])

  return (
    <div className='flex w-full  sm:w-[46rem] h-80 mt-7  bg-[#E6E2DD] rounded-2xl items-center justify-center'>
      {cargando ? (
        <Spinner />
      ) : role === 'refugio' ? (
        <div className='w-full p-10'>
          <h2 className='text-center font-bold text-3xl'>
            Cantidad de Mascotas{' '}
          </h2>
          <div className='grid text-center gap-10 mt-6'>
            <h3 className='text-center font-bold text-xl '>
              {pets?.length === 0
                ? 'No Tienes Macosta en tu refugio'
                : `Tienes un total de ${pets?.length} Mascotas`}
            </h3>
            <Link to='/register-animales'>
              <button className='bg-[#E59D1C] text-white uppercase rounded-lg px-4 py-2 font-bold text-xl'>
                Agregar
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className=' w-full overflow-auto'>
          <div className='mb-10'>
            <h2 className='font-extrabold text-2xl pt-8 pl-7 mb-2 '>
              Mis mascotas
            </h2>
            <div className='grid text-center gap-10 mt-6'>
              <h3 className='text-center font-bold text-xl '>
                {pets?.length === 0 ? (
                  <div className='grid items-center gap-5 '>
                    <p>Transita una mascota!</p>
                    <Link to='/animales'>
                      <button className='bg-[#E59D1C] text-white uppercase rounded-lg px-4 py-2 font-bold text-xl  '>
                        Transita una mascota!
                      </button>
                    </Link>
                  </div>
                ) : (
                  <p className='items-center'>
                    Estas Transitando a {pet.pet?.nombre}
                  </p>
                )}
              </h3>

              <div className='flex w-full'>
                {/* <Link to='/register-animales'>
                  <button className='bg-[#E59D1C] text-white uppercase rounded-lg px-4 py-2 font-bold text-xl mr-10 '>
                    Agregar
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardInfoAnimales
