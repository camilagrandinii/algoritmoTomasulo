class FunctionalUnit{
    /**
     * instructions: array com o nome das instruções. Ex: ["ADD", "SUB", "ADDI"] etc
     * busy: se a unidade funcional está sendo usada ou não
     */
    constructor(cycles){
        // let instArray = {};
        // for (const key in instructions) {
        //     instArray[instructions[key]] = "";
        // }
        this.cycles = cycles;
        this.station = null;
        this.busy = 0;
    }

    setStation(station, Registers) {
        if (busy == 0) {
            this.station = station
            this.busy = this.cycles;
            Registers.setRegisterBusy(station.Rg, station.name)

        }
    }

    execute() {
        if (busy > 0) {
            busy--;
        }

        return busy == 0;
    }
}