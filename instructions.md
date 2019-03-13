### Programming Exercise

Use the Javascript tools and/or libraries of your choice (e.g. React, Angular,  etc.) to implement a page that satisfies the user story below. Please submit a zip file or Git repository containing the solution, including a README with clear instructions on how to get it up-and-running.

#### User Story

As a teacher, I want to enter a list of student names along with his or her test score on a page, so I may see a summary of my class’ performance on a test. The summary shall include the min, max, and average grade.

#### Acceptance Criteria

The list shall support CRUD operations on student names and his or her associated grade.

The list shall support in-line editing of student names and grades, such that changing a test score and pressing enter (or clicking away from the input field) updates the model. Statistics shall automatically update after CRUD operations are performed.

The list shall validate user input.  Students in the list with a grade < 65 shall be highlighted to indicate a failing grade.

#### Guidance

* A randomly chosen member of the team will spend ~30-45 minutes reviewing your exercise, which includes setting it up and interacting with it. Please ensure your README has clear instructions for getting it up-and-running.
* The use of server-side technology (i.e. Node.js) is not required, but you are free to use it.
* You may use any mechanism that seems reasonable to preserve state (i.e. browser local storage, or a restful service), if your solution requires it. The simplest solution that gets the job done is fine, including mocking up a persistent data store.
* You may use any additional Javascript libraries (e.g. Underscore, JQuery, etc), not mandated by the framework that are helpful.
* Don’t overthink / overcomplicate it.
* It’s OK to send us an email if you have any questions.