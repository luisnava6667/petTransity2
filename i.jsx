// ! Todo: mostrar ubicaciones en el mapa

/*  <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full bg-[#CCC4BB]">
        <TopBar />
        <div className="gap-5  w-full xl:px-28 my-5">
          <h3 className="text-center text-2xl md:text-5xl p-5 font-bold text-[#503734]">
            {}
            {auth.nombre} {auth.apellido}
          </h3>
          <div className="bg-white rounded-lg p-5 mx-5 md:flex grid  justify-items-center md:justify-evenly">
            <img
              src={auth.img}
              alt={auth.nombre}
              className="rounded-lg h-44 mb-5 md:mb-0"
            />
            <div>
              <p>Email: {auth.email}</p>
              <p>{auth.telefono}</p>
              <p>
                Direccion: {auth.direccion}, CP: {auth.codigoPostal},{" "}
                {auth.localidad}, {auth.provincia.toUpperCase()}, Buenos Aires,
                Argentina
              </p>
              <p>Hogar: {auth.hogar}</p>
              {auth.mascotas ? (
                <div>
                  <p>Mascotas: Posee Animales</p>
                  <p>Decripcion de mascotas : {auth.desc_mascotas}</p>
                </div>
              ) : (
                <div>
                  <p>Mascotas: No Posees Animales</p>
                </div>
              )}
              <div className="flex gap-5 mt-5">
                <Link
                  to={`/editar/${auth._id}`}
                  className="w-1/2 bg-[#FFB800] rounded-lg mx-5 text-white font-bold text-xl p-2 text-center "
                >
                  Editar
                </Link>
                <Link
                  to={``}
                  className="w-1/2  bg-red-800 rounded-lg mx-5 text-white font-bold text-xl p-2 text-center cursor-not-allowed"
                >
                  Eliminar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */

/* 

{
  error && (
    <div className='flex flex-row-reverse w-full bg-white sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
      {error}
    </div>
  )
}
;<div>
  <div className='flex gap-1  my-3'>
    <img alt='icono de etiqueta codigo postal' src={name} />
    <label
      htmlFor='codigoPostal'
      className='block text-sm font-semibold leading-6 text-gray-900'>
      Código Postal <span className='text-red-600'>*</span>
    </label>
  </div>
  <div className='mt-2'>
    <input
      id='codigoPostal'
      name='codigoPostal'
      onChange={handleChange}
      onBlur={handleBlur}
      type='text'
      required
      placeholder={codigoPostal}
      disabled={estadoInput}
      className={`block w-36 h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-white ${
        touched.codigoPostal && errors.codigoPostal
          ? 'ring-red-500  focus:ring-red-500'
          : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
      } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
    />
    {touched.codigoPostal && errors.codigoPostal && (
      <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
        {errors.codigoPostal}
      </div>
    )}
  </div>
</div> */
