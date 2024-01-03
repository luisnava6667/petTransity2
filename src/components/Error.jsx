const Error = ({ error }) => {
  return (
    <div className='flex flex-row-reverse w-full bg-white sm:w-[13.5rem] mt-5 text-red-500 text-xs sm:text-sm'>
      {error}
    </div>
  )
}

export default Error
