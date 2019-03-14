import { get } from "lodash";

import { Student } from "./types";

/**
 * Utility functions to be used throughout the application
 */

/**
 * Validates that a student object is valid
 * This assumes that a student must have a first name, lastname, and a grade
 * First name must be 2 or more characters
 * Last name must be 2 or more characters
 * Grade must be >= 0
 * @param student
 */
export function validateStudent(student: Partial<Student>): boolean {
  const validFirstName = get(student, "firstName", "").length > 1;
  const validLastName = get(student, "lastName", "").length > 1;
  const validGrade =
    get(student, "grade", -1) >= 0 && get(student, "grade", -1) <= 100;
  return validFirstName && validLastName && validGrade;
}
