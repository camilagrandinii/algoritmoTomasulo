var floatingRegisterList = []
var instructionsList = [
    "ADD R0 R1 R2",
    "LW R1 R0",
    "LW R2 R1",
    "MULT R1 R1"
]

// Criação das Reservation Stations
var addSubReservation = new ReservationStations(2, "Adder")
var multDivReservation = new ReservationStations(3, "Multiplier")
var LoadStoreReservation = new ReservationStations(1, "Memory")

// Criação das Unidades Funcionais
var addSubFunctionalUnit = new FunctionalUnit(2)
var multDivFunctionalUnit = new FunctionalUnit(4)
var LoadStoreFunctionalUnit = new FunctionalUnit(6)

console.log(addSubReservation, multDivReservation, LoadStoreReservation);



// Busca a Instrução na Fila
function searchInstruction(){
    if (len(instructionsList) == 0){
        return None
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

function issue() {
    instructionsList.forEach(inst => {
        inst = inst.split(' ');
        let station = null;
        switch (inst[0]) {
            case "ADD" || "SUB": 
                station = addSubReservation;
                break;
            case "DIV" || "MULT":
                station = multDivReservation;
                break;
            case "LW" || "SW": 
                station = LoadStoreReservation;
                break;
        }
        
        let input = {
            op: inst[0],
            r1: inst[1],
            r2: inst[2]
        };

        if (station.queue(input)) {
            instructionsList.splice(1, 0);
        }
    })
}

function Run(){
    // Colocar RS em execução
    if (addSubFunctionalUnit.busy == 0) {
        let station = addSubReservation.executeReadyStation();
        addSubFunctionalUnit.setInstruction(station);
    }
    if (multDivFunctionalUnit.busy == 0) {
           
    }
    if (LoadStoreReservation.busy == 0) {
           
    }
    // Pegar RS que produziram valor e atualizar os RS que dependem 
}

function executeInstruction() {
    
}