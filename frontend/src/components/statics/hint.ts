export const errorHint = (text) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text
    })
}
