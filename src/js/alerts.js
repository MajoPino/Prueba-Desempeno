//Import Sweetalert
import Swal from 'sweetalert2'

export function smallAlert(message) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: message
      });
}

export function errorAlert(message) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
}
