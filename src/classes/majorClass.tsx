class majorClass {
    code: String;
    name: String;
    unit: number;
    sections : any;
    currentUnits : any;

    constructor(code : String, name : String, unit : number) {
        this.code = code;
        this.name = name;
        this.unit = unit;
        this.sections = [];
        this.currentUnits = 0;
    }
}

export default majorClass;