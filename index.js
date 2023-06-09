import { ReservationStations } from "./ReservationStations.js";
import { FunctionalUnit } from "./FunctionalUnit.js";
import { Registers } from "./Registers.js";

var InstructionsList = [
  "ADD R0 R1 R2",
  "LW R1 00 R0",
  "LW R2 04 R1",
  "MULT R1 R1 R2",
  "SUB R0 R1 R3",
  "SW R0 04 R1",
  "ADD R0 R1 R2",
];

var instructionListAux = [];
  InstructionsList.forEach(instruction => instructionListAux.push([instruction, -1]));

var cycle = 1;

// Criação das Reservation Stations
var AddSubStations = new ReservationStations(2, "Adder");
var MultDivStations = new ReservationStations(3, "Multiplier");
var LoadStoreStations = new ReservationStations(1, "Memory");

// Criação das Unidades Funcionais
var AddSubFunctionalUnit = new FunctionalUnit(2);
var MultDivFunctionalUnit = new FunctionalUnit(4);
var LoadStoreFunctionalUnit = new FunctionalUnit(6);

var registers = new Registers(32); // 32 registradores

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
  if (index < 0) return;
  let inst = InstructionsList[index]
  console.log("INSTRUCTION: " + inst);
  inst = inst.split(" ");
  let station = null;
  let input = {
    op: index,
    rg: Registers.convertRegToInt(inst[1])
  }
  
  if (inst[0] == "LW" || inst[0] == "SW") {
    input.offset = +inst[2];
    station = LoadStoreStations;

    if (inst[0] == "LW") {
      input.r1 = Registers.convertRegToInt(inst[3]);
      let qj = getHighestOpStationUsingRegister(input.r1, AddSubStations, MultDivStations, LoadStoreStations, AddSubFunctionalUnit, MultDivFunctionalUnit, LoadStoreFunctionalUnit);
      if (station.queueLoadInstruction(input, registers, qj)) {
        InstructionsList[index] = null;
      }
    }

    if (inst[0] == "SW") {
      input.rg = -1;
      input.r1 = Registers.convertRegToInt(inst[1]);
      input.r2 = Registers.convertRegToInt(inst[3]);
      let qj = getHighestOpStationUsingRegister(input.r1, AddSubStations, MultDivStations, LoadStoreStations, AddSubFunctionalUnit, MultDivFunctionalUnit, LoadStoreFunctionalUnit);
      let qk = getHighestOpStationUsingRegister(input.r2, AddSubStations, MultDivStations, LoadStoreStations, AddSubFunctionalUnit, MultDivFunctionalUnit, LoadStoreFunctionalUnit);
      if (station.queue(input, registers, qj, qk)) {
        InstructionsList[index] = null;
      }
    }
  } else {
    input.r1 = Registers.convertRegToInt(inst[2]);
    input.r2 = Registers.convertRegToInt(inst[3]);
    let qj = getHighestOpStationUsingRegister(input.r1, AddSubStations, MultDivStations, LoadStoreStations, AddSubFunctionalUnit, MultDivFunctionalUnit, LoadStoreFunctionalUnit);
    let qk = getHighestOpStationUsingRegister(input.r2, AddSubStations, MultDivStations, LoadStoreStations, AddSubFunctionalUnit, MultDivFunctionalUnit, LoadStoreFunctionalUnit);
    if (inst[0] == "MULT") {
    }
    station = (inst[0] == "ADD" || inst[0] == "SUB") ?
      AddSubStations : (inst[0] == "DIV" || inst[0] == "MULT") ?
        MultDivStations : null;
    // switch (inst[0]) {
    //   case "ADD" || "SUB":
    //     station = AddSubStations;
    //     break;
    //   case "DIV" || "MULT":
    //     station = MultDivStations;
    //     break;
    // }
    if (!station) {
      throw "Instrução inválida";
    }

    if (station.queue(input, registers, qj, qk)) {
      InstructionsList[index] = null;
    }
  }

  console.log(AddSubStations.toString("ADD / SUB"));
  console.log(MultDivStations.toString(" MULT / DIV"));
  console.log(LoadStoreStations.toString(" LOAD / STORE"));
}

function getHighestOpStationUsingRegister(rg, AddSubStations, MultDivStations, LoadStoreStations, AddSubFunctionalUnit, MultDivFunctionalUnit, LoadStoreFunctionalUnit) {
  let arr = [
    AddSubStations.stationWritingToRegisterWithHighestOp(rg),
    MultDivStations.stationWritingToRegisterWithHighestOp(rg), 
    LoadStoreStations.stationWritingToRegisterWithHighestOp(rg),
  ];
  
  if (AddSubFunctionalUnit.busy && AddSubFunctionalUnit.station.op === rg) {
    arr.push(AddSubFunctionalUnit.station)
  }
  if (MultDivFunctionalUnit.busy && MultDivFunctionalUnit.station.op === rg) {
    arr.push(MultDivFunctionalUnit.station)
  }
  if (LoadStoreFunctionalUnit.busy && LoadStoreFunctionalUnit.station.op === rg) {
    arr.push(LoadStoreFunctionalUnit.station)
  }

  let station = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] && arr[i].op > station ? station.op : -1) station = arr[i];
  }

  return station;
}

// Registers.setRegisterBusy(inst.r0, station.name); when executing

function updateQjQkOfAllStations(station) {
  AddSubStations.updateQjQkOfAllStations(station);
  MultDivStations.updateQjQkOfAllStations(station);
  LoadStoreStations.updateQjQkOfAllStations(station);
}

/**
 * Olha se a functional unit pode executar uma station, e se tiver alguma
 * station pronta para ser executada, a coloca em execução
 */
function handleFunctionalUnit(unit, stations) {
  if (!unit.busy) {
    let station = stations.getIdleStation();
    if (station)
      if (unit.setStation(station, registers))
        stations.releaseStation(station.name);
  } else {
    // Terminou de executar
    let station = unit.execute();
    if (station) {
      instructionListAux[station.op][1] = cycle;
      // Precisa atualizar os registradores que estão esperando o resultado
      updateQjQkOfAllStations(station);
    }
  }
}

function run() {
  // Mudar atributo exec das stations que podem ser executadas para true
  AddSubStations.setIdleStationsToExec();
  MultDivStations.setIdleStationsToExec();
  LoadStoreStations.setIdleStationsToExec();

  handleFunctionalUnit(AddSubFunctionalUnit, AddSubStations);
  handleFunctionalUnit(MultDivFunctionalUnit, MultDivStations);
  handleFunctionalUnit(LoadStoreFunctionalUnit, LoadStoreStations);

  AddSubStations.toString("ADD / SUB");
  MultDivStations.toString(" MULT / DIV");
  LoadStoreStations.toString(" LOAD / STORE");

  AddSubFunctionalUnit.toString("ADD / SUB");
  MultDivFunctionalUnit.toString(" MULT / DIV");
  LoadStoreFunctionalUnit.toString(" LOAD / STORE");

  return false
  // Pegar RS que produziram valor e atualizar os RS que dependem
}

function continueRunning() {
  return (
    (InstructionsList.filter((i) => i !== null).length > 0) ||
    (AddSubFunctionalUnit.isBusy() || MultDivFunctionalUnit.isBusy() || LoadStoreFunctionalUnit.isBusy()) ||
    (AddSubStations.getNumberOfBusyStations() + MultDivStations.getNumberOfBusyStations() + LoadStoreStations.getNumberOfBusyStations() > 0)
  );
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
    "Número de Unidades Funcionais Ad/Sub: 1\nNúmero de Ciclos na Unidade:" +AddSubFunctionalUnit.cycles+ "\n\nNúmero de Unidades Funcionais Mult/Div: 1\nNúmero de Ciclos na Unidade:" +MultDivFunctionalUnit.cycles+ "\n\nNúmero de Unidades Funcionais Load/Store: 1\nNúmero de Ciclos na Unidade: " + LoadStoreFunctionalUnit.cycles
  );

  console.log("\n=========== Lista de Instruções: ============");

  InstructionsList.forEach((instruction) => {
    console.log(instruction);
  });

  let isRunning = true;

  while (continueRunning() && cycle < 35) {
    console.log("====================== CICLO " + cycle++ + " ======================");
    issue();
    isRunning = run();
  }

  console.log("\n========================= Ciclo de execução das instruções =========================");
  instructionListAux.forEach(inst => {
    console.log(inst);
  })
}

main();