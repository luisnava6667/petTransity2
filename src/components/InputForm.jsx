/* eslint-disable react/prop-types */

const InputForm = ({
  type,
  label,
  name,
  nameSrc,
  handleChange,
  handleBlur,
  value,
  placeholder,
  touched,
  errors,
  disabled = true,
  width = 'full',
  required = true
}) => {
  return (
    <div className={`w-${width}`}>
      <div className='flex gap-1 my-1'>
        <img alt={`icono de etiqueta ${label}`} src={nameSrc} />
        <label
          htmlFor={name}
          className='block text-sm font-semibold leading-6 text-gray-900'>
          {label} <span className='text-red-600'>{required && '*'}</span>
        </label>
      </div>
      <div className='mt-2 w-full'>
        <input
          id={name}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          type={type || 'text'}
          disabled={disabled}
          min={type === 'number' ? 0 : null}
          placeholder={placeholder}
          className={`block w-${width} md:h-11  lg:h-12 p-2 rounded-2xl py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
            touched[name] && errors[name]
              ? 'ring-red-500  focus:ring-red-500'
              : 'ring-gray-300 placeholder-text-gray-400 focus:ring-indigo-600'
          } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        />
      </div>
      {touched[name] && errors[name] && (
        <div className='flex flex-row-reverse w-[11.5rem] sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
          {errors[name]}
        </div>
      )}
    </div>
  )
}

export default InputForm
