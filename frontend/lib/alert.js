import Swal from "sweetalert2/dist/sweetalert2.all.min.js"

export const isAlert = (type, title, text) => {
  Swal.fire({
    icon: type,
    title,
    text,
    timer: 3000,
  })
}

export const isConfirm = (type, title, text, callback) => {
  Swal.fire({
    icon: type,
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.value) {
      callback()
    }
  })
}

export const isLoading = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "info",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  })
}
