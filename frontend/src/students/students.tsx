import React, { FC } from "react";

import { mockStudents } from "../api";
import StudentsTable from "./students-table";

const Students: FC = props => {
  return (
    <div className="students">
      <div className="students-stats">Statistics about your students</div>
      <div className="students-table">
        <StudentsTable students={mockStudents} />
      </div>
    </div>
  );
};

export default Students;
