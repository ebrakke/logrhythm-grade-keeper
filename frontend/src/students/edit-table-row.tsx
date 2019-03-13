import React, { FC, useState, SyntheticEvent } from "react";

import { Student } from "../types";

type Props = {
  student: Student;
  onCancel: () => void;
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
    <tr key={props.student.id}>
      <td>
        <input
          type="text"
          name="firstName"
          value={editStudentState.firstName}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <input
          type="text"
          name="middleName"
          value={editStudentState.middleName}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <input
          type="text"
          name="lastName"
          value={editStudentState.lastName}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <input
          type="number"
          name="grade"
          value={editStudentState.grade}
          onChange={handleChange}
          className="form-control"
        />
      </td>
      <td>
        <div className="btn-group">
          <button className="btn btn-success">Save</button>
          <button className="btn btn-secondary" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EditTableRow;
