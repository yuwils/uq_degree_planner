import reducer, {
  changePage,
  addCourseToSemester, removeCourseFromSections, addCourseBackToSection, removeCourseFromYears, setElective
} from '../reducers/reducers'

import { User, Page, MajorType, Degree, Major, Section, DegreeOption, Year, SemesterType } from '../types/types'

// For now we will focus on the most complex reducers
test('change page', () => {
  expect(reducer(undefined, changePage(Page.RequestDegreeType))).toEqual(
    {
      page: Page.RequestDegreeType,
      degrees: [],
      years: [],
      sectionsSelected: false
    }
  )
})

const exampleDegreeOption : DegreeOption = {
  majors: 1,
  minors: 1,
  extendedMajors: 1
}

const baseCourse = {
  dcode: 'testCode',
  title: 'testing',
  units: 2,
  sem1: true,
  sem2: true,
  sum: true,
  prereq: '',
  incomp: ''
}

const testCourse = {
  mcode: 'major',
  name: 'testSection',
  ...baseCourse
}

const exampleSection : Section = {
  dcode: 'testCode',
  mcode: 'major',
  name: 'testSection',
  max: 0,
  min: 10,
  sectionCodesWithoutOptions: [{ course: { code: 'TEST1501', ...testCourse } }],
  sectionCodesWithOptions: [{
    optionCode: 'TEST1201+TEST1301',
    courses: [{ code: 'TEST1201', ...testCourse }, { code: 'TEST1301', ...testCourse }]
  }],
  currentUnits: 2
}

const exampleMajor : Major = {
  mcode: 'major',
  name: 'majorName',
  units: 5,
  type: MajorType.Major,
  sections: [exampleSection],
  currentUnits: 2
}

const exampleDegree : Degree = {
  code: 'testCode',
  name: 'degreeName',
  units: 10,
  degreeOption: exampleDegreeOption,
  majorCodes: [exampleMajor],
  minorCodes: [],
  extendedMajorCodes: [],
  elective: undefined,
  currentUnits: 2,
  constraints: []
}

const exampleYear : Year = {
  id: 1,
  finalYear: true,
  sem1: [{ code: 'TEST1401', ...testCourse }],
  sem2: [],
  sum: []
}

const exampleUser : User = {
  page: Page.RequestDegree,
  degrees: [exampleDegree],
  years: [exampleYear],
  sectionsSelected: false
}

// Test adding a course to the timetable and deleting it
test('testDragToTimetable', () => {
  const newState1 = reducer(exampleUser, addCourseToSemester({ yearId: 1, semester: SemesterType.SemOne, course: { code: 'TEST1501', ...testCourse } }))
  const newState = reducer(newState1, removeCourseFromSections({ code: 'TEST1501', ...testCourse }))

  expect(newState.degrees[0].majorCodes[0].sections[0].sectionCodesWithoutOptions).toEqual([])
  expect(newState.years[0].sem1).toEqual([{ code: 'TEST1401', ...testCourse }, { code: 'TEST1501', ...testCourse }])
  expect(newState.degrees[0].currentUnits).toBe(4)
  expect(newState.degrees[0].majorCodes[0].currentUnits).toBe(4)
  expect(newState.degrees[0].majorCodes[0].sections[0].currentUnits).toBe(4)
})

test('deleteFromTimetable', () => {
  const newState1 = reducer(exampleUser, removeCourseFromYears({ yearId: 1, semester: SemesterType.SemOne, course: { code: 'TEST1401', ...testCourse } }))
  const newState = reducer(newState1, addCourseBackToSection({ code: 'TEST1401', ...testCourse }))

  expect(newState.degrees[0].majorCodes[0].sections[0].sectionCodesWithoutOptions).toEqual([{ course: { code: 'TEST1501', ...testCourse } },
    { course: { code: 'TEST1401', ...testCourse } }])
  expect(newState.years[0].sem1).toEqual([])

  expect(newState.degrees[0].currentUnits).toBe(0)
  expect(newState.degrees[0].majorCodes[0].currentUnits).toBe(0)
  expect(newState.degrees[0].majorCodes[0].sections[0].currentUnits).toBe(0)
})

// Test adding a optioned course to the timetable and deleting it
test('testOptionedWorkflow', () => {
  const addOptionedCourseToSem = reducer(exampleUser, addCourseToSemester({ yearId: 1, semester: SemesterType.SemOne, course: { code: 'TEST1201', ...testCourse } }))
  const removeOptCourseFromSec = reducer(addOptionedCourseToSem, removeCourseFromSections({ code: 'TEST1201', ...testCourse }))

  expect(removeOptCourseFromSec.degrees[0].majorCodes[0].sections[0].sectionCodesWithOptions).toEqual([{
    optionCode: 'TEST1201+TEST1301',
    courses: [{ code: 'TEST1301', ...testCourse }]
  }])

  expect(removeOptCourseFromSec.years[0].sem1).toEqual([{ code: 'TEST1401', ...testCourse }, { code: 'TEST1201', ...testCourse }])
  expect(removeOptCourseFromSec.degrees[0].currentUnits).toBe(4)
  expect(removeOptCourseFromSec.degrees[0].majorCodes[0].currentUnits).toBe(4)
  expect(removeOptCourseFromSec.degrees[0].majorCodes[0].sections[0].currentUnits).toBe(4)

  const removeOptCourseFromYear = reducer(removeOptCourseFromSec, removeCourseFromYears({ yearId: 1, semester: SemesterType.SemOne, course: { code: 'TEST1201', ...testCourse } }))
  const addOptCourseToSect = reducer(removeOptCourseFromYear, addCourseBackToSection({ code: 'TEST1201', ...testCourse }))

  expect(addOptCourseToSect.degrees[0].majorCodes[0].sections[0].sectionCodesWithOptions).toEqual([{
    optionCode: 'TEST1201+TEST1301',
    courses: [{ code: 'TEST1301', ...testCourse }, { code: 'TEST1201', ...testCourse }]
  }])
  expect(addOptCourseToSect.years[0].sem1).toEqual([{ code: 'TEST1401', ...testCourse }])
  expect(addOptCourseToSect.degrees[0].currentUnits).toBe(2)
  expect(addOptCourseToSect.degrees[0].majorCodes[0].currentUnits).toBe(2)
  expect(addOptCourseToSect.degrees[0].majorCodes[0].sections[0].currentUnits).toBe(2)
})

// Test adding an elective
test('electiveWorkflow', () => {
  const elective = { code: 'TEST2401', mcode: 'ELECTIVE', name: 'ELECTIVE', ...baseCourse }
  const addedElective = reducer(exampleUser, setElective({ dcode: 'testCode', elective: elective }))
  const addCourseSem = reducer(addedElective, addCourseToSemester({ yearId: 1, semester: SemesterType.SemTwo, course: elective }))
  const removeCourseSect = reducer(addCourseSem, removeCourseFromSections(elective))

  expect(removeCourseSect.years[0].sem2).toEqual([elective])
  expect(removeCourseSect.degrees[0].currentUnits).toBe(4)
  expect(removeCourseSect.degrees[0].elective).toBe(undefined)
  expect(removeCourseSect.degrees[0].majorCodes[0].currentUnits).toBe(2)
  expect(removeCourseSect.degrees[0].majorCodes[0].sections[0].currentUnits).toBe(2)
})
