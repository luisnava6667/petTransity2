import NavBarLogin from '../../components/NavBarLogin'
import donar from '../../assets/donar.svg'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import clienteAxios from '../../config/clienteAxios'
import { Link, useParams } from 'react-router-dom'
import * as Yup from 'yup'

const NuevoPassword = () => {
  const { token } = useParams()
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)
  useEffect(() => {
    document.title = 'Nuevo Password'

    const comprobarToken = async () => {
      try {
        const url = `/nuevo-password/${token}`
        await clienteAxios.get(url)
        setTokenValido(true)
      } catch (error) {
        console.log(error.response.data)

        setAlerta({
          msg: error.response.data,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('La contraseña es requerida')
        .min(3, 'La contraseña debe tener al menos 3 caracteres')
    }),
    onSubmit: async (values) => {
      try {
        const url = `/nuevo-password/${token}`
        const { data } = await clienteAxios.post(url, values)
        setAlerta({
          msg: data.msg,
          error: false
        })
        setPasswordModificado(true)
      } catch (error) {
        console.log(error.response.data)
        setAlerta({
          msg: error.response.data,
          error: true
        })
      }
    }
  })
  const { handleSubmit, handleChange, handleBlur, touched, errors } = formik

  return (
    <main className='h-screen bg-[#CCC4BB] '>
      <div className='pb-10'>
        <NavBarLogin
          imgButton={donar}
          textButtonNav={'Donar'}
          ruta={'/donar'}
          styles={
            'flex rounded-md bg-[#E59D1C] px-5 py-2.5 text-3xl justify-around font-medium text-black transition w-44 h-14 shadow-md'
          }
        />
      </div>
      <div className='grid gap-14 justify-items-center'>
        <h2 className='text-2xl uppercase font-bold text-white'>
          Restablece tu password
        </h2>
        {alerta.msg && (
          <div className='grid  bg-white  mt-5 text-red-900 uppercase font-bold text-lg p-3 text-center'>
            {alerta.msg}
          </div>
        )}
        {/* { errors.password ? (
          <div className='bg-white text-red-900 uppercase font-bold text-lg p-3 text-center'>
            {errors.password}
          </div>
        ) : null} */}
        {tokenValido && (
          <form
            onBlur={handleBlur}
            onSubmit={handleSubmit}
            className='grid gap-4'>
            {passwordModificado ? (
              <Link to='/login'>
                <button className='bg-[#E59D1C] text-white uppercase font-bold text-lg p-3 rounded-md'>
                  Iniciar sesión
                </button>
              </Link>
            ) : (
              <div className='grid gap-4'>
                <label
                  htmlFor='password'
                  className='text-white font-bold text-lg uppercase'>
                  Nueva contraseña
                </label>
                <input
                  id='password'
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type='password'
                  placeholder='**********'
                  className={`block w-[25rem] h-12 p-2 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    touched.password && errors.password
                      ? 'ring-red-500  focus:ring-red-500'
                      : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                <button
                  type='submit'
                  className='bg-[#E59D1C] text-white uppercase font-bold text-lg p-3 rounded-md mt-5'>
                  Restablecer contraseña
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  )
}

export default NuevoPassword
