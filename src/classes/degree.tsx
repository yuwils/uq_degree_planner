class Degree {
    code: number;
    name: string;
    unit: number;
    majors: number;
    minors: number;
    emaj: number;
    majorCodes: any;
    minorCodes: any;
    emajCodes: any;
    elective: any;
    currentUnits : number;

    constructor(code : number, name : string, unit : number) {
        this.code = code;
        this.name = name;
        this.unit = unit;
        this.majors = 0;
        this.minors = 0;
        this.emaj = 0;
        this.majorCodes = [];
        this.minorCodes = [];
        this.emajCodes = [];
        this.elective = "";
        this.currentUnits = 0;
    }
}

export default Degree;