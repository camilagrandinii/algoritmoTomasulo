export class AddressUnit{
    constructor(instruction, registerContent){
        this.instruction = new Instruction(instruction);
        this.registerContent = registerContent;
        this.memoryAddress = null
    }

    getMemoryAddress() {
        return this.instruction ? this.instruction.operand2 + this.instruction.offset : 0;
    }

}
