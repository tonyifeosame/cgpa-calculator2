// Add new course fields dynamically
function addCourse() {
    let coursesDiv = document.getElementById("course-container");
    let newCourse = document.createElement("div");
    newCourse.classList.add("course");
    newCourse.innerHTML = `
        <input type="text" placeholder="Course Name (Optional)">
        <input type="number" class="credit" placeholder="Credit Unit">
        <select class="grade">
            <option value="5">A</option>
            <option value="4">B</option>
            <option value="3">C</option>
            <option value="2">D</option>
            <option value="1">E</option>
            <option value="0">F</option>
        </select>
    `;
    coursesDiv.appendChild(newCourse);
}

// Calculate GPA for the current semester
function calculateGPA() {
    let courses = document.querySelectorAll(".course");
    let totalCredits = 0, totalGradePoints = 0;

    courses.forEach(course => {
        let credit = parseFloat(course.querySelector(".credit").value);
        let grade = parseFloat(course.querySelector(".grade").value);
        
        if (!isNaN(credit) && !isNaN(grade)) {
            totalCredits += credit;
            totalGradePoints += credit * grade;
        }
    });

    let gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    document.getElementById("gpa-result").innerText = `Your GPA: ${gpa}`;
    return { gpa, totalCredits };
}

// Save semester GPA to local storage
function saveSemester() {
    let semesterData = calculateGPA();
    if (semesterData.totalCredits === 0) {
        alert("Enter valid course details!");
        return;
    }

    let savedSemesters = JSON.parse(localStorage.getItem("cgpaData")) || [];
    savedSemesters.push(semesterData);
    localStorage.setItem("cgpaData", JSON.stringify(savedSemesters));

    alert("Semester saved successfully!");
}

// Calculate CGPA across multiple semesters
function calculateCGPA() {
    let savedSemesters = JSON.parse(localStorage.getItem("cgpaData")) || [];
    if (savedSemesters.length === 0) {
        document.getElementById("cgpa-result").innerText = "No semesters saved!";
        return;
    }

    let totalGPA = 0, totalCredits = 0;

    savedSemesters.forEach(data => {
        totalGPA += data.gpa * data.totalCredits;
        totalCredits += data.totalCredits;
    });

    let cgpa = totalCredits > 0 ? (totalGPA / totalCredits).toFixed(2) : 0;
    document.getElementById("cgpa-result").innerText = `Your CGPA: ${cgpa}`;
}
