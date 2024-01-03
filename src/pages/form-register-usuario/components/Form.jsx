import { useFormik } from 'formik'
import * as Yup from 'yup'
import name from '../../../assets/name.svg'
import mail from '../../../assets/mail.svg'
import lock from '../../../assets/lock.svg'
import { useState } from 'react'
import clienteAxios from '../../../config/clienteAxios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { CloudinaryContext, Image } from 'cloudinary-react'
import InputForm from '../../../components/InputForm'

const Form = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const required = 'Este campo es requerido'
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      piso: '',
      unidad: '',
      codigoPostal: '',
      provincia: '',
      comuna: '',
      localidad: '',
      barrio: '',
      password: '',
      password2: '',
      whatsApp: '',
      hogar: '',
      ambientes: '',
      patio_jardin: '',
      mascotas: '',
      desc_mascotas: '',
      estado_domicilio: '',
      avatar:
        'https://images.vexels.com/media/users/3/201898/isolated/preview/55be9a1a39abff39bc3596e8ddd224cd-trazo-de-huella-de-perro-azul.png'
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Formato de email invalido').required(required),
      password: Yup.string()
        .required(required)
        .min(8, 'ingresa 8 caracteres como mínimo')
        .matches(
          /[A-Z]/,
          'La contraseña debe contener al menos una letra mayúscula'
        )
        .matches(
          /[0-9]/,
          'La contraseña debe contener al menos un caracter numérico'
        ),
      password2: Yup.string()
        .oneOf(
          [Yup.ref('password'), undefined],
          'Las contraseñas deben coincidir'
        )
        .required(required),
      nombre: Yup.string().required(required),
      apellido: Yup.string().required(required),
      localidad: Yup.string().required(required),
      whatsApp: Yup.string().required(required),
      direccion: Yup.string()
        .matches(/\d/, 'Debe contener al menos un número')
        .required(required),
      hogar: Yup.string().required(required),
      barrio: Yup.string().required(required),
      ambientes: Yup.number().required(required),
      patio_jardin: Yup.boolean().required(required),
      mascotas: Yup.boolean().required(required),
      estado_domicilio: Yup.string().required(required)
    }),

    onSubmit: async (values) => {
      // console.log(values)
      try {
        const { data } = await clienteAxios.post('usuarios', values)
        Swal.fire({
          icon: 'success',
          title: `${data.msg}`,
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        })
        setTimeout(() => {
          navigate('/login')
        }, 3000)
        setTimeout(() => {
          Swal.close()
        }, 4000)
      } catch (error) {
        console.log(error.response.data.msg)
        Swal.fire({
          icon: 'error',
          title: `${error.response.data.msg}`,
          showConfirmButton: true,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        })
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    }
  })
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }
  const handleUpload = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', `${import.meta.env.VITE_UPLOAD_PRESET}`)

    const response = await fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    formik.setFieldValue('avatar', data.secure_url)
  }
  const mascota = formik.values.mascotas
  const { handleSubmit, handleChange, handleBlur, touched, errors } = formik
  return (
    <div className='flex flex-col items-center max-h-screen  overflow-y-auto bg-[#CCC4BB] pb-5'>
      <p className='text-6xl font-bold text-[#6F4C48] mb-10'>Usuario</p>
      {error && (
        <div className='flex flex-row-reverse w-full bg-white sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
          {error}
        </div>
      )}
      <form
        className='bg-[#C1A88D] px-20 pt-5 space-y-6 pb-10 rounded-3xl '
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}>
        <p className='pb-10 underline underline-offset-2 text-[#6F4C48] text-2xl font-medium'>
          {' '}
          Cree su cuenta de PetTransity
        </p>
        <div className='flex h-10 justify-evenly'>
          <input
            type='file'
            id='avatar'
            name='avatar'
            onChange={handleUpload}
            className='border-[#4F3300] justify-center rounded-2xl file:bg-[#E59D1C] truncate block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xl file:font-semibold file:text-white file:cursor-pointer'
          />
          <CloudinaryContext
            cloudName={`${import.meta.env.VITE_CLOUDINARY_NAME}`}>
            {formik.values?.avatar && (
              <Image publicId={formik.values.avatar} width='80' />
            )}
          </CloudinaryContext>
        </div>
        <InputForm
          label='Nombre'
          name='nombre'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.nombre}
          placeholder='Nombre'
          touched={touched}
          errors={errors}
          nameSrc={name}
          disabled={false}
        />
        <InputForm
          label='Apellido'
          name='apellido'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.apellido}
          placeholder='Apellido'
          touched={touched}
          errors={errors}
          nameSrc={name}
          disabled={false}
        />

        <InputForm
          label='Correo'
          name='email'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.email}
          placeholder='Correo'
          touched={touched}
          errors={errors}
          nameSrc={mail}
          disabled={false}
        />
        <div>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <div className='flex gap-1  my-3'>
                {' '}
                <img alt='' src={lock} />
                <label
                  htmlFor='password'
                  className='block text-sm font-semibold leading-6 text-gray-900'>
                  Contraseña <span className='text-red-600'>*</span>
                </label>
              </div>
              <div>
                <p>Ingresa 8 caracteres como mínimo</p>
                <p>La contraseña debe contener al menos una letra mayúscula</p>
                <p>La contraseña debe contener al menos un caracter numérico</p>
              </div>
            </div>
          </div>
          <div className='mt-2 relative'>
            <input
              id='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword ? 'text' : 'password'}
              placeholder='**********'
              className={`block w-[31.5rem] h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                touched.password && errors.password
                  ? 'ring-red-500  focus:ring-red-500'
                  : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
              } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-12`} // Añadido pr-12 (padding-right) para dejar espacio para el botón
            />
            <button
              onClick={togglePasswordVisibility}
              className='absolute right-3 top-1/4 transform -translate-y-2/4'>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
            {touched.password && errors.password && (
              <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
                {errors.password}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-1  my-3'>
              <img alt='icono de etiqueta reingrese contraseña' src={lock} />
              <label
                htmlFor='password2'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Reingrese contraseña <span className='text-red-600'>*</span>
              </label>
            </div>
          </div>
          <div className='mt-2'>
            <input
              id='password2'
              name='password2'
              onChange={handleChange}
              onBlur={handleBlur}
              type='password'
              placeholder='**********'
              // required
              className={`block w-[31.5rem] h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                touched.password2 && errors.password2
                  ? 'ring-red-500  focus:ring-red-500'
                  : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
              } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
            {touched.password2 && errors.password2 && (
              <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
                {errors.password2}
              </div>
            )}
          </div>
        </div>
        <InputForm
          label='Dirección'
          name='direccion'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.direccion}
          placeholder='Jeronimo Salguero 1253'
          touched={touched}
          errors={errors}
          nameSrc={name}
          disabled={false}
        />
        <div className='flex gap-5'>
          <InputForm
            label='Piso'
            name='piso'
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.piso}
            placeholder='Piso'
            touched={touched}
            errors={errors}
            type={'number'}
            nameSrc={name}
            disabled={false}
            required={false}
          />
          <InputForm
            label='Unidad'
            name='unidad'
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.unidad}
            placeholder='Unidad'
            touched={touched}
            errors={errors}
            type={'number'}
            nameSrc={name}
            disabled={false}
            required={false}
          />
        </div>

        <div className='flex gap-5 place-items-center'>
          <div className='w-full'>
            <div className='flex gap-1  my-2'>
              <img alt='icono de etiqueta provincia' src={name} />
              <label
                htmlFor='provincia'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Provincia <span className='text-red-600'>*</span>
              </label>
            </div>
            <div className=''>
              <select
                id='provincia'
                name='provincia'
                onChange={handleChange}
                onBlur={handleBlur}
                
                className={`block w-full h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  touched.provincia && errors.provincia
                    ? 'ring-red-500  focus:ring-red-500'
                    : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
                <option value='CABA'>Seleccione una provincia</option>
                <option value='CABA'>Buenos Aires</option>
                {/* Agrega más opciones según tus necesidades */}
              </select>
              {touched.provincia && errors.provincia && (
                <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm justify-end'>
                  {errors.provincia}
                </div>
              )}
            </div>
          </div>
          <InputForm
            label='Código Postal'
            name='codigoPostal'
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.codigoPostal}
            placeholder='Código Postal'
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={false}
          />
        </div>
        <InputForm
          label='Localidad'
          name='localidad'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.localidad}
          placeholder='CABA'
          touched={touched}
          errors={errors}
          nameSrc={name}
          disabled={false}
        />
        <div className='flex w-full gap-5'>
          <div className='w-1/2'>
            <div className='flex gap-1  my-3'>
              <img alt='icono de etiqueta comuna' src={name} />
              <label
                htmlFor='comuna'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Comuna <span className='text-red-600'>*</span>
              </label>
            </div>
            <div className='mt-2'>
              <select
                id='comuna'
                name='comuna'
                onChange={handleChange}
                onBlur={handleBlur}
                type='text'
                placeholder='Comuna'
                className={`block w-full h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  touched.comuna && errors.comuna
                    ? 'ring-red-500  focus:ring-red-500'
                    : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
                <option value=''>Selecciona una comuna</option>
                <option value='Comuna 1'>Comuna 1</option>
                <option value='Comuna 2'>Comuna 2</option>
                <option value='Comuna 3'>Comuna 3</option>
                <option value='Comuna 4'>Comuna 4</option>
                <option value='Comuna 5'>Comuna 5</option>
                <option value='Comuna 6'>Comuna 6</option>
                <option value='Comuna 7'>Comuna 7</option>
                <option value='Comuna 8'>Comuna 8</option>
                <option value='Comuna 9'>Comuna 9</option>
                <option value='Comuna 10'>Comuna 10</option>
                <option value='Comuna 11'>Comuna 11</option>
                <option value='Comuna 12'>Comuna 12</option>
                <option value='Comuna 13'>Comuna 13</option>
                <option value='Comuna 14'>Comuna 14</option>
                <option value='Comuna 15'>Comuna 15</option>
              </select>
              {touched.comuna && errors.comuna && (
                <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm justify-end'>
                  {errors.comuna}
                </div>
              )}
            </div>
          </div>
          <div className='w-1/2'>
            <div className='flex gap-1  my-3'>
              <img alt='icono de etiqueta barrio' src={name} />
              <label
                htmlFor='barrio'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Barrio <span className='text-red-600'>*</span>
              </label>
            </div>
            <div className='mt-2'>
              <select
                id='barrio'
                name='barrio'
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  touched.barrio && errors.barrio
                    ? 'ring-red-500  focus:ring-red-500'
                    : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
                <option value=''>Selecciona un barrio</option>
                <option value='Agronomía'>Agronomía</option>
                <option value='Almagro'>Almagro</option>
                <option value='Balvanera'>Balvanera</option>
                <option value='Barracas'>Barracas</option>
                <option value='Belgrano'>Belgrano</option>
                <option value='Boedo'>Boedo</option>
                <option value='Caballito'>Caballito</option>
                <option value='Chacarita'>Chacarita</option>
                <option value='Coghlan'>Coghlan</option>
                <option value='Colegiales'>Colegiales</option>
                <option value='Constitución'>Constitución</option>
                <option value='Flores'>Flores</option>
                <option value='Floresta'>Floresta</option>
                <option value='La Boca'>La Boca</option>
                <option value='La Paternal'>La Paternal</option>
                <option value='Liniers'>Liniers</option>
                <option value='Mataderos'>Mataderos</option>
                <option value='Montserrat'>Montserrat</option>
                <option value='Monte Castro'>Monte Castro</option>
                <option value='Nueva Pompeya'>Nueva Pompeya</option>
                <option value='Núñez'>Núñez</option>
                <option value='Palermo'>Palermo</option>
                <option value='Parque Avellaneda'>Parque Avellaneda</option>
                <option value='Parque Chacabuco'>Parque Chacabuco</option>
                <option value='Parque Chas'>Parque Chas</option>
                <option value='Parque Patricios'>Parque Patricios</option>
                <option value='Puerto Madero'>Puerto Madero</option>
                <option value='Recoleta'>Recoleta</option>
                <option value='Retiro'>Retiro</option>
                <option value='Saavedra'>Saavedra</option>
                <option value='San Cristóbal'>San Cristóbal</option>
                <option value='San Nicolás'>San Nicolás</option>
                <option value='San Telmo'>San Telmo</option>
                <option value='Vélez Sarsfield'>Vélez Sarsfield</option>
                <option value='Versalles'>Versalles</option>
                <option value='Villa Crespo'>Villa Crespo</option>
                <option value='Villa del Parque'>Villa del Parque</option>
                <option value='Villa Devoto'>Villa Devoto</option>
                <option value='Villa Gral. Mitre'>Villa Gral. Mitre</option>
                <option value='Villa Lugano'>Villa Lugano</option>
                <option value='Villa Luro'>Villa Luro</option>
                <option value='Villa Ortúzar'>Villa Ortúzar</option>
                <option value='Villa Pueyrredón'>Villa Pueyrredón</option>
                <option value='Villa Real'>Villa Real</option>
                <option value='Villa Riachuelo'>Villa Riachuelo</option>
                <option value='Villa Santa Rita'>Villa Santa Rita</option>
                <option value='Villa Soldati'>Villa Soldati</option>
                <option value='Villa Urquiza'>Villa Urquiza</option>
              </select>
              {touched.barrio && errors.barrio && (
                <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm justify-end'>
                  {errors.barrio}
                </div>
              )}
            </div>
          </div>
        </div>
        <InputForm
          label='WhatsApp'
          name='whatsApp'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.whatsApp}
          placeholder='WhatsApp'
          touched={touched}
          errors={errors}
          nameSrc={name}
          disabled={false}
        />
        <div className='flex gap-5'>
          <InputForm
            label='Tipo de hogar'
            name='hogar'
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.hogar}
            placeholder='Depto, Casa, etc'
            touched={touched}
            errors={errors}
            nameSrc={name}
            disabled={false}
          />
          <InputForm
            label='Cantidad de ambientes'
            name='ambientes'
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={formik.values.ambientes}
            placeholder='Cantidad de ambientes'
            touched={touched}
            errors={errors}
            nameSrc={name}
            type={'number'}
            disabled={false}
          />
        </div>
        <InputForm
          label='Estado del domicilio'
          name='estado_domicilio'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.estado_domicilio}
          placeholder='Ejemplo: Bueno'
          touched={touched}
          errors={errors}
          nameSrc={name}
          disabled={false}
        />

        <div className='w-full flex justify-between '>
          <div>
            <div className='flex gap-1 w-1/2 my-3'>
              <img alt='' src={name} />
              <label
                htmlFor='patio_jardin'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                ¿Posee patio/jardín? <span className='text-red-600'>*</span>
              </label>
            </div>
            <div className='mt-2 w-1/2'>
              <select
                name='patio_jardin'
                id='patio_jardin'
                onChange={handleChange}
                onBlur={handleBlur}
                // required
                className={` rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  touched.patio_jardin && errors.patio_jardin
                    ? 'ring-red-500  focus:ring-red-500'
                    : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
                <option></option>
                <option value={true}>Sí</option>
                <option value={false}>No</option>
              </select>
              {touched.patio_jardin && errors.patio_jardin && (
                <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
                  {errors.patio_jardin}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className='flex gap-1 w-1/2  my-3'>
              <img alt='' src={name} />
              <label
                htmlFor='mascotas'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                ¿Posee mascotas? <span className='text-red-600'>*</span>
              </label>
            </div>
            <div className='mt-2 w-1/2'>
              <select
                name='mascotas'
                id='mascotas'
                onChange={handleChange}
                onBlur={handleBlur}
                // required
                className={` rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  touched.mascotas && errors.mascotas
                    ? 'ring-red-500  focus:ring-red-500'
                    : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
                <option></option>
                <option value={true}>Sí</option>
                <option value={false}>No</option>
              </select>
              {touched.mascotas && errors.mascotas && (
                <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
                  {errors.mascotas}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`${mascota === 'true' ? 'visible' : 'hidden'}`}>
          <div className='flex gap-1  my-3'>
            <img alt='' src={name} />
            <label
              htmlFor='desc_mascotas'
              className='block text-sm font-semibold leading-6 text-gray-900'>
              Descripción de su mascota
            </label>
          </div>
          <div className='mt-2'>
            <input
              id='desc_mascotas'
              name='desc_mascotas'
              onChange={handleChange}
              onBlur={handleBlur}
              type='text'
              placeholder='Ejemplo: su personalidad'
              className={`block w-[31.5rem] h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                touched.desc_mascotas && errors.desc_mascotas
                  ? 'ring-red-500  focus:ring-red-500'
                  : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
              } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
            {touched.desc_mascotas && errors.desc_mascotas && (
              <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
                {errors.desc_mascotas}
              </div>
            )}
          </div>
        </div>

        <div className='w-[31.5rem] flex justify-end items-center pt-10'>
          <button
            type='submit'
            className='flex mt-4 w-56 h-14 text-center items-center  border-2 border-[#4F3300] justify-center rounded-2xl bg-[#E59D1C] px-3 py-1.5 text-sm lg:text-2xl font-semibold leading-6 text-[#4F3300]  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            Registrarse
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
