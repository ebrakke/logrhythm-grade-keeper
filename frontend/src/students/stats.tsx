import React, { FC, Fragment } from "react";
import { round, sumBy, minBy, maxBy, get, parseInt } from "lodash";

import { Student } from "../types";

type Props = {
  students: Student[];
};
const Stats: FC<Props> = props => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-header">Average</div>
        <div className="card-body">
          <h4>{averageStudentGrade(props.students)}</h4>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Minimum</div>
        <div className="card-body">
          <h4>{minStudentGrade(props.students)}</h4>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Maximum</div>
        <div className="card-body">
          <h4>{maxStudentGrade(props.students)}</h4>
        </div>
      </div>
    </Fragment>
  );
};

function averageStudentGrade(students: Student[]): number {
  if (students.length === 0) {
    return 0;
  }
  const avg = sumBy(students, s => +s.grade) / students.length;
  return round(avg, 2);
}

function minStudentGrade(students: Student[]): number {
  const maybeMin = minBy(students, s => +s.grade);
  return get(maybeMin, "grade", 0);
}

function maxStudentGrade(students: Student[]): number {
  const maybeMax = maxBy(students, s => +s.grade);
  return get(maybeMax, "grade", 0);
}

export default Stats;
