class majorClass {
    code: String;
    name: String;
    unit: number;
    sections : any;

    constructor(code : String, name : String, unit : number) {
        this.code = code;
        this.name = name;
        this.unit = unit;
        this.sections = [];
    }
}

export default majorClass;