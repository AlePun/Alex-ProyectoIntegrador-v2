class Http {

    /* GET */
    async get(url, id) {
        // console.log( 'Entro por get, con url / Id: ', url, (id || ''))
        try {
            return await fetch(url + (id || ''), { method: 'get' }).then(r => r.json())
        }
        catch (error) {
            console.error('ERROR GET', error)
        }
    }
    
    async buscar(url, categoria) {
        console.log( 'Entro por buscar, con url y categoría: ', url, (categoria || ''))
        try {
            // console.log('entro en el try')
            var retorno =  await fetch(url + (categoria|| 'Sonido'), { method: 'get' }).then(r => r.json())
            console.log(retorno)
            return retorno
        }
        catch (error) {
            console.error('ERROR GET', error)
        }
    }


    /* Filter */
    // async find(url, id, categoria, textoFiltrado) {
    async find(url, categoria) {
        console.log( categoria, ' ', textoFiltrado)
        console.log({url, categoria, textoFiltrado})

        try {
            return await fetch(url, {categoria, textoFiltrado}, { method: 'get' }).then(r => r.json())
        }
        catch (error) {
            console.error('ERROR FILTER', error)
        }
    }

    /* POST */
    async post(url, dato) {
        try {
            return await fetch(url, {
                method: 'post',
                body: JSON.stringify(dato),
                headers: { 'content-type': 'application/json' }

            }).then(r => r.json())
        }
        catch (error) {
            console.error('ERROR POST', error)
        }
    }

    /* PUT */
    async put(url, id, dato) {
        try {
            return await fetch(url + id, {
                method: 'put',
                body: JSON.stringify(dato),
                headers: { 'content-type': 'application/json' }

            }).then(r => r.json())
        }
        catch (error) {
            console.error('ERROR PUT', error)
        }
    }

    /* DELETE */
    async del(url, id) {
        try {
            return await fetch(url + id, { method: 'delete' }).then(r => r.json())
        }
        catch (error) {
            console.error('ERROR DELETE', error)
        }
    }   
}

const http = new Http()