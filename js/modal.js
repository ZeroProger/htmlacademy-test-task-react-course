window.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.querySelector('[data-modal-open]')
    const closeBtn = document.querySelector('[data-modal-close]')
    const modal = document.querySelector('[data-modal]')
    const shadow = document.createElement('div')
    let isOpen = false;

    shadow.classList.add('modal__shadow')
    document.body.appendChild(shadow)

    openBtn?.addEventListener('click', (e) => {
        e.preventDefault()
        isOpen = true
        openModal(modal, shadow)
    })

    closeBtn?.addEventListener('click', (e) => {
        e.preventDefault()
        isOpen = false
        closeModal(modal, shadow)
    })

    window.addEventListener('keydown',  (e) => {
        if (e.which === 27 && isOpen === true) {
            e.preventDefault();
            closeModal(modal, shadow)
        }
    })
})

const closeModal = (modal, shadow) => {
    modal.classList.remove('modal--active')
    shadow.classList.remove('modal__shadow--show')
}

const openModal = (modal, shadow) => {
    modal.classList.add('modal--active')
    shadow.classList.add('modal__shadow--show')
}