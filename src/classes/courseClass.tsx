class courseClass {
    code: string;
    title: string;
    units: number;
    sem1: boolean;
    sem2: boolean;
    sum: boolean;
    prereq: string;
    incomp: string;

    constructor(code : string, title : string, units : number, sem1 : boolean, sem2 : boolean, sum : boolean, prereq : string, incomp : string) {
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