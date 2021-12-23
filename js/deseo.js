let elemSectionDeseo = document.getElementsByClassName('section-deseo')[0]

function initDeseo() {
    var btnCarrito = document.getElementsByClassName('search-bar__deseo-container')[0]
    // console.log(btnCarrito)
    btnCarrito.addEventListener('click',  e => {
        e.preventDefault()
        elemSectionDeseo.classList.toggle('section-deseo--open')
    })
}

initDeseo()