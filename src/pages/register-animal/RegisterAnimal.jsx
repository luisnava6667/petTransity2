import { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import FormAnimales from '../../components/FormAnimales'

const RegisterAnimal = () => {
  useEffect(() => {
    document.title = 'Agregar Animal'
  }, [])
  return (
    <main className='h-screen bg-[#CCC4BB] flex'>
      <Sidebar />
      <div className='flex flex-col w-full h-full'>
        <div className=''>
          <TopBar />
        </div>
        
        <h3 className='text-center text-2xl md:text-5xl p-5 font-bold text-[#503734]'>
          Agregar Animal
        </h3>
        <div className='grid justify-items-center overflow-auto'>
          <FormAnimales />
        </div>
      </div>
    </main>
  )
}

export default RegisterAnimal
