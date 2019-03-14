import { get } from "lodash";
import React, { FC, useState, SyntheticEvent } from "react";

import { Student } from "../types";

type Props = {
  student?: Student;
  children: (student: Partial<Student>) => React.ReactElement;
  handleSubmit: (student: Partial<Student>) => void;
  handleBlur?: (student: Partial<Student>) => void;
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

  /**
   * Handle blurring of inputs for students in an edit state
   * Not applied to creating a new student as that would lead to
   * unnecessary errors when filling out the form
   */
  function handleOnBlur(e: SyntheticEvent<HTMLInputElement>) {
    if (!props.handleBlur || !get(editStudentState, "id")) {
      return;
    }
    return props.handleBlur(editStudentState);
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        props.handleSubmit(editStudentState);
      }}
    >
      <div className="row" key={get(props.student, "id", "")}>
        <div className="col">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={get(editStudentState, "firstName", "")}
            onChange={handleChange}
            onBlur={handleOnBlur}
            autoFocus={true}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name (Optional)"
            value={get(editStudentState, "middleName", "")}
            onChange={handleChange}
            onBlur={handleOnBlur}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={get(editStudentState, "lastName", "")}
            onChange={handleChange}
            onBlur={handleOnBlur}
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="number"
            name="grade"
            placeholder="Grade (0-100)"
            value={get(editStudentState, "grade", "")}
            onChange={handleChange}
            onBlur={handleOnBlur}
            className="form-control"
          />
        </div>
        <div className="col">
          <div className="btn-list">{props.children(editStudentState)}</div>
        </div>
      </div>
    </form>
  );
};

/**
 * This function will be called anytime an input is blurred for a student with an ID (editing)
 * @param student
 * @param onBlur
 */
function handleOnBlur(
  editStudentState: Partial<Student>,
  onBlur?: (student: Partial<Student>) => void
) {
  if (!onBlur || !editStudentState.id) {
    return;
  }
  return onBlur(editStudentState);
}

export default EditTableRow;
