class Degree {
    code: number;
    name: string;
    majors: number;
    minors: number;
    emaj: number;
    majorCodes: any;
    minorCodes: any;
    emajCodes: any;

    constructor() {
        this.code = 0;
        this.name = "";
        this.majors = 0;
        this.minors = 0;
        this.emaj = 0;
        this.majorCodes = {};
        this.minorCodes = {};
        this.emajCodes = {};
    }
}

export default Degree;