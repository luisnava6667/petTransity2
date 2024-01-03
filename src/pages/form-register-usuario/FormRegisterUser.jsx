import Form from './components/Form'
import flecha from '../../assets/flechaNav.svg'
import NavBarLogin from '../../components/NavBarLogin'

const FormRegisterUser = () => {
  return (
    <main className='h-screen grid' >
      <NavBarLogin
        imgButton={flecha}
        textButtonNav={'Volver'}
        styles={
          'flex rounded-md bg-[#E59D1C] px-5 py-2.5 text-3xl justify-around font-medium text-black transition w-44 h-14 shadow-md'
        }
        ruta={'/'}
      />
      <Form />
    </main>
  )
}

export default FormRegisterUser
