type Course = {
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
}

type Degree = {
    code: number;
    name: string;
    unit: number;
    majors: number;
    minors: number;
    emaj: number;
    majorCodes: Array<Section>;
    minorCodes: Array<Section>;
    emajCodes: Array<Section>;
    elective?: Course;
    currentUnits : number;
    constraints : Array<string>;
}

type Major = {
    code: string;
    name: string;
    unit: number;
    sections : Array<Section>;
    currentUnits : number;
}

type Section = {
    dcode: string;
    mcode: string;
    name: string;
    max: number;
    min: number;
    courses: Array<Course>;
    currentUnits : number
}

type Year = {
    sem1: Array<Course>;
    sem2: Array<Course>;
    sum: Array<Course>;
    finalYear : boolean;
    id: number;
}

type User = {
    stage: number;
    degrees: Array<Degree>;
    years: Array<Year>;
    sectionsSelected: boolean;
    version: number;
}

export type {Course, Degree, Major, Section, User, Year};