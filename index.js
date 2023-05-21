var FloatingRegisterList = [];
var InstructionsList = [
  "ADD R0 R1 R2",
  "LW R1 00 R0",
  "LW R2 04 R1",
  "MULT R1 R1 R2",
];

// Criação das Reservation Stations
var AddSubStations = new ReservationStations(2, "Adder");
var MultDivStations = new ReservationStations(3, "Multiplier");
var LoadStoreStations = new ReservationStations(1, "Memory");

// Criação das Unidades Funcionais
var AddSubFunctionalUnit = new FunctionalUnit(2);
var MultDivFunctionalUnit = new FunctionalUnit(4);
var LoadStoreFunctionalUnit = new FunctionalUnit(6);

var Registers = new Registers(32); // 32 registradores

console.log(AddSubStations, MultDivStations, LoadStoreStations);

// Busca a Instrução na Fila
function searchInstruction() {
  if (len(InstructionsList) == 0) {
    return None;
  } else {
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
  let index = InstructionsList.findIndex((inst) => inst != null);
  let inst = InstructionsList[index];
  inst = inst.split(" ");
  let station = null;

  // LW R1 40 R2
  // 40 é offset
  if (inst[0] == "LW" || inst[0] == "SW") {
    let input = {
      op: index,
      rg: Registers.convertRegToInt(inst[1]),
      offset: +inst[2],
      r1: Registers.convertRegToInt(inst[3]),
    };

    station = LoadStoreStations;
    if (station.queueLoadStoreInstruction(input, Registers)) {
      InstructionsList[index] = null;
    }
  } else {
    let input = {
      op: index,
      rg: Registers.convertRegToInt(inst[1]),
      r1: Registers.convertRegToInt(inst[2]),
      r2: Registers.convertRegToInt(inst[3]),
    };

    switch (inst[0]) {
      case "ADD" || "SUB":
        station = AddSubStations;
        break;
      case "DIV" || "MULT":
        station = MultDivStations;
        break;
    }

    if (station.queue(input, Registers)) {
      InstructionsList[index] = null;
    }
  }
}

// Registers.setRegisterBusy(inst.r0, station.name); when executing

function updateQjQkOfAllStations(rg) {
  AddSubStations.updateQjQkOfAllStations(rg);
  MultDivStations.updateQjQkOfAllStations(rg);
  LoadStoreStations.updateQjQkOfAllStations(rg);
}

function handleFunctionalUnit(unit, stations) {
  if (!unit.busy) {
    let station = stations.getIdleStation();
    unit.setStation(station, Registers);
  } else {
    // Terminou de executar
    let station = unit.execute();
    if (station) {
      // Precisa atualizar os registradores que estão esperando o resultado
      updateQjQkOfAllStations(station.rg);
      stations.releaseStation(station.name);
    }
  }
}

function run() {
  // Mudar atributo exec das stations que podem ser executadas para true
  AddSubFunctionalUnit.setIdleStationsToExec();
  MultDivFunctionalUnit.setIdleStationsToExec();
  LoadStoreStations.setIdleStationsToExec();

  handleFunctionalUnit(AddSubFunctionalUnit, AddSubStations);
  handleFunctionalUnit(MultDivFunctionalUnit, MultDivStations);
  handleFunctionalUnit(LoadStoreFunctionalUnit, LoadStoreStations);

  // Pegar RS que produziram valor e atualizar os RS que dependem
}

function main() {
  console.log("=== Algoritmo de Tomasulo ===");
  console.log("- Camila Lacerda Grandini");
  console.log("- Joana Moreira Woldaynsky");
  console.log("- José Fernando Rossi Júnior");
  console.log("- Luiz Fernando Oliveira Maciel\n");

  console.log("=========== Configurações: ============");
  console.log(
    "Número de Reservation Stations Ad/Sub: 2\nNúmero de Reservation Stations Mult/Div: 3\nNúmero de Reservation Stations Load/Store: 1"
  );
  console.log(
    "Número de Unidades Funcionais Ad/Sub: 1\nNúmero de Unidades Funcionais Mult/Div: 1\nNúmero de Unidades Funcionais Load/Store: 1"
  );

  console.log("\n=========== Lista de Instruções: ============");

  InstructionsList.forEach((instruction) => {
    console.log(instruction);
  });

  while (InstructionsList.filter((i) => i !== null).length > 0) {
    issue();
    run();
  }
}

function executeInstruction() {}
