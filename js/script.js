window.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.usersForm
    const url = 'https://jsonplaceholder.typicode.com/users'
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const {name, email} = form.elements

        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
        xhr.onerror = () => setInfoMessage(form, 'Извините, возникла непредвиденная ошибка. Попробуйте ещё раз.', 'error')
        xhr.onload = () => setInfoMessage(form, 'Ваша заявка успешно отправлена!', 'success')

        xhr.send(JSON.stringify({name: name.value, email: email.value}))
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