(() => {
  let students = [];
  let filtredStudents = [];
  let form = document.getElementById('form');
  let titleName = document.getElementById('title-name');
  let titleFaculty = document.getElementById('title-faculty');
  let titleAge = document.getElementById('title-age');
  let titleStudyYears = document.getElementById('title-study-years');
  let now = new Date();
  let tBody = document.getElementById('tbody');
  let filterFullName = document.getElementById('filter-fullname');
  let filterFaculty = document.getElementById('filter-faculty');
  let filterStartYear = document.getElementById('filter-start-year');
  let filterEndYear = document.getElementById('filter-end-year');
  const createTable = (arr) => {

    tBody.innerHTML = '';

    students.forEach(element => {
      let tr = document.createElement('tr');
      let thName = document.createElement('th');
      let thFaculty = document.createElement('th');
      let thAge = document.createElement('th');
      let thStudyYears = document.createElement('th');
      let studentAgeYear;
      let studentAgeMonth;
      let studentAgeDay;
      let startStudyYear;
      let endStudyYear;
      let course;


      thName.textContent = element.surname + ' ' + element.name + ' ' + element.middlename;
      thFaculty.textContent = element.faculty;
      studentAgeYear = new Date(element.age).getFullYear();
      studentAgeMonth = new Date(element.age).getMonth();
      studentAgeDay = new Date(element.age).getDate();
      thAge.textContent = (studentAgeDay + '/' + (studentAgeMonth + 1) + '/' + studentAgeYear) + `(${now.getFullYear() - studentAgeYear} лет)`;
      startStudyYear = new Date(element.startYear).getFullYear();
      endStudyYear = startStudyYear + 4;

      course = `${now.getFullYear() - startStudyYear} курс`;
      if(now.getFullYear() - startStudyYear > 4) {
        course = 'Закончил'
      };
      thStudyYears.textContent = `${startStudyYear}-${endStudyYear}` + `(${course})`;

      tr.append(thName);
      tr.append(thFaculty);
      tr.append(thAge);
      tr.append(thStudyYears);
      tBody.append(tr);
    });
  };


  const sortName = () => {
    students.sort((prev, next) => {
      if(`${prev.surname} ${prev.name} ${prev.middlename}` < `${next.surname} ${next.name} ${next.middlename}`) {
        return -1;
      } else {
        return 1;
      }
  });
  createTable(students);
  };

  const sortFaculty = () => {
    students.sort((prev, next) => {
      if ( prev.name < next.name ) return -1;
      if ( prev.name < next.name ) return 1;
  });
  createTable(students);
  };

  const sortAge = () => {
    students.sort((prev, next) => prev.age - next.age);
    createTable(students);
  };

  const sortStudyYears = () => {
    students.sort((prev, next) => prev.age - next.age);
    createTable(students);
  };

  const getFilterName = () => {
    students.sort((target) => {
      if(`${target.surname} ${target.name} ${target.middlename}`.includes(filterFullName.value)) {
        filtredStudents.push(target)
        return -1;
      } else {
        return 1;
      }
  });
    createTable(filtredStudents);
    console.log(filtredStudents);
  };

  const getFilterFaculty = () => {
    students.sort((target) => {
      if(target.faculty.includes(filterFaculty.value)) {
        filtredStudents.push(target)
        return -1;
      } else {
        return 1;
      }
  });
  createTable(filtredStudents);
  };

  const getFilterStartYear = () => {
    students.sort((target) => {
      if(target.startYear == filterStartYear.value) {
        filtredStudents.push(target)
        return -1;
      } else {
        return 1;
      }
    });
    createTable(filtredStudents);
  };

  const getFilterEndYear = () => {
    students.sort((target) => {
      if(target.startYear == filterEndYear.value - 4) {
        filtredStudents.push(target)
        return -1;
      } else {
        return 1;
      }
    });
    createTable(filtredStudents);
  };


  form.addEventListener('submit', e => {
    e.preventDefault();
    let inputName = document.getElementById('name');
    let inputSurname = document.getElementById('surname');
    let inputMiddlename = document.getElementById('middlename');
    let inputAge = document.getElementById('age');
    let inputStartYear = document.getElementById('start-year');
    let inputFaculty = document.getElementById('faculty');

    form.querySelectorAll('input').forEach((i) => {

      i.classList.remove('is-invalid');
      if(!i.value.trim().length) {
        i.classList.add('is-invalid');
        return false ;
      }
    });

    const checkBirthDate = new Date('01.01.1900');
    if((inputAge.valueAsDate < checkBirthDate) || (inputAge.valueAsDate > now)) {
      inputAge.classList.add('is-invalid');
    };

    if((inputStartYear.value < 2000) || (inputStartYear.valueAsDate > now.getFullYear())) {
      inputStartYear.classList.add('is-invalid');
    };

    if(form.querySelectorAll('.is-invalid').length) {
      return false ;
    };

    const student = {
      name : inputName.value.trim(),
      surname : inputSurname.value.trim(),
      middlename : inputMiddlename.value.trim(),
      age : inputAge.value,
      startYear : inputStartYear.value,
      faculty : inputFaculty.value.trim()
    };

    students.push(student);

    createTable(students);

    e.target.reset();
  });


  titleName.addEventListener('click',sortName);
  titleFaculty.addEventListener('click',sortFaculty);
  titleAge.addEventListener('click',sortAge);
  titleStudyYears.addEventListener('click', sortStudyYears);
  filterFullName.addEventListener('input',getFilterName);
  filterFaculty.addEventListener('input',getFilterFaculty);
  filterStartYear.addEventListener('input',getFilterStartYear);
  filterEndYear.addEventListener('input',getFilterEndYear);
})();
