class ReservationStation{
    constructor(cycles, size, type){
        this.cycles = cycles // Número ciclos por instrução
        this.size = size // Tamanho da Station
        this.type = type // Tipo de instrução
        this.busy = false // Se a RS está ocupada
        this.exec = null // Instrução que está sendo executada
        this.op = null // Operação que está sendo executada
        this.Vj = null // Valor do operando Vj
        this.Vk = null // Valor do operando Vk
        this.Qj = null // Registrador que está sendo esperado Qj
        this.Qk = null // Registrador que está sendo esperado Qk
        this.A = null // endereço (load/store)
    }
}