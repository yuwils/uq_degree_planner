class sectionClass {
    dcode: String;
    mcode: String;
    name: String;
    max: number;
    min: number;
    courses: any;
    currentUnits : number;

    constructor(dcode : String, mcode : String, name : String, max : number, min : number, courses : any) {
        this.dcode = dcode;
        this.mcode = mcode;
        this.name = name;
        this.max = max;
        this.min = min;
        this.courses = courses;
        this.currentUnits = 0;
    }
}

export default sectionClass;