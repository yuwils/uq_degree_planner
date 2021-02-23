import Degree from './degree';
import sectionClass from './sectionClass';
import yearClass from './yearClass';

class User {
    stage: number;
    degrees: Array<Degree>;
    sections: Array<sectionClass>;
    years: Array<yearClass>;
    sectionsSelected : boolean;

    constructor() {
        this.stage = 0;
        this.degrees = [];
        this.sections = [];
        let oneYearClass : any = [];
        oneYearClass.push(new yearClass([], [], [], 1));
        this.years = oneYearClass;
        this.sectionsSelected = false;
    }
}

export default User;