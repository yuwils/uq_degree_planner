import Degree from './degree';

class User {
    stage: number;
    degrees: Array<Degree>;

    constructor() {
        this.stage = 0;
        this.degrees = [];
    }
}

export default User;