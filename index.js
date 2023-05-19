var FloatingRegisterList = [];
var InstructionsList = [
    "ADD R0 R1 R2",
    "LW R1 R0",
    "LW R2 R1",
    "MULT R1 R1 R2"
];

// Criação das Reservation Stations
var AddSubReservation = new ReservationStations(2, "Adder");
var MultDivReservation = new ReservationStations(3, "Multiplier");
var LoadStoreReservation = new ReservationStations(1, "Memory");

// Criação das Unidades Funcionais
var AddSubFunctionalUnit = new FunctionalUnit(2);
var MultDivFunctionalUnit = new FunctionalUnit(4);
var LoadStoreFunctionalUnit = new FunctionalUnit(6);

var Registers = new Registers(32); // 32 registradores

console.log(AddSubReservation, MultDivReservation, LoadStoreReservation);



// Busca a Instrução na Fila
function searchInstruction() {
    if (len(InstructionsList) == 0) {
        return None;
    }
    else {

    }
}

/* TODO:
Issue
    Ao colocar a instrução na estação, ver se:
        Os registradores necessários estão sendo usados por uma estação em execução
        Se sim, pegar o nome dessa estação e colocar em Qj ou Qk
        Se não, colocar em Vj ou Vk

Run
    Colocar RS em execução
    Pegar RS que produziram valor e atualizar o Vj e Vk dos RS que precisam do valor (olhando station.name)

*/

/*

EXECUÇÃO:
    ISSUE:
    O ciclo inicia com o issue, que pega uma instrução e a coloca na devida station
        Se tiver station vazia, tiramos a instrução da lista (colocando null na posição)
        Se não, continuamos o ciclo

    RUN:
    1. Encontra as stations que podem ser colocadas para execução, checando se a unidade funcional está livre
        Colocar o registrador de resultado da instrução a ser executada como busy
        Colocar a unidade funcional como busy
        Libera a reservation station
    
    2. Ver as instruções que produziram valor, e atualizar as estações que precisavam desse valor (Qj => Vj ou Qk => Vk)
*/



// Se não tiver RS livre, stall
function issue() {
    let index = InstructionsList.findIndex(inst => inst != null);
    let inst = InstructionsList[index];
    inst = inst.split(' ');
    let station = null;
    if (inst[0] == "LW" || inst[0] == "SW") {

    } else {
        let input = {
            op: index,
            rg: inst[1],
            r1: inst[2],
            r2: inst[3]
        };

        switch (inst[0]) {
            case "ADD" || "SUB":
                station = AddSubReservation;
                break;
            case "DIV" || "MULT":
                station = MultDivReservation;
                break;
        }

        if (station.queue(input, Registers)) {
            InstructionsList[index] = null;
        }
    }
}

// Registers.setRegisterBusy(inst.r0, station.name); when executing

function Run() {
    // Mudar atributo exec das stations que podem ser executadas para true
    AddSubFunctionalUnit.setIdleStationsToExec();
    MultDivFunctionalUnit.setIdleStationsToExec();
    LoadStoreReservation.setIdleStationsToExec();

    if (!AddSubFunctionalUnit.busy) {
        let station = AddSubReservation.getIdleStation();
        AddSubFunctionalUnit.setInstruction(station);
    }
    if (MultDivFunctionalUnit.busy == 0) {

    }
    if (LoadStoreReservation.busy == 0) {

    }
    // Pegar RS que produziram valor e atualizar os RS que dependem 
}

function executeInstruction() {

}