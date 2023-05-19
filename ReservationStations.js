class ReservationStations {
    constructor(size, type) {
        this.size = size; // Tamanho da Station
        this.type = type; // Tipo de instrução
        this.stations = [];
        for (let i = 0; i < size; i++) {
            let station = getEmptyStationObject(this.type + (i + 1));
            this.stations.push(station);
        }
    }

    /**
     * Retorna um template vazio do objeto de station
     * 
     * @param {String} name: nome da estação
     * @returns: station
     */
    getEmptyStationObject(name) {
        return {
            name: name,     // Nome da station (Ex: Adder1, Mult1, etc)
            busy: false,    // Se a RS está ocupada
            exec: false,    // Se a RS pode ser executada
            op: null,       // Número da instrução que está na station
            Rg: null,       // Registrador em que o resultado será armazenado
            Vj: false,       // Valor do operando Vj
            Vk: false,       // Valor do operando Vk
            Qj: null,       // Registrador que está sendo esperado Qj
            Qk: null,       // Registrador que está sendo esperado Qk
            A: null         // endereço (load/store)
        };
    }

    /**
     * 
     * @param {obj} inst : @param inst: {
     *  op: operation
     *  rg: result register
     *  r1: register 1
     *  r2: register 2
     * }
     * @param {Registers} Registers: Objeto com os registradores
     * @returns 
     */
    queue(inst, Registers) {
        let openStations = this.stations.filter(station => {
            return !station.busy;
        });

        if (openStations.length == 0) {
            return false;
        }

        let station = getEmptyStationObject(openStations[0].name);
        station.op = inst.op;
        station.rg = inst.rg;

        if (Registers.isRegisterAvailable(inst.r1)) {
            station.Vj = true;
        } else {
            let stationsWritingToRegister = getStationsWritingToRegister(inst.r1);
            station.Qj = stationsWritingToRegister.reduce((prev, current) => (prev.op > current.op) ? prev : current).name;
        }

        if (Registers.isRegisterAvailable(inst.r2)) {
            station.Vk = true;
        } else {
            let stationsWritingToRegister = getStationsWritingToRegister(inst.r2);
            station.Qk = stationsWritingToRegister.reduce((prev, current) => (prev.op > current.op) ? prev : current).name;
        }

        let index = this.stations.indexOf(openStations[0]);
        this.stations[index] = station;
        return true;
    }

    /**
     * Retorna todas as estações que irão salvar resultado no registrador informado
     * 
     * @param {int} id: Id do registrador
     * @returns 
     */
    getStationsWritingToRegister(id) {
        return this.stations.filter((station => station.rg === id));
    }

    /**
     * Coloca o atributo exec de todas as estações prontas para serem executadas como true
     * Chamado no inicio da fase RUN
     */
    setIdleStationsToExec() {
        this.stations.forEach((station, index) => {
            if (station.Vj && station.Vk)
                this.stations[index].exec = true;
        });
    }

    /**
     * Retorna a primeira estação que pode ser executada
     * 
     * @returns: station
     */
    getIdleStation() {
        let station = stations.filter(station => {
            return station.Vj && station.Vk;
        })[0];
        station.exec = true;
        return station;
    }
}
