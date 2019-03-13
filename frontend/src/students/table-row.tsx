import React, { FC, useState } from "react";

import { Student } from "../types";
import EditTableRow from "./edit-table-row";

type Props = {
  student: Student;
  isHilighted: boolean;
};
const TableRow: FC<Props> = props => {
  const [editState, updateEditState] = useState(false);
  if (editState) {
    return (
      <EditTableRow
        student={props.student}
        onCancel={() => updateEditState(false)}
      />
    );
  }
  return (
    <tr key={props.student.id} className={props.isHilighted ? "bg-danger" : ""}>
      <td>{props.student.firstName}</td>
      <td>{props.student.middleName}</td>
      <td>{props.student.lastName}</td>
      <td>{props.student.grade}</td>
      <td>
        <button className="btn btn-info" onClick={() => updateEditState(true)}>
          Edit
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
