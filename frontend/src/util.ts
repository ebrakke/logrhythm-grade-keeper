import { get, Dictionary } from "lodash";

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
export function validateStudent(student: Partial<Student>): string[] {
  const errors = [];
  if (get(student, "firstName", "").length < 2) {
    errors.push("Firstname must be greater than 1 character");
  }
  if (get(student, "lastName", "").length < 1) {
    errors.push("Lastname must be greater than 1 character");
  }
  if (get(student, "grade", -1) < 0 || get(student, "grade", -1) > 100) {
    errors.push("Grade must be between 0 and 100");
  }
  return errors;
}
