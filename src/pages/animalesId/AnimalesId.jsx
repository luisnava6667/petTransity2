import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import useRefugio from '../../hooks/useRefugio'
import Spinner from '../../components/Spinner'
import Swal from 'sweetalert2'
import InputForm from '../../components/InputForm'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import name from '../../assets/name.svg'

const AnimalesId = () => {
  const { eliminarAnimal, changeState, asignedUser } = useRefugio()
  const [pet, setPet] = useState([])

  const navigate = useNavigate()
  const [refugio, setRefugio] = useState([])
  const [cargando, setCargando] = useState(true)

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const { id } = useParams()

  useEffect(() => {
    const getPet = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        if (role === 'refugio') {
          const { data } = await clienteAxios.get(
            `/animales/myPet/${id}`,
            config
          )
          setPet(data)
          setCargando(false)
        } else {
          const {
            data: { pet, refugio }
          } = await clienteAxios.get(`/animales/view/${id}`, config)
          setPet(pet)
          setRefugio(refugio)
          setCargando(false)
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.msg}`,
          confirmButtonColor: '#503734',
          confirmButtonText: 'Ir a Home'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/dashboard')
          }
        })
      }
    }
    getPet()

    document.title = 'Animales'
  }, [id, token, role, pet])

  const required = 'Este campo es requerido'
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Formato de email invalido').required(required)
    }),

    onSubmit: async (values) => {
      asignedUser(values, id)
    }
  })
  const { handleSubmit, handleChange, handleBlur, touched, errors } = formik

  return (
    <main className='h-screen bg-[#CCC4BB] flex'>
      <Sidebar />
      <div className='flex flex-col w-full h-full'>
        <div className=''>
          <TopBar />
        </div>
        {cargando ? (
          <Spinner />
        ) : (
          <div className='grid justify-items-center overflow-auto'>
            <h3 className='text-center text-2xl md:text-5xl p-5 font-bold text-[#503734]'>
              {pet.nombre}
            </h3>
            <div className='grid gap-5 lg:flex lg:w-full xl:px-28 '>
              <div className='bg-white rounded-lg p-5 mx-5 grid justify-items-center lg:w-1/3'>
                <img
                  src={pet.avatar}
                  alt={pet.nombre}
                  className='rounded-lg lg:h-64'
                />
              </div>
              <div className='bg-white rounded-lg mx-5 p-5 text-center lg:w-2/3 grid'>
                <p>
                  Especie: <b className='capitalize'>{pet.especie}</b>
                </p>
                <p>
                  Raza: <b className='capitalize'>{pet.raza}</b>
                </p>
                <p>
                  Edad: <b className='capitalize'>{pet.edad}</b>
                </p>
                <p>
                  Tamaño: <b className='capitalize'>{pet.tamaño}</b>
                </p>
                <p>
                  Peso: <b className='capitalize'>{pet.peso} kg</b>
                </p>
                <p>
                  Personalidad: <b className='capitalize'>{pet.personalidad}</b>
                </p>
                <p>
                  Salud: <b className='capitalize'>{pet.salud}</b>
                </p>
                <div className='grid justify-items-center mt-4 w-full'>
                  {role === 'usuarios' ? (
                    !pet.estado && (
                      <Link
                        className='w-1/2  bg-[#af8f3e] rounded-lg mx-5 text-white font-bold text-xl p-2 text-center cursor-not-allowed'
                        style={{ pointerEvents: 'none' }}>
                        No disponible
                      </Link>
                    )
                  ) : (
                    <div className='w-full grid gap-4'>
                      <div className='items-center'>
                        <button
                          onClick={() => changeState(pet._id)}
                          className='
                        w-1/2 bg-[#503734] rounded-lg mx-5 text-white font-bold text-xl p-2 text-center 
                        '>
                          {pet.estado ? 'Desactivar' : 'Activar'}
                        </button>
                      </div>
                      <div className='w-full flex'>
                        <Link
                          to={`/editar-animales/${pet._id}`}
                          className='w-1/2 bg-[#FFB800] rounded-lg mx-5 text-white font-bold text-xl p-2 text-center '>
                          Editar
                        </Link>
                        <button
                          onClick={() => eliminarAnimal(pet._id)}
                          className='w-1/2  bg-red-500 rounded-lg mx-5 text-white font-bold text-xl p-2 text-center '>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='gap-5 md:w-3/4 w-full xl:px-28 my-5'>
              {role === 'usuarios' ? (
                <div className='bg-white rounded-lg p-5 mx-5 grid justify-items-center '>
                  <h3 className='text-center text-2xl md:text-5xl p-5 font-bold text-[#503734]'>
                    Refugio
                  </h3>
                  <div className='md:flex justify-evenly w-full grid items-center'>
                    <img
                      className='rounded-lg h-44'
                      src={refugio.avatar}
                      alt='refugio'
                    />
                    <div>
                      <p>
                        Razon social:
                        <b className='capitalize'> {refugio.razon_social}</b>
                      </p>
                      <p>
                        Direccion:
                        <b className='capitalize'>
                          {`${refugio.direccion}, ${refugio.provincia}`}
                        </b>
                      </p>
                      <p>
                        Telefono:{' '}
                        <b className='capitalize'> {refugio.whatsApp}</b>
                      </p>
                      <p>
                        Email: <b className='capitalize'> {refugio.email}</b>
                      </p>
                      <div className='grid justify-items-center mt-4'>
                        <Link
                          //redirige a una pestaña nueva:
                          target='_blank'
                          to={`https://wa.me/+5491131496472?text=Hola%20me%20gustaría%20saber%20más%20sobre%20${pet.nombre}`}
                          className='w-1/2 bg-[#FFB800] rounded-lg mx-5 text-white font-bold text-xl p-2 text-center '>
                          Contactar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='bg-white rounded-lg p-5 mx-5 grid justify-items-center '>
                  {pet.estado ? (
                    <form onSubmit={handleSubmit}>
                      <h3 className='text-center text-2xl p-5 font-bold text-[#503734]'>
                        Ingresa el email del usuario va a ser el transito
                      </h3>
                      <InputForm
                        label='Correo'
                        name='email'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={formik.values.email}
                        placeholder='Correo'
                        touched={touched}
                        errors={errors}
                        nameSrc={name}
                        disabled={false}
                      />
                      <div className=' flex justify-end items-center '>
                        <button
                          type='submit'
                          className='flex mt-4 w-full h-14 text-center items-center  border-2 border-[#4F3300] justify-center rounded-2xl bg-[#E59D1C] px-3 py-1.5 text-sm lg:text-2xl font-semibold leading-6 text-[#4F3300]  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                          Enviar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className='flex justify-center items-center'>
                      <h3 className='text-center text-2xl p-5 font-bold text-[#503734]'>
                        El animal esta desactivado o esta en transito
                      </h3>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default AnimalesId
