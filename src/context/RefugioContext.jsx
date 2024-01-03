/* eslint-disable react/prop-types */

import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const RefugioContext = createContext()

const RefugioProvider = ({ children }) => {
  const [refugios, setRefugios] = useState([])
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  useEffect(() => {
    const getRefugios = async () => {
      if (role === 'usuarios') {
        try {
          const { data } = await clienteAxios.get('/refugio/all')
          setRefugios(data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getRefugios()
  }, [role])
  const eliminarAnimal = async (id) => {
    try {
      Swal.fire({
        icon: 'warning',
        title: 'Estas seguro que deseas eliminar el registo',
        text: 'No podras revertir esta accion',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Estado cambiado Correctamente',
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading()
            }
          })
          await clienteAxios.delete(`animales/myPet/${id}`, config)
          setTimeout(() => {
            Swal.close()
            navigate('/animales')
          }, 2000)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  const nuevoAnimal = async (values) => {
    if (!token) return
    try {
      if (role === 'refugio') {
        await clienteAxios.post('/animales', values, config)
      } else {
        await clienteAxios.post('/animales/user', values, config)
      }
      Swal.fire({
        icon: 'success',
        title: 'Animal Registrado Correctamente',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      })
      setTimeout(() => {
        if (role === 'refugio') {
          navigate('/animales')
        } else {
          navigate('/dashboard')
        }
      }, 3000)
      setTimeout(() => {
        Swal.close()
      }, 4000)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }
  const editarAnimal = async (values) => {
    if (!token) return
    try {
      await clienteAxios.put(`animales/myPet/${values._id}`, values, config)
      Swal.fire({
        icon: 'success',
        title: 'Animal Editado Correctamente',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      })
      setTimeout(() => {
        navigate('/animales')
      }, 3000)
      setTimeout(() => {
        Swal.close()
      }, 4000)
    } catch (error) {
      console.log(error)
    }
  }
  const submitAnimal = async (animal) => {
    if (animal._id) {
      await editarAnimal(animal)
    } else {
      await nuevoAnimal(animal)
    }
  }
  const changeState = async (id) => {
    // if (!id) return
    try {
      Swal.fire({
        icon: 'warning',
        title: 'Estas Seguro de cambiar el estado del animal?',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Estado cambiado Correctamente',
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading()
            }
          })
          await clienteAxios.put(`animales/state/${id}`, config)
          setTimeout(() => {
            Swal.close()
          }, 4000)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  const asignedUser = async (user, id) => {
    // console.log(id);
    if (!token) return
    try {
      await clienteAxios.post(`animales/asigned/${id}`, user, config)
      Swal.fire({
        icon: 'success',
        title: 'Usuario Asignado Correctamente',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      })
      setTimeout(() => {
        navigate('/animales')
      }, 3000)
      setTimeout(() => {
        Swal.close()
      }, 4000)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <RefugioContext.Provider
      value={{
        refugios,
        submitAnimal,
        eliminarAnimal,
        editarAnimal,
        nuevoAnimal,
        changeState,
        asignedUser
      }}>
      {children}
    </RefugioContext.Provider>
  )
}

export { RefugioProvider }
export default RefugioContext
