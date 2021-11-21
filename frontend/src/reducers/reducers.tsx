import { Page, User, Year, Degree, DegreeOption, SectionCodeWithoutOptions, SemesterType, Major, Section, Course, MajorType } from '../types/types';
import { createStore } from 'redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Need to transfer over data from before redux adoption
const existingUser = window.localStorage.getItem("user")
const parseExistingUser = existingUser != null ? JSON.parse(existingUser) : null

const initialPageState : User = parseExistingUser != null ? {
    page: parseExistingUser.stage,
    degrees: parseExistingUser.degrees,
    years: parseExistingUser.years,
    sectionsSelected: parseExistingUser.sectionsSelected,
} : {
    page: Page.RequestDegree,
    degrees: [],
    years: [],
    sectionsSelected: false,
}

const userSlice = createSlice({
    name: 'userState',
    initialState: initialPageState,
    reducers: {
      resetState: (state) => {
        state.page = Page.RequestDegree;
        state.degrees = [];
        state.years = [];
        state.sectionsSelected = false;
      },
      changePage: (state, action: PayloadAction<Page>) => {
        state.page = action.payload;
      },

      toggleSectionsSelected: (state) => {
          state.sectionsSelected = !state.sectionsSelected;
      },

      addDegree: (state, action: PayloadAction<Degree>) => {
        state.degrees.push(action.payload);
      },

      addDegreeOption: (state, action: PayloadAction<DegreeOption>) => {
        state.degrees[state.degrees.length - 1].degreeOption = action.payload;
      },
      addMajor: (state, action: PayloadAction<{major: Major, unshift: boolean}>) => {
        let majorArray;
        if (action.payload.major.type === MajorType.Major) {
          majorArray = state.degrees[state.degrees.length - 1].majorCodes;
        } else if (action.payload.major.type === MajorType.Minor) {
          majorArray = state.degrees[state.degrees.length - 1].minorCodes;
        } else if (action.payload.major.type === MajorType.ExtendedMajor) {
          majorArray = state.degrees[state.degrees.length - 1].extendedMajorCodes;
        } else {
          return;
        }

        if (action.payload.unshift) {
          majorArray.unshift(action.payload.major)
        } else {
          majorArray.push(action.payload.major)
        }
      },
      removeMajorCode: (state, action: PayloadAction<{type: MajorType, mcode: string}>) => {
        let majorArray;
        if (action.payload.type === MajorType.Major) {
          majorArray = state.degrees[state.degrees.length - 1].majorCodes;
        } else if (action.payload.type === MajorType.Minor) {
          majorArray = state.degrees[state.degrees.length - 1].minorCodes;
        } else if (action.payload.type === MajorType.ExtendedMajor) {
          majorArray = state.degrees[state.degrees.length - 1].extendedMajorCodes;
        } else {
          return;
        }
        majorArray = majorArray.filter(major => major.mcode != action.payload.mcode)
      },
      addSections: (state, action: PayloadAction<{dcode: string, mcode: string, type: MajorType, sections: Section[]}>) => {
        const degree = state.degrees.find(x => x.code === action.payload.dcode);
        let majorArray;
        if (action.payload.type === MajorType.Major) {
          majorArray = degree?.majorCodes;
        } else if (action.payload.type === MajorType.Minor) {
          majorArray = degree?.minorCodes;
        } else if (action.payload.type === MajorType.ExtendedMajor) {
          majorArray = degree?.extendedMajorCodes;
        } else {
          return;
        }
        const major = majorArray?.find(x => x.mcode === action.payload.mcode);
        if (major) {
          major.sections = action.payload.sections;
        }
      },
      setElective: (state, action: PayloadAction<{dcode: string, elective: Course}>) => {
        const degree = state.degrees.find(x => x.code === action.payload.dcode);
        if (degree) {
          degree.elective = action.payload.elective;
        }
      },
      addYear: (state) => {
        const newYear : Year = {
            id: state.years.length + 1,
            finalYear: true,
            sem1: [],
            sem2: [],
            sum: [],
        };
        state.years.push(newYear);
        if (state.years.length > 1) {
          state.years[state.years.length - 2].finalYear = false;
        };
       },
       removeYear: (state) => {
         if (state.years.length > 0) {
          state.years.pop();
         }
         if (state.years.length > 0) {
          state.years[state.years.length - 1].finalYear = true;
      }
       },
       addCourseBackToSection: (state, action: PayloadAction<Course>) => {
        const degree = state.degrees.find(degree => degree.code === action.payload.dcode);
        const major = degree?.majorCodes.concat(degree?.minorCodes, degree?.extendedMajorCodes).find(major => major.mcode === action.payload.mcode);
        const section = major?.sections.find(section => section.name === action.payload.name);
        const optionedCourseContainingCourse = section?.sectionCodesWithOptions.find(sectionCode => sectionCode.optionCode.includes(action.payload.code));
        // If there's a optioned course that contains the course code then it goes there
        // Otherwise it goes with the non-optioned courses
        if (optionedCourseContainingCourse) {
          optionedCourseContainingCourse.courses.push(action.payload);
        } else if (section) {
          const newSectionCodeWithoutOptions : SectionCodeWithoutOptions = {
            course: action.payload
          }
          section.sectionCodesWithoutOptions.push(newSectionCodeWithoutOptions);
        }
        if (degree && major && section) {
          degree.currentUnits -= action.payload.units;
          major.currentUnits -= action.payload.units;
          section.currentUnits -= action.payload.units;
        }
       },
       reduceDegreeUnits: (state, action: PayloadAction<{dcode: string, units: number}>) => {
        const degree = state.degrees.find(degree => degree.code === action.payload.dcode);
        if (degree) {
          degree.currentUnits -= action.payload.units;
        }
       },
       removeCourseFromYears: (state, action: PayloadAction<{course: Course, yearId: number, semester: SemesterType}>) => {
        const year = state.years.find(year => year.id === action.payload.yearId);
        if (year && action.payload.semester === SemesterType.SemOne) {
          year.sem1 = year.sem1.filter(course => course.code != action.payload.course.code);
        } else if (year && action.payload.semester === SemesterType.SemTwo) {
          year.sem2 = year.sem2.filter(course => course.code != action.payload.course.code);
        } else if (year && action.payload.semester === SemesterType.SumSem) {
          year.sum =  year.sum.filter(course => course.code != action.payload.course.code);
        }
      },
      addCourseToSemester: (state, action: PayloadAction<{yearId: number, semester: SemesterType, course: Course}>) => {
        const year = state.years.find(year => year.id === action.payload.yearId);
        let semester;
        if (action.payload.semester === SemesterType.SemOne) {
            semester = year?.sem1;
        } else if (action.payload.semester === SemesterType.SemTwo) {
            semester = year?.sem2;
        } else {
            semester = year?.sum;
        }
        if (semester) {
          semester.push(action.payload.course);
        }
      },
      removeCourseFromSections: (state, action: PayloadAction<Course>) => {
        const degree = state.degrees.find(degree => degree.code === action.payload.dcode);
        console.log(action.payload)
        if (degree && action.payload.mcode == "ELECTIVE") {
          degree.elective = undefined;
          degree.currentUnits += action.payload.units;
        } else if (degree) {
          const major = degree.majorCodes.concat(degree.minorCodes, degree.extendedMajorCodes).find(major => major.mcode === action.payload.mcode);
          const section =  major?.sections.find(section => section.name === action.payload.name);
          if (section) {
            for (const sectionCode of section.sectionCodesWithOptions) {
              sectionCode.courses = sectionCode.courses.filter(course => course.code !== action.payload.code);
            }
            section.sectionCodesWithoutOptions = section.sectionCodesWithoutOptions.filter(sectionCode => sectionCode.course.code !== action.payload.code);
          }
          if (degree && major && section) {
            degree.currentUnits += action.payload.units;
            major.currentUnits += action.payload.units;
            section.currentUnits += action.payload.units;
          }
        }
       }
    },
  });

const persistConfig = {
    key: 'root',
    storage,
}
const store = createStore(persistReducer(persistConfig, userSlice.reducer))
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const selectPage = (state : User) => state.page;
export const selectDegrees = (state : User) => state.degrees;
export const selectYears = (state : User) => state.years;
export const selectSectionsSelected = (state : User) => state.sectionsSelected;

export const selectLastDegree = (state : User) => state.degrees.length > 0 ? state.degrees[state.degrees.length -1] : null;

export const selectLastDegreeOptions = (state : User) => selectLastDegree(state)?.degreeOption;

export const selectLastMajors = (state : User) => {
    return selectLastDegree(state)?.majorCodes;
}
export const selectLastMinors = (state : User) => {
  return selectLastDegree(state)?.minorCodes;
}
export const selectLastExtendedMajors = (state : User) => {
  return selectLastDegree(state)?.extendedMajorCodes;
}

export const {changePage, toggleSectionsSelected, resetState, addDegree, addDegreeOption, addMajor, addSections, addCourseToSemester, removeCourseFromSections,
  reduceDegreeUnits, addCourseBackToSection, removeCourseFromYears, removeMajorCode, setElective, addYear, removeYear} = userSlice.actions

export {store, persistor}