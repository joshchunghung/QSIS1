export const errorHint = (text) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text
    })
}

export const infoHint = (title, text) => {
    Swal.fire({
        icon: 'info',
        title: title,
        text: text
    })
}

export const successHint = (title, text) => {
    Swal.fire({
        icon: 'success',
        title: title,
        text: text
    })
}
