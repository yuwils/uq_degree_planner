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
    sections: any;

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
        this.sections = [];
    }
}

export default Degree;