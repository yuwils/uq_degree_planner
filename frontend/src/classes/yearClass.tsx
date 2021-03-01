class yearClass {
    sem1: any;
    sem2: any;
    sum: any;
    finalYear : boolean;
    id: number;

    constructor(sem1 : any, sem2 : any, sum : any, id : number) {
        this.sem1 = sem1;
        this.sem2 = sem2;
        this.sum = sum;
        this.id = id;
        this.finalYear = true;
    }
}

export default yearClass;