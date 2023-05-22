export class FunctionalUnit {
  /**
   * instructions: array com o nome das instruções. Ex: ["ADD", "SUB", "ADDI"] etc
   * busy: se a unidade funcional está sendo usada ou não
   */
  constructor(cycles) {
    // let instArray = {};
    // for (const key in instructions) {
    //     instArray[instructions[key]] = "";
    // }
    this.cycles = cycles;
    this.station = null;
    this.busy = 0;
  }

  setStation(station, registers) {
    if (this.busy == 0) {
      this.station = {...station};
      this.busy = this.cycles;
      registers.setRegisterBusy(station);
      return true;
    } else {
      return false;
    }
  }

  isBusy() {
    return (this.busy > 0)
  }

  execute() {
    if (this.busy > 0) {
      this.busy--;
    }

    return this.busy === 0 ? this.station : false;
  }

  toString(name) {
    console.log(name + "--- Ciclos: " + this.cycles + (this.busy ? ("; Ciclos restantes: " + this.busy + "; Station: " + JSON.stringify(this.station) + ";") : ";"));
  }
}
