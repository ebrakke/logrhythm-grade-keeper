import React, { FC, useEffect } from "react";
import { connect } from "react-redux";

import { Thunks, State } from "../redux";
import StudentsTable from "./students-table";
import Stats from "./stats";
import { Student } from "../types";
import "./students.css";
import { Dispatch } from "redux";

type StateProps = {
  students: Student[];
  error?: string;
};

type DispatchProps = {
  getStudents: () => Promise<Student>;
  addStudent: (student: Partial<Student>) => Promise<Student>;
  editStudent: (student: Partial<Student>) => Promise<Student>;
  deleteStudent: (student: Partial<Student>) => Promise<Student>;
};

const mapStateToProps = (state: State) => ({
  students: state.students,
  error: state.error
});

const mapDispatchToProps = (dispatch: any) => ({
  getStudents: () => dispatch(Thunks.getStudents()),
  addStudent: (student: Partial<Student>) =>
    dispatch(Thunks.addStudent(student)),
  editStudent: (student: Partial<Student>) =>
    dispatch(Thunks.editStudent(student)),
  deleteStudent: (student: Partial<Student>) =>
    dispatch(Thunks.deleteStudent(student))
});

type Props = StateProps & DispatchProps;

const Students: FC<Props> = props => {
  useEffect(() => {
    props.getStudents();
  }, []);
  return (
    <div className="students">
      <div className="students-stats d-flex justify-content-center">
        <Stats students={props.students} />
      </div>
      <div className="p-2 container">
        {props.error ? (
          <div className="alert alert-danger">{props.error}</div>
        ) : null}
        <StudentsTable
          students={props.students}
          addStudent={props.addStudent}
          editStudent={props.editStudent}
          deleteStudent={props.deleteStudent}
        />
      </div>
    </div>
  );
};

export default connect<StateProps, DispatchProps, void, State>(
  mapStateToProps,
  mapDispatchToProps
)(Students as any);
