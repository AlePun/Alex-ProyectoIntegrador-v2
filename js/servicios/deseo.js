class DeseoService {
    URL_DESEO = 'https://61b8d2ed38f69a0017ce5d95.mockapi.io/deseo/'

    async guardarDeseoService(deseo) {
        let deseoGuardado = await http.post(this.URL_deseo, deseo)
        return deseoGuardado
    }
}

const deseoService = new DeseoService()
