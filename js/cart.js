let elemSectionCart = document.getElementsByClassName('section-cart')[0]

function initCarrito() {
    var btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]
    console.log(btnCarrito)
    btnCarrito.addEventListener('click',  e => {
        e.preventDefault()
        elemSectionCart.classList.toggle('section-cart--open')
    })
}

initCarrito()