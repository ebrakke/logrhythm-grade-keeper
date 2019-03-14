import { createAction, createReducer } from "redux-act";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import * as api from "./api";
import { Student } from "./types";

type ThunkResult<R> = ThunkAction<R, State, void, Action>;

export const Actions = {};

const ThunkActions = {
  startLoading: createAction("Start loading"),
  stopLoading: createAction("Stop loading'"),
  error: createAction<string>("Error"),
  getStudents: createAction<Student[]>("Add students"),
  addStudent: createAction<Student>("Add student"),
  updateStudent: createAction<Student>("Update student"),
  deleteStudent: createAction<Student>("Delete student")
};

// Thunks
function getStudents(): ThunkResult<Promise<Student[]>> {
  return async dispatch => {
    dispatch(ThunkActions.startLoading());
    try {
      const students = await api.getStudents();
      dispatch(ThunkActions.getStudents(students));
      dispatch(ThunkActions.stopLoading());
      return students;
    } catch (error) {
      dispatch(ThunkActions.error(error));
      throw error;
    }
  };
}

function addStudent(student: Partial<Student>): ThunkResult<Promise<Student>> {
  return async dispatch => {
    dispatch(ThunkActions.startLoading());
    try {
      const savedStudent = await api.addStudent(student);
      dispatch(ThunkActions.stopLoading());
      dispatch(ThunkActions.addStudent(savedStudent));
      return savedStudent;
    } catch (error) {
      dispatch(ThunkActions.error(error));
      throw error;
    }
  };
}

function editStudent(student: Partial<Student>): ThunkResult<Promise<Student>> {
  return async dispatch => {
    dispatch(ThunkActions.startLoading());
    try {
      const updatedStudent = await api.updateStudent(student);
      dispatch(ThunkActions.stopLoading());
      dispatch(ThunkActions.updateStudent(updatedStudent));
      return updatedStudent;
    } catch (error) {
      dispatch(ThunkActions.error(error));
      throw error;
    }
  };
}

function deleteStudent(
  student: Partial<Student>
): ThunkResult<Promise<Student>> {
  return async dispatch => {
    dispatch(ThunkActions.startLoading());
    try {
      const deletedStudent = await api.deleteStudent(student);
      dispatch(ThunkActions.stopLoading());
      dispatch(ThunkActions.deleteStudent(deletedStudent));
      return deletedStudent;
    } catch (error) {
      dispatch(ThunkActions.error(error));
      throw error;
    }
  };
}

export const Thunks = {
  getStudents,
  addStudent,
  editStudent,
  deleteStudent
};

// Reducer
export type State = {
  students: Student[];
  loading: boolean;
  error?: string;
};

const INITAL_STATE: State = {
  students: [],
  loading: false
};

const reducer = createReducer<State>({}, INITAL_STATE);
export default reducer;

// Assign reducer handlers here
reducer.on(ThunkActions.startLoading, state => ({ ...state, loading: true }));
reducer.on(ThunkActions.stopLoading, state => ({
  ...state,
  loading: false,
  error: undefined
}));
reducer.on(ThunkActions.error, (state, error) => ({
  ...state,
  error,
  loading: false
}));
reducer.on(ThunkActions.getStudents, (state, students) => ({
  ...state,
  students
}));
reducer.on(ThunkActions.addStudent, (state, student) => ({
  ...state,
  students: [student, ...state.students]
}));
reducer.on(ThunkActions.updateStudent, handleUpdateStudent);
reducer.on(ThunkActions.deleteStudent, (state, student) => ({
  ...state,
  students: state.students.filter(s => s.id !== student.id)
}));

// Complex handlers go here

/**
 * Update the student in place
 * @param state
 * @param student
 */
function handleUpdateStudent(state: State, student: Student) {
  const studentIndex = state.students.findIndex(s => s.id === student.id);
  const updatedStudents = [
    ...state.students.slice(0, studentIndex),
    student,
    ...state.students.slice(studentIndex + 1)
  ];
  return { ...state, students: updatedStudents };
}
