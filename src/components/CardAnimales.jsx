import { Link } from 'react-router-dom'
import coco from '../assets/coco.svg'
import huellaBlack from '../assets/huellaBlack.svg'

const CardAnimales = () => {
  return (
    <div className=' flex flex-col items-center  rounded-2xl w-48 h-80 bg-[#6F4C48] gap-2 mt-8 ml-8'>
      <img src={coco} width={161} height={91} className='mt-5 bg-inherit' />
      <div className='bg-[#B89C7C] w-36 h-6 rounded text-center font-bold -mt-3'>
        COCO
      </div>
      <div className='w-44 h-28 flex flex-wrap gap-2  '>
        <div className='text-[10px] text-white'>
          Especie:
          <br /> <span className='text-white font-bold text-base'>
            Canino
          </span>{' '}
        </div>
        <div className='text-[10px] text-white'>
          Edad:
          <br /> <span className='text-white font-bold text-base'>
            1 año
          </span>{' '}
        </div>
        <div className='text-[10px] text-white'>
          Peso:
          <br /> <span className='text-white font-bold text-base'>
            7 kg
          </span>{' '}
        </div>
        <div className='text-[10px] text-white'>
          Tamaño:
          <br /> <span className='text-white font-bold text-base'>
            Pequeño
          </span>{' '}
        </div>{' '}
        <div className='text-[10px] text-white'>
          Ingreso:
          <br />{' '}
          <span className='text-white font-bold text-base'>
            22/01/2023
          </span>{' '}
        </div>
        <div className='text-[10px] text-white'>
          Egreso:
          <br />{' '}
          <span className='text-white font-bold text-base'>
            17/02/2023
          </span>{' '}
        </div>
        <div className='w-full flex justify-center '>
          <Link
            className='flex gap-2 sm:flex sm:gap-4 items-center justify-center  w-24 h-6 bg-[#E59D1C] rounded-lg text-black font-bold text-xs'
            href='#'>
            <img
              className=''
              width={12}
              height={12}
              alt='huella'
              src={huellaBlack}
            />
            Ver más
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardAnimales
