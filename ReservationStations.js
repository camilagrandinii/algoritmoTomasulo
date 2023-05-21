export class ReservationStations {
  constructor(size, type) {
    this.size = size; // Tamanho da Station
    this.type = type; // Tipo de instrução
    this.stations = [];
    for (let i = 0; i < size; i++) {
      let station = this.getEmptyStationObject(this.type + (i + 1));
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
      name: name, // Nome da station (Ex: Adder1, Mult1, etc)
      busy: false, // Se a RS está ocupada
      exec: false, // Se a RS pode ser executada
      op: null, // Número da instrução que está na station
      Rg: null, // Registrador em que o resultado será armazenado
      Vj: false, // Valor do operando Vj
      Vk: false, // Valor do operando Vk
      Qj: null, // Registrador que está sendo esperado Qj
      Qk: null, // Registrador que está sendo esperado Qk
      A: null, // endereço (load/store)
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
   * @param {registers} registers: Objeto com os registradores
   * @returns
   */
  queue(inst, registers) {
    let openStations = this.stations.filter((station) => {
      return !station.busy;
    });

    if (openStations.length == 0) {
      return false;
    }

    let station = this.getEmptyStationObject(openStations[0].name);
    station.op = inst.op;
    station.Rg = inst.rg;
    station.busy = true;

    if (registers.isRegisterAvailable(inst.r1)) {
      station.Vj = true;
    } else {
      // let stationsWritingToRegister = this.getStationsWritingToRegister(inst.r1);
      // station.Qj = stationsWritingToRegister.reduce((prev, current) =>
      //   prev.op > current.op ? prev : current
      // ).name;
      station.Qj = registers.getStationUsingReg(inst.r1);
    }

    if (registers.isRegisterAvailable(inst.r2)) {
      station.Vk = true;
    } else {
      // let stationsWritingToRegister = this.getStationsWritingToRegister(inst.r2);
      // station.Qk = stationsWritingToRegister.reduce((prev, current) =>
      //   prev.op > current.op ? prev : current
      // ).name;
      station.Qk = registers.getStationUsingReg(inst.r2);
    }

    let index = this.stations.indexOf(openStations[0]);
    this.stations[index] = station;
    return true;
  }

  /**
   *
   * @param {obj} inst : @param inst: {
   *  op: operation
   *  rg: result register
   *  offset: offset de memoria
   *  r1: register a ser lido (+ offset)
   * }
   * @param {registers} registers: Objeto com os registradores
   * @returns
   *
   */
  queueLoadStoreInstruction(inst, registers) {
    let openStations = this.stations.filter((station) => {
      return !station.busy;
    });

    if (openStations.length == 0) {
      return false;
    }

    let station = this.getEmptyStationObject(openStations[0].name);
    station.op = inst.op;
    station.Rg = inst.rg;
    station.A = inst.offset + inst.r1;
    station.busy = true;

    if (registers.isRegisterAvailable(inst.r1)) {
      station.Vj = true;
    } else {
      // let stationsWritingToRegister = this.getStationsWritingToRegister(inst.r1);
      // station.Qj = stationsWritingToRegister.reduce((prev, current) =>
      //   prev.op > current.op ? prev : current
      // ).name;
      station.Qj = registers.getStationUsingReg(inst.r1);
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
    return this.stations.filter((station) => station.Rg === id);
  }

  /**
   * Coloca o atributo exec de todas as estações prontas para serem executadas como true
   * Chamado no inicio da fase RUN
   */
  setIdleStationsToExec() {
    this.stations.forEach((station, index) => {
      if (station.Vj && station.Vk) this.stations[index].exec = true;
    });
  }

  /**
   * Retorna a primeira estação que pode ser executada
   *
   * @returns: station
   */
  getIdleStation() {
    let station = this.stations.filter((station) => {
      return station.exec;
    })[0];

    return station;
  }

  updateQjQkOfAllStations(name) {
    this.stations.forEach((station, index) => {
      station.Vj = (station.Qj === name);
      station.Vk = (station.Qk === name);
      this.stations[index] = station;
    });
  }

  releaseStation(name) {
    let index = this.stations.map((station) => { return station.name; }).indexOf(name);
    this.stations[index] = this.getEmptyStationObject(name);
  }

  toString(type) {
    console.log("\n");
    console.log("\t\t\tName\t\t|\tBusy\t|\tOp\t|\tVj\t|\tVk\t|\tQj\t|\tQk\t|\tA\t|");
    this.stations.forEach(station => {
      console.log(type + "\t|\t" + station.name + (station.name.charAt(1) == 'u' ? "" : "\t") + "\t|\t" + station.busy, "\t|\t", station.op, "\t|\t", station.Vj, "\t|\t" + station.Vk + "\t|\t"+ station.Qj + "\t|\t"+ station.Qk, "\t|\t" + station.A + "\t|");
    });
  }

  getNumberOfBusyStations() {
    return this.stations.filter((station) => {
      return station.busy;
    }).length;
  } 
}
