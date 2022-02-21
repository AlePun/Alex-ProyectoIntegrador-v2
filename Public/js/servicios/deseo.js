class DeseoService {
    URL_CARRITO = '/api/deseo/'

    async guardarDeseoService(deseo) {
        let deseoGuardado = await http.post(this.URL_deseo, deseo)
        return deseoGuardado
    }
}

// function appendObjTo(thatArray, newObj) {
//     const frozenObj = Object.freeze(newObj);
//     return Object.freeze(thatArray.concat(frozenObj));
// }

const deseoService = new DeseoService()
