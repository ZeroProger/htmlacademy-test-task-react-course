window.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.usersForm
    const url = 'https://jsonplaceholder.typicode.com/users'
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const {name, email} = form.elements

        const isValid = checkEmptyFields(name.value, email.value)

        if (isValid) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true)
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            xhr.onerror = () => setInfoMessage(form, 'Извините, возникла непредвиденная ошибка. Попробуйте ещё раз.', 'error')
            xhr.onload = () => setInfoMessage(form, 'Ваша заявка успешно отправлена!', 'success')

            xhr.send(JSON.stringify({name: name.value, email: email.value}))
        }
    })
})

const setInfoMessage = (form, message, type) => {
    let messageElem = document.querySelector('.info-message')

    if (messageElem) {
        messageElem.className = ''
        messageElem.classList.add('info-message', `info-message--${type}`)
        messageElem.innerText = message
    } else {
        messageElem = document.createElement('div')
        messageElem.classList.add('info-message', `info-message--${type}`)
        messageElem.innerText = message

        const modalFooter = form.querySelector('.modal__footer')
        modalFooter.appendChild(messageElem)
    }
}

const checkEmptyFields = (...args) => {
    const modalBody = document.querySelector('.modal__body')
    const modalFooter = document.querySelector('.modal__footer')
    const formFieldError = document.querySelector('.form-field--error')

    for (let i = 0; i < args.length; i++) {
        if (args[i].length <= 0) {
            const infoMessages = document.querySelectorAll('.info-message')
            infoMessages.forEach((message) => modalFooter.removeChild(message))

            if (!formFieldError) {
                const error = document.createElement('div')
                error.classList.add('info-message', 'info-message--error', 'form-field--error')
                error.innerText = 'Пожалуйста, заполните все поля формы.'
                modalBody.appendChild(error)
            }
            return false
        }
    }

    if (formFieldError)
        modalBody.removeChild(formFieldError)

    return true
}