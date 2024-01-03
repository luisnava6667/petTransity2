// import CardGrandeDashboard from "../../components/CardGrandeDashboard";
import { useEffect } from 'react'
import CardInfoAnimales from '../../components/CardInfoAnimales'
import CardUsuarioDashboard from '../../components/CardUsuarioDashboard'
// import InformacionCasaDashboard from "../../components/InformacionCasaDashboard";
import Sidebar from '../../components/Sidebar'
import Spinner from '../../components/Spinner'
import TopBar from '../../components/TopBar'
import useAuth from '../../hooks/useAuth'

const Dashboard = () => {
  const { cargando } = useAuth()
  
  useEffect(() => {
    document.title = 'Dashboard'
  }, [])
  return cargando ? (
    <div className='h-screen bg-[#CCC4BB] flex items-center justify-center'>
      <Spinner />
    </div>
  ) : (
    <div className='h-screen bg-[#CCC4BB] flex'>
      <Sidebar />
      <div className='grid w-full gap-4 '>
        <TopBar />
        <div className='overflow-auto mx-5'>
          <div className='flex flex-col sm:flex-row items-center sm:items-end sm:gap-5 justify-center '>
            <CardUsuarioDashboard />
            {/* <InformacionCasaDashboard /> */}
            <CardInfoAnimales />
          </div>
          {/* <CardGrandeDashboard /> */}
        </div>
        )
      </div>
    </div>
  )
}

export default Dashboard
