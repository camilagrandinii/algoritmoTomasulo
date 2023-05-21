export class Registers {
    constructor(size) {
        this.size = size;
        this.registers = [];
        for (let i = 0; i < size; i++) {
            this.registers.push({
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
        return this.registers[id].rs;
    }

    isRegisterAvailable(id) {
        return !this.registers[id].busy;
    }

    setRegisterBusy(id, rs) {
        this.registers[id].busy = true;
        this.registers[id].rs = rs;
    }

    setRegisterIdle(id) {
        this.registers[id].busy = false;
        this.registers[id].rs = null;
    }

    static convertRegToInt(rg) {
        return +rg.substring(1, rg.length);
    }
}