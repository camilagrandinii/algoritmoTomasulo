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

    setStation(station) {
        if (busy == 0) {
            this.station = station
            this.busy = this.cycles;
        }
    }

    execute() {
        if (busy > 0) {
            busy--;
        }

        return busy == 0;
    }
}