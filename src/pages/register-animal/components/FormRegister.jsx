import { useFormik } from 'formik'
import * as Yup from 'yup'
import name from '../../../assets/name.svg'
import spinner from '../../../assets/spinner.svg'
import useRefugio from '../../../hooks/useRefugio'
import InputForm from '../../../components/InputForm'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { useState } from 'react'

const FormRegister = () => {
  const { submitAnimal } = useRefugio()
  const [textVisibility, setTextVisibility] = useState('flex')
  const [spinnerVisibility, setSpinnerVisibility] = useState('hidden')
  const required = 'Este campo es requerido'

  const formik = useFormik({
    initialValues: {
      especie: '',
      raza: '',
      nombre: '',
      edad: '',
      peso: '',
      tamaño: '',
      personalidad: '',
      salud: '',
      fecha_ingreso: '',
      estado: '',
      avatar:
        'https://images.vexels.com/media/users/3/201898/isolated/preview/55be9a1a39abff39bc3596e8ddd224cd-trazo-de-huella-de-perro-azul.png',
      observaciones: ''
    },
    validationSchema: Yup.object({
      edad: Yup.number().required(required),
      tamaño: Yup.string().required(required),
      nombre: Yup.string().required(required),
      especie: Yup.string().required(required),
      avatar: Yup.string().required(required),
      peso: Yup.number().required(required),
      raza: Yup.string().required(required),
      salud: Yup.string()
        .max(100, 'El campo no debe tener más de 100 caracteres')
        .required('salud requerida'),
      fecha_ingreso: Yup.date().required(required),
      estado: Yup.boolean().required(required),
      observaciones: Yup.string().max(
        100,
        'El campo no debe tener más de 100 caracteres'
      )
    }),
    onSubmit: async (values) => {
      setTextVisibility('hidden')
      setSpinnerVisibility('flex')
      submitAnimal(values)
      setTextVisibility('flex')
      setSpinnerVisibility('hidden')
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
  const { handleSubmit, handleChange, handleBlur, touched, errors } = formik

  return (
    <div className='flex flex-col items-center   overflow-y-auto '>
      <p className='text-xl hidden md:flex md:text-3xl lg:text-5xl font-bold text-[#6F4C48] md:my-5 lg:my-8 '>
        Añadir animal
      </p>
      <form
        className='bg-[#C1A88D] mt-4 md:mt-0 px-8 mb-4 md:px-8 lg:px-20 md:pt-3 lg:pt-5 space-y-6 md:pb-8 md:mb-8 lg:pb-10 lg:mb-10 rounded-3xl '
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}>
        <p className='hidden md:flex lg:pb-10 underline underline-offset-2 text-[#6F4C48] text-2xl font-medium'>
          {' '}
          Información del animal
        </p>
        <p className='text-center md:hidden underline underline-offset-2 text-[#6F4C48] text-2xl font-medium'>
          {' '}
          Añadir animal
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
        />
        <InputForm
          label='Especie'
          name='especie'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.especie}
          placeholder='Especie'
          touched={touched}
          errors={errors}
          nameSrc={name}
        />
        <InputForm
          label='Raza'
          name='raza'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.raza}
          placeholder='Raza'
          touched={touched}
          errors={errors}
          nameSrc={name}
        />
        <InputForm
          label='Peso'
          name='peso'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.peso}
          placeholder='Peso'
          type={'number'}
          touched={touched}
          errors={errors}
          nameSrc={name}
        />
        <InputForm
          label='Edad'
          name='edad'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.edad}
          placeholder='Edad'
          type={'number'}
          touched={touched}
          errors={errors}
          nameSrc={name}
        />
        <div className='w-full'>
          <div className='flex gap-1  my-3'>
            <img alt='icono de etiqueta tamaño' src={name} />
            <label
              htmlFor='tamaño'
              className='block text-sm font-semibold leading-6 text-gray-900'>
              Tamaño <span className='text-red-600'>*</span>
            </label>
          </div>
          <div className='mt-2'>
            <select
              id='tamaño'
              name='tamaño'
              onChange={handleChange}
              onBlur={handleBlur}
              type='text'
              value={formik.values.tamaño}
              placeholder='Tamaño'
              className={`block w-full h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                touched.tamaño && errors.tamaño
                  ? 'ring-red-500  focus:ring-red-500'
                  : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
              } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
              <option value='' disabled>
                Selecciona el tamaño
              </option>
              <option value='Chico'>Chico</option>
              <option value='Mediano'>Mediano</option>
              <option value='Grande'>Grande</option>
            </select>
            {touched.tamaño && errors.tamaño && (
              <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm justify-end'>
                {errors.tamaño}
              </div>
            )}
          </div>
        </div>
        <InputForm
          label='Personalidad'
          name='personalidad'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.personalidad}
          placeholder='Personalidad'
          touched={touched}
          errors={errors}
          nameSrc={name}
        />
        <div className='flex gap-6'>
          <div>
            <div className='flex gap-1  my-3'>
              <img alt='icono de etiqueta fecha_ingreso' src={name} />
              <label
                htmlFor='fecha_ingreso'
                className='block text-sm font-semibold leading-6 text-gray-900'>
                Fecha de ingreso <span className='text-red-600'>*</span>
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='fecha_ingreso'
                name='fecha_ingreso'
                onChange={handleChange}
                onBlur={handleBlur}
                type='date'
                required
                placeholder='Fecha de fecha_ingreso'
                className={`block md:w-[28rem] md:h-11 lg:w-[31.5rem] lg:h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  touched.fecha_ingreso && errors.fecha_ingreso
                    ? 'ring-red-500  focus:ring-red-500'
                    : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
                } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
              {touched.fecha_ingreso && errors.fecha_ingreso && (
                <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
                  {errors.fecha_ingreso}
                </div>
              )}
            </div>
          </div>
        </div>
        <InputForm
          label='Estado de salud'
          name='salud'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.salud}
          placeholder='Estado de salud'
          touched={touched}
          errors={errors}
          nameSrc={name}
        />
        <InputForm
          label='Observaciones'
          name='observaciones'
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={formik.values.observaciones}
          placeholder='Observaciones'
          touched={touched}
          errors={errors}
          nameSrc={name}
        />
        <div>
          <div className='flex gap-1  my-3'>
            <img alt='' src={name} />
            <label
              htmlFor='estado'
              className='block text-sm font-semibold leading-6 text-gray-900'>
              Estado <span className='text-red-600'>*</span>
            </label>
          </div>
          <div className='mt-2'>
            <select
              name='estado'
              id='estado'
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={` rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                touched.estado && errors.estado
                  ? 'ring-red-500  focus:ring-red-500'
                  : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
              } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
              <option></option>
              <option value={true}>Disponible</option>
              <option value={false}>No disponible</option>
            </select>
            {touched.estado && errors.estado && (
              <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm justify-end'>
                {errors.estado}
              </div>
            )}
          </div>
        </div>
        <div className='md:w-[28rem]  lg:w-[31.5rem]  flex justify-end items-center lg:pt-10'>
          <button
            type='submit'
            className='flex mb-4 mt-4 md:w-48 font-bold lg:w-56 md:h-12 lg:h-14 text-center items-center  border-2 border-[#4F3300] justify-center rounded-2xl bg-[#E59D1C] px-3 py-1.5 text-sm lg:text-2xl  leading-6 text-[#4F3300]  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 '>
            <img className={`${spinnerVisibility}`} src={spinner} />

            <p className={`${textVisibility}`}>Registrar</p>
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormRegister
