class courseClass {
    dcode: string;
    mcode: string;
    name: string;
    code: string;
    title: string;
    units: number;
    sem1: boolean;
    sem2: boolean;
    sum: boolean;
    prereq: string;
    incomp: string;

    constructor(dcode : string, mcode : string, name : string, code : string, title : string, units : number, 
        sem1 : boolean, sem2 : boolean, sum : boolean, prereq : string, incomp : string) {
        this.dcode = dcode;
        this.mcode = mcode;
        this.name = name;
        this.code = code;
        this.title = title;
        this.units = units;
        this.sem1 = sem1;
        this.sem2 = sem2;
        this.sum = sum;
        this.prereq = prereq;
        this.incomp = incomp;
    }
}

export default courseClass;