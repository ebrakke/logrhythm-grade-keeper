import React, { FC } from "react";

import { mockStudents } from "../api";
import StudentsTable from "./students-table";
import Stats from "./stats";
import "./students.css";

const Students: FC = props => {
  return (
    <div className="students">
      <div className="students-stats d-flex justify-content-center">
        <Stats students={mockStudents} />
      </div>
      <div className="p-2 table-responsive">
        <StudentsTable students={mockStudents} />
      </div>
    </div>
  );
};

export default Students;
