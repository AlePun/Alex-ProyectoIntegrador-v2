function initInicio() {
    
    const URL = 'https://61b8d2ed38f69a0017ce5d95.mockapi.io/productos/'
    const elemCardsContainer = document.getElementsByClassName('cards-container')[0]
    
    /* GET */
    async function getPost(id) {
        try {
            return await (await fetch(URL+(id||''), { method : 'get'})).json()
        }
        catch(error) {
            console.error('GET ERROR', error)
        }
    }
    
    function Card(id, imagen, titulo, descripcion, evaluacion, evaluadores, precioLista, precioDto, observacion01, observacion02, observacion03) {
        
        this.id = id
        this.imagen = imagen
        this.titulo = titulo
        this.descripcion = descripcion
        this.evaluacion = evaluacion // adicionado en mockAPI.io
        this.evaluadores = evaluadores
        this.precioLista = precioLista
        this.precioDto = precioDto
        this.observacion01 = observacion01
        this.observacion02 = observacion02
        this.observacion03 = observacion03

        var that = this

        this.appendTo = function (destinationElement) {
            
            var newCard = document.createElement('a')
            newCard.classList.add('card')
            
            newCard.addEventListener('click', function (ev) {
                ev.preventDefault()
                this.classList.toggle('card--selected')
                //elemSectionCart.innerHTML += `<div class="cart__item">${that.titulo},${that.id}</div>`
                //elemSectionDeseo.innerHTML += `<div class="cart__item">${that.titulo},${that.id}</div>`
            }) 

            // var compraProducto = document.querySelector ('.card__barra-producto__comprar')
            // compraProducto.addEventListener('click', function (ev) {
            //     ev.preventDefault()
            //     elemSectionCart.innerHTML += `<div class="cart__item">${that.titulo},${that.id}</div>`
            // })

            // var deseosProducto = document.querySelector ('card__barra-producto__deseos')
            // deseosProducto.addEventListener('click', function (ev) {
            //     ev.preventDefault()
            //     elemSectionDeseo.innerHTML += `<div class="cart__item">${that.titulo},${that.id}</div>`
            // })

                newCard.innerHTML = 
                `
                    <article class="card__article" data-id=${that.id} data-titulo=${that.titulo}>

                    <div class="card__image"
                            style="background-image: url('${this.imagen}')">
                    </div>

<!-- -----------------------------------------  -->
                    <!-- Barra producto - visible en hover -->
                    <div class="card__barra-producto">
                        <!-- Adicionar acción para ver más info sobre el el producto -->
                        <div class="card__barra-producto__mas-info">
                            <i class="fa fa-info"></i>
                        </div>
                        <!-- Adicionar acción para sumar a lista de deseos -->
                        <div class="card__barra-producto__deseos">
                            <i class="fa fa-heart"></i>
                        </div>
                        <!-- sumar al carrito -->
                        <div class="card__barra-producto__comprar">
                            <i class="fa fa-cart-plus"></i>
                        </div>
                        
                    </div>
                    <!-- Fin barra producto - visible en hover -->
<!-- -----------------------------------------  -->
                    <div class="card__content">
                        <div class="card__inner-content">
                            <h3 class="card__heading">${this.titulo}</h3>
                            <div class="card__description">
                            <p>${this.descripcion.slice(0,90)+(this.descripcion.length>90?" ...":"")}</p>
                            </div>
                            <div class="card__content-value card__content-value_${this.evaluacion>"5"?"5":this.evaluacion}"> con ${this.evaluadores} eval. </div>
                            <div class="card__content-price">
                                <span class="card__content-price-reg">${this.precioLista}</span>
                                <span class="card__content-price-disc">${this.precioDto}</span>
                            </div>
                            <div class="card__content-atributo">
                                <span>${this.observacion01}</span>
                                <span>${this.observacion02}</span>
                                <span>${this.observacion03}</span>
                            </div>
                        </div>
                    </div>
                    </article>
                `
                console.log(newCard)
            destinationElement.appendChild(newCard)

        }
    }
        
    

async function cargarEventos(){
    let arrayElementos = await getPost()
    
    var compraProducto = document.querySelector('.card__barra-producto__comprar')

    
    for (var elemCard of arrayElementos) {
        console.log(compraProducto)
        compraProducto.addEventListener('click', function (ev) {
            // ev.preventDefault()
            // let dataId = parseInt(ev.target.dataId)
            // let dataTitle = parse(ev.target.dataTitle)
            console.log('Hola ',parseInt(ev.target.dataset.dataId))
            // elemSectionCart.innerHTML += `<div class="cart__item">${dataTitle},${dataId}</div>`
        })
        
        var deseosProducto = document.querySelector ('.card__barra-producto__deseos')
        deseosProducto.addEventListener('click', function (ev) {
            ev.preventDefault()
            let dataId = parseInt(ev.target.dataset.id)
            let dataTitle = parseInt(ev.target.dataset.title)
            elemSectionDeseo.innerHTML += `<div class="cart__item">${dataTitle},${dataId}</div>`
        })
    }
}

    async function cargarProductos() {
        let arrayElementos = await getPost()
        
        for (var card of arrayElementos) {
            new Card(
                card.id, 
                card.imagen, 
                card.titulo, 
                card.descripcion, 
                card.evaluacion, 
                card.evaluadores, 
                card.precioLista, 
                card.precioDto, 
                card.observacion01, 
                card.observacion02, 
                card.observacion03
                ).appendTo(elemCardsContainer)
        }
    }
    cargarProductos()
    cargarEventos()
}