import uuid from "uuid/v4";
import { get } from "lodash";

import { Student } from "./types";
import { validateStudent } from "./util";

/**
 * Retrieve a list of students from a data source.
 * In this case, it will just use local storage
 */
export function getStudents(): Promise<Student[]> {
  const data = localStorage.getItem("students");
  // If there is no data in local storage, just return an empty list
  if (!data) {
    return Promise.resolve([]);
  }

  // Try to parse the data and return the student list
  try {
    const students = JSON.parse(data) as Student[];
    return Promise.resolve(students);
  } catch (error) {
    console.error("Unable to parse stored students", error);
    return Promise.reject("Unable to get students");
  }
}

/**
 * Add a student to local storage
 * Assumption, students cannot have the same first, middle, and last name
 */
export async function addStudent(student: Partial<Student>): Promise<Student> {
  // validate the student here
  // This would also be done at an API layer if one existed
  const invalid = validateStudent(student);
  if (invalid.length > 0) {
    // Add the first error message we see
    return Promise.reject(invalid[0]);
  }
  try {
    const students = await getStudents();
    const duplicate = checkDuplicateStudent(student, students);
    if (duplicate) {
      return Promise.reject(
        "Duplicate student found, please enter a middle name"
      );
    }
    const addedStudent = { ...student, id: uuid() } as Student; // Casting as student since we know it's valid
    localStorage.setItem(
      "students",
      JSON.stringify([addedStudent, ...students])
    );
    return Promise.resolve(addedStudent);
  } catch (error) {
    console.error(error);
    return Promise.reject("Unable to add student");
  }
}

/**
 * Updates an existing student.  If the student doesn't exist, it adds it
 * This assumes that an updated student can't take the same first middle and last name
 * as an existing student
 * @param student
 */
export async function updateStudent(
  student: Partial<Student>
): Promise<Student> {
  const invalid = validateStudent(student);
  if (invalid.length) {
    return Promise.reject(invalid[0]);
  }
  try {
    const students = await getStudents();
    // Check that we didn't rename to a student that already exists
    // Do this by checking against every other student
    const otherStudents = students.filter(s => s.id !== student.id);
    const duplicate = checkDuplicateStudent(student, otherStudents);
    if (duplicate) {
      return Promise.reject(
        "Duplicate student found, please enter a different name"
      );
    }
    localStorage.setItem(
      "students",
      JSON.stringify([student, ...otherStudents])
    );
    return Promise.resolve(student as Student);
  } catch (error) {
    console.error(error);
    return Promise.reject("Unable to update student");
  }
}

/**
 * Remove a student from local storage
 * If the student does not exist, no error will be throw, but the students will remain the same
 * @param student
 */
export async function deleteStudent(
  student: Partial<Student>
): Promise<Student> {
  try {
    const students = await getStudents();
    const updatedStudents = students.filter(s => s.id !== student.id);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    return Promise.resolve(student as Student);
  } catch (error) {
    console.error(error);
    return Promise.reject("Cannot remove user");
  }
}

/**
 * Check if a student shares the same first, last, and middle name
 * This kind of check would be offloaded to a DB with Unique constraints and such
 * This also would not be optimal if the student list grew large as it does a linear search of students
 */
function checkDuplicateStudent(
  student: Partial<Student>,
  students: Student[]
): boolean {
  const duplicate = students.find(s => {
    return (
      s.firstName.toLowerCase() ===
        get(student, "firstName", "").toLowerCase() &&
      s.lastName.toLowerCase() === get(student, "lastName", "").toLowerCase() &&
      get(s, "middleName", "").toLowerCase() ===
        get(student, "middleName", "").toLowerCase()
    );
  });
  return Boolean(duplicate);
}
