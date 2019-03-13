import React, { FC } from "react";
import { Student } from "../types";

/**
 * This is a table for students.  For larger projects, it would be better to make a
 * General use component for styling tables (e.g. <TableHeader /> <TableCell /> etc..)
 * But since this is the only table, it should suffice to put it here
 */

type Props = {
  students: Student[];
};
const StudentTable: FC<Props> = props => {
  return (
    <table className="student-table table">
      <thead>
        <th>First</th>
        <th>Middle</th>
        <th>Last</th>
        <th>Grade</th>
        <th /> {/* Blank row for edit buttons*/}
      </thead>
      <tbody>
        {props.students.map(s => (
          <tr key={s.id}>
            <td>{s.firstName}</td>
            <td>{s.middleName}</td>
            <td>{s.lastName}</td>
            <td>{s.grade}</td>
            <td>Edit button</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
