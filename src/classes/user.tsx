import Degree from './degree';
import sectionClass from './sectionClass';

class User {
    stage: number;
    degrees: Array<Degree>;
    sections: Array<sectionClass>;
    sectionsSelected : boolean;

    constructor() {
        this.stage = 0;
        this.degrees = [];
        this.sections = [];
        this.sectionsSelected = false;
    }
}

export default User;