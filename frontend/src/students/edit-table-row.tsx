import { get } from "lodash";
import React, { FC, useState, SyntheticEvent } from "react";
import uuid from "uuid";

import { Student } from "../types";

type Props = {
  student?: Student;
  children: (student: Student | {}) => React.ReactElement;
};

const EditTableRow: FC<Props> = props => {
  // Using the new set state hook to manage form state
  const [editStudentState, updateEditStudentState] = useState({
    ...props.student
  });

  /**
   * Bound function to update the edit state
   * Name of the input element must map to the attribute in the student
   */
  function handleChange(e: SyntheticEvent<HTMLInputElement>) {
    updateEditStudentState({
      ...editStudentState,
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  return (
    <tr key={get(props.student, "id", "")}>
      <td>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={get(editStudentState, "firstName", "")}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <input
          type="text"
          name="middleName"
          placeholder="Middle Name (Optional)"
          value={get(editStudentState, "middleName", "")}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={get(editStudentState, "lastName", "")}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <input
          type="number"
          name="grade"
          placeholder="Grade (0-100)"
          value={get(editStudentState, "grade")}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <div className="btn-list">{props.children(editStudentState)}</div>
      </td>
    </tr>
  );
};

export default EditTableRow;
