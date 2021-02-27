import Degree from './degree';
import sectionClass from './sectionClass';
import yearClass from './yearClass';

class User {
    stage: number;
    degrees: Array<Degree>;
    years: Array<yearClass>;
    sectionsSelected : boolean;
    version: number;

    constructor() {
        this.stage = 0;
        this.degrees = [];
        let oneYearClass : any = [];
        oneYearClass.push(new yearClass([], [], [], 1));
        this.years = oneYearClass;
        this.sectionsSelected = false;
        this.version = 1;
    }
}

export default User;