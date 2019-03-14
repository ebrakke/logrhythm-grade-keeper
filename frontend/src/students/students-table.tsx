import React, { FC, useState } from "react";

import TableRow from "./table-row";
import EditTableRow from "./edit-table-row";
import { Student } from "../types";

/**
 * This is a table for students.  For larger projects, it would be better to make a
 * General use component for styling tables (e.g. <TableHeader /> <TableCell /> etc..)
 * But since this is the only table, it should suffice to put it here
 */

type Props = {
  students: Student[];
  addStudent: (student: Partial<Student>) => Promise<Student>;
  editStudent: (student: Partial<Student>) => Promise<Student>;
  deleteStudent: (student: Partial<Student>) => Promise<Student>;
};
const StudentTable: FC<Props> = props => {
  const [addStudentState, setAddStudentState] = useState(false);
  return (
    <div className="student-table">
      <div className="row">
        <h4 className="col">First</h4>
        <h4 className="col">Middle</h4>
        <h4 className="col">Last</h4>
        <h4 className="col">Grade</h4>
        <div className="col">
          <button
            className="btn btn-success"
            onClick={() => setAddStudentState(true)}
          >
            Add Student
          </button>
        </div>
      </div>
      {addStudentState ? (
        <EditTableRow
          handleSubmit={(student: Partial<Student>) =>
            props.addStudent(student).then(() => setAddStudentState(false))
          }
        >
          {student => (
            <div className="btn-group">
              <button
                className="btn btn-success"
                onClick={() =>
                  props
                    .addStudent(student)
                    .then(() => setAddStudentState(false))
                }
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setAddStudentState(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </EditTableRow>
      ) : null}
      {props.students.map(s => (
        <TableRow
          student={s}
          isHilighted={shouldHighlightRow(s)}
          editStudent={props.editStudent}
          deleteStudent={props.deleteStudent}
          key={s.id}
        />
      ))}
    </div>
  );
};

/**
 * Determines if the students row should be highlighted
 * @param student
 */
function shouldHighlightRow(student: Student) {
  return student.grade < 65;
}
export default StudentTable;
