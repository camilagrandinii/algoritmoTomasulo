class ReservationStations{
    constructor(size, type) {
        this.size = size // Tamanho da Station
        this.type = type // Tipo de instrução
        this.stations = [];
        for (let i = 0; i < size; i++) {
            this.stations.push({
                name: this.type + (i + 1),
                busy: false, // Se a RS está ocupada
                exec: false, // Instrução que está sendo executada
                op: null, // Operação que está sendo executada
                Vj: null, // Valor do operando Vj
                Vk: null, // Valor do operando Vk
                Qj: null, // Registrador que está sendo esperado Qj
                Qk: null, // Registrador que está sendo esperado Qk
                A: null // endereço (load/store)
            });
        }
    }

    /**
     * @param inst: {
     *  op: operation
     *  r1: register
     *  r2: register
     * }
     * 
     * 
     */
    queue(inst) {
        let openStations = this.stations.filter(station => {
            return !station.busy;
        })

        if (openStations.length > 0) {
            let station = openStations[0];
            station.op = inst.op;
            station.Vj = inst.r1;
            station.Vk = inst.r2;
            return true;
        } else {
            return false;
        }
    }

    executeReadyStation() {
        let station = stations.filter(station => {
            return station.Vj && station.Vk;
        })[0];
        station.exec = true;
        return station;
    }
}
