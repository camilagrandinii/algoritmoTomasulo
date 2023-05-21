class Register {
    constructor(size) {
        this.size = size;
        this.register = [];
        for (let i = 1; i <= size; i++) {
            this.register.push({
                "id": i,
                "busy": false,
                "rs": null
            });
        }
    }

    /**
     * Retorna a estação que está produzindo o valor a ser guardado no registrador "id"
     * 
     * @param {int} id: id do registrador
     * @returns: nome da reservation station (ex.: "Adder1")
     */
    getStationUsingReg(id) {
        return register[id - 1].rs;
    }

    isRegisterAvailable(id) {
        return register[id - 1].busy;
    }

    setRegisterBusy(id, rs) {
        register[id - 1].busy = true;
        register[id - 1].rs = rs;
    }

    setRegisterIdle(id) {
        register[id - 1].busy = false;
        register[id - 1].rs = null;
    }

    static convertRegToInt(rg) {
        return +rg.substring(1,rg.length);
    }


}