import React, { FC, useState } from "react";

import { Student } from "../types";
import EditTableRow from "./edit-table-row";

type Props = {
  student: Student;
  isHilighted: boolean;
  editStudent: (student: Partial<Student>) => Promise<Student>;
  deleteStudent: (student: Partial<Student>) => Promise<Student>;
};
const TableRow: FC<Props> = props => {
  const [editState, updateEditState] = useState(false);
  if (editState) {
    return (
      <EditTableRow
        student={props.student}
        handleSubmit={student =>
          props.editStudent(student).then(() => updateEditState(false))
        }
        handleBlur={props.editStudent}
      >
        {student => (
          <div className="btn-group">
            <button
              className="btn btn-secondary"
              onClick={() =>
                props.editStudent(student).then(() => updateEditState(false))
              }
            >
              Done
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => props.deleteStudent(student)}
            >
              Delete
            </button>
          </div>
        )}
      </EditTableRow>
    );
  }
  return (
    <div
      key={props.student.id}
      className={`row text-center ${props.isHilighted ? "bg-danger" : null}`}
    >
      <div className="col">{props.student.firstName}</div>
      <div className="col">{props.student.middleName}</div>
      <div className="col">{props.student.lastName}</div>
      <div className="col">{props.student.grade}</div>
      <div className="col">
        <button className="btn btn-info" onClick={() => updateEditState(true)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default TableRow;
