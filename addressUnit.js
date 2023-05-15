class AddressUnit{
    constructor(instruction, registerContent){
        this.instruction = new Instruction(instruction);
        this.registerContent = registerContent;
        this. memoryAddress = null
    }

    memoryAddress = this.instruction.operand2 + this.instruction.offset;
}
