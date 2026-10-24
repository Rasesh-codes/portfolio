const courses = [];

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addCourseBtn');
  if (addBtn) {
    addBtn.addEventListener('click', addCourse);
  }
});

function addCourse() {
  const nameInput = document.getElementById('courseName');
  const creditsInput = document.getElementById('courseCredits');
  const gradeSelect = document.getElementById('courseGrade');

  const name = nameInput.value.trim();
  const credits = parseFloat(creditsInput.value);
  const gradePoint = parseFloat(gradeSelect.value);

  if (!name || isNaN(credits) || credits <= 0) {
    alert('Please enter a valid course name and credit hours.');
    return;
  }

  courses.push({ id: Date.now(), name, credits, gradePoint });

  nameInput.value = '';
  creditsInput.value = '';

  renderCourses();
}

function deleteCourse(id) {
  const index = courses.findIndex(c => c.id === id);
  if (index !== -1) {
    courses.splice(index, 1);
    renderCourses();
  }
}

function renderCourses() {
  const listElement = document.getElementById('courseList');
  listElement.innerHTML = '';

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    totalPoints += course.gradePoint * course.credits;
    totalCredits += course.credits;

    const li = document.createElement('li');
    li.className = 'course-item';
    
    const infoSpan = document.createElement('span');
    infoSpan.innerHTML = `<strong>${course.name}</strong> (${course.credits} Credits) — Grade Point: ${course.gradePoint}`;
    
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.innerHTML = '&times;';
    delBtn.onclick = () => deleteCourse(course.id);

    li.appendChild(infoSpan);
    li.appendChild(delBtn);
    listElement.appendChild(li);
  });

  const gpaDisplay = document.getElementById('gpaDisplay');
  if (totalCredits > 0) {
    const gpa = (totalPoints / totalCredits).toFixed(2);
    gpaDisplay.textContent = gpa;
  } else {
    gpaDisplay.textContent = '0.00';
  }
}