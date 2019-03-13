import React, { FC } from "react";

import TableRow from "./table-row";
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
        <tr>
          <th>First</th>
          <th>Middle</th>
          <th>Last</th>
          <th>Grade</th>
          <th /> {/* Blank row for edit buttons*/}
        </tr>
      </thead>
      <tbody>
        {props.students.map(s => (
          <TableRow
            student={s}
            isHilighted={shouldHighlightRow(s)}
            key={s.id}
          />
        ))}
      </tbody>
    </table>
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
