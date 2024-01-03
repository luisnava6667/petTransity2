import Swal from 'sweetalert2'

export const config = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})
export const swalSucces = (icon, title) =>
  Swal.fire({
    icon: icon,
    title: title,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading()
    }
  })
export const swalError = (icon, title) =>
  Swal.fire({
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500
  })
export const swalClose = () => {
    setTimeout(() => {
      Swal.close()
    }, 4000)
}
