class sectionClass {
    dcode: String;
    mcode: String;
    name: String;
    max: number;
    min: number;
    courses: any;

    constructor(dcode : String, mcode : String, name : String, max : number, min : number, courses : any) {
        this.dcode = dcode;
        this.mcode = mcode;
        this.name = name;
        this.max = max;
        this.min = min;
        this.courses = courses;
    }
}

export default sectionClass;