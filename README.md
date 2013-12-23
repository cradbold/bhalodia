Please host all code in the following public github account: https://github.com/cradbold/bhalodia 
Please communicate with me either by google hangout/chat or email: cradbold@gmail.com

Job posting: Ongoing JS web dev using node, express, backbone, mongodb

Project: Schedule

Iteration: Office hours

Description: This piece is kind of like a professor that makes himself available for students to visit his office with questions.  On one page, only available to the teacher user, he makes himself available by clicking a button (or switch or some other appropriate widget) and there some visual feedback that he has done so.  He is no longer available if he re-clicks another button or if he logs out.  On another page, only available to the student user, he sees a list of available teachers (one of which is the aforementioned teacher who has ‘checked-in’).  The student selects a teacher from the list and sees a confirmation dialog before navigating to a shared page.  Elsewhere in the system, the teacher now receives a confirmation dialog to navigate to a shared page.  Once accepted, the teacher is taken to the same shared page as the student.  On this page is a shared toggle button or widget of some kind.  It could be a checkbox.  If this widget is manipulated by either the student or the teacher, the other sees it.

I will provide some code for you to work around in the repo, though it is not functional.  Please expand on it to complete the description given the requirements below.  Please use node-js, express-js, and backbone-js with mongodb to complete this task.  Use grunt-js for any seed data.

Requirements:
There should be 3 total pages:
* Student dashboard: should contain a live listing of teachers that make themselves available for a meeting
* Teacher dashboard: should contain a toggling switch/button that makes themselves available for a meeting
* Shared/meeting page: should contain an arbitrary widget that when manipulated by one user, can be seen by the other
Student user actions:
* Seeing a list of available teachers, he is able to select one
* Seeing a confirmation dialog, he can either cancel the selection or confirm
* Seeing a widget on the meeting page, he can manipulate it visually
Teacher user actions:
* Seeing a toggling button, he can select and deselect it
* Seeing a confirmation dialog, he can either cancel or confirm
* Seeing a widget on the meeting page, he can manipulate it visually

Estimation: <3 hours; don’t worry about appearance -- please just focus on functionality


