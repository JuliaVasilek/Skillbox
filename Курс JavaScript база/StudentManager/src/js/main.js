(() => {

  let box = document.createElement('div');
  box.style.padding = '40px';
  let tempStudentsArray;

  function getStorage(storageKey) {
    return JSON.parse(localStorage.getItem(storageKey));
  }

  function setStorage(storageKey, aStorage) {
    localStorage.setItem(storageKey, JSON.stringify(aStorage));
  }

  function createTitle() {
    const title = document.createElement('h1');
    title.textContent = 'Панель управления студентами';
    title.style.textAlign = 'center';
    title.style.fontSize = '40px';

    return title;
  }

  function createFullName(obj) {
    let fullName;
    if (obj.fio === undefined) {
      fullName = `${obj.name} ${obj.lastname} ${obj.surname}`;
    } else {
      fullName = obj.fio;
    }

    return fullName;
  }

  function createFullBirthday(obj) {

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const birthday = new Date(obj.birthday);
    const birthdayThisYear = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

    let age = today.getFullYear() - birthday.getFullYear();
    if (today < birthdayThisYear) {
      age = age-1;
    }

    const birthdayInfo = `${birthday.getDate()}.${birthday.getMonth()}.${birthday.getFullYear()} (возраст: ${age})`;

    return {birthdayInfo, age};
  }

  function calculateUniYear(obj) {
    const firstYear = parseInt(obj.studyStart);
    const lastYear = firstYear + 4;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const uniYearStart = new Date(now.getFullYear(), 8, 1);

    let uniYear = now.getFullYear() - firstYear;
    if (today > uniYearStart) {
      uniYear = uniYear + 1;
    }
    let uniYearString = `${uniYear} курс`;

    if (today.getFullYear() > lastYear) {
      uniYearString = 'закончил(а)';
    }

    if ((today > uniYearStart) && (today.getFullYear() = lastYear)) {
      uniYearString = 'закончил(а)';
    }

    const uniYearsInfo = `${firstYear}-${lastYear} (${uniYearString})`;

    return {uniYearsInfo, firstYear, lastYear, uniYearString};
  }

  function filterFunction(arr, prop, value) {
    let result = [];
    let copy = [...arr];
    for (const item of copy) {
      if (String(item[prop]).toLowerCase().includes(value.toLowerCase()) == true) {
        result.push(item);
      }
    }
    return result;
  }

  function createFilterElement() {
    const filterBlock = document.createElement('div');
    const title = document.createElement('div');
    const nameInput = document.createElement('input');
    const facultyInput = document.createElement('input');
    const studyStartInput = document.createElement('input');
    const lastUniYearInput = document.createElement('input');
    const button = document.createElement('button');

    nameInput.classList.add('form-control', 'mb-2', 'nameFilterInput');
    facultyInput.classList.add('form-control', 'mb-2', 'facultyFilterInput');
    studyStartInput.classList.add('form-control', 'mb-2', 'studyStartFilterInput');
    lastUniYearInput.classList.add('form-control', 'mb-2', 'lastUniYearFilterInput');
    button.classList.add('btn', 'btn-primary', 'mb-4', 'filterButton');

    filterBlock.style.width = '450px';
    filterBlock.style.margin = 'auto';
    title.textContent = 'Фильтр';
    title.style.fontSize = '25px';
    title.style.textAlign = 'center';
    nameInput.placeholder = 'Ф.И.О.';
    facultyInput.placeholder = 'Факультет';
    studyStartInput.placeholder = 'Год поступления';
    lastUniYearInput.placeholder = 'Год окончания';
    button.textContent = 'Применить фильтр';

    filterBlock.append(title);
    filterBlock.append(nameInput);
    filterBlock.append(facultyInput);
    filterBlock.append(studyStartInput);
    filterBlock.append(lastUniYearInput);
    filterBlock.append(button);

    return {filterBlock, nameInput, facultyInput, studyStartInput, lastUniYearInput, button}
  }

  function createAStudentElement(obj, { onDelete }) {
    let student = document.createElement('div');
    student.classList = 'row';
    let fullName = document.createElement('div');
    let faculty = document.createElement('div');
    let birthday = document.createElement('div');
    let studyYear = document.createElement('div');
    const deleteBtn = document.createElement('button');
    fullName.classList.add('col');
    faculty.classList.add('col');
    birthday.classList.add('col');
    studyYear.classList.add('col');
    deleteBtn.classList.add('col');

    fullName.textContent = createFullName(obj);
    faculty.textContent = obj.faculty;
    birthday.textContent = createFullBirthday(obj).birthdayInfo;
    studyYear.textContent = calculateUniYear(obj).uniYearsInfo;
    deleteBtn.textContent = 'Удалить';

    deleteBtn.addEventListener('click', () => {
      onDelete({ obj, element: student});
    });

    student.append(fullName);
    student.append(faculty);
    student.append(birthday);
    student.append(studyYear)
    student.append(deleteBtn);

    return {student, fullName, faculty, birthday, studyYear};
  }

  function createAStudentForm() {
    const form = document.createElement('form');
    const title = document.createElement('legend');
    const nameInput = document.createElement('input');
    const lastnameInput = document.createElement('input');
    const surnameInput = document.createElement('input');
    const facultyInput = document.createElement('input');
    const birthdayInput = document.createElement('input');
    const studyYearInput = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('mt-3');
    form.style.width = '450px';
    form.style.margin = 'auto';
    title.textContent = 'Форма добавления нового студента';
    title.style.textAlign = 'center';
    nameInput.classList.add('form-control', 'mb-2');
    nameInput.placeholder = 'Имя';
    lastnameInput.classList.add('form-control', 'mb-2');
    lastnameInput.placeholder = 'Отчество';
    surnameInput.classList.add('form-control', 'mb-2');
    surnameInput.placeholder = 'Фамилия';
    facultyInput.classList.add('form-control', 'mb-2');
    facultyInput.placeholder = 'Факультет';
    birthdayInput.classList.add('form-control', 'mb-2');
    birthdayInput.type = 'date';
    birthdayInput.placeholder = 'День рождения';
    studyYearInput.classList.add('form-control', 'mb-2');
    studyYearInput.placeholder = 'Год поступления';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить студента';

    buttonWrapper.append(button);
    form.append(title);
    form.append(nameInput);
    form.append(lastnameInput);
    form.append(surnameInput);
    form.append(facultyInput);
    form.append(birthdayInput);
    form.append(studyYearInput);
    form.append(buttonWrapper);

    return {
      form,
      nameInput,
      lastnameInput,
      surnameInput,
      facultyInput,
      birthdayInput,
      studyYearInput,
      button
    };
  }

  function createTableNav() {
    let nav = document.createElement('div');
    nav.classList.add('row', 'nav');
    let fio = document.createElement('a');
    let faculty = document.createElement('a');
    let birthday = document.createElement('a');
    let studyYear = document.createElement('a');
    let empty = document.createElement('div');
    fio.classList.add('col', 'navItem', 'fioNavItem');
    faculty.classList.add('col', 'navItem', 'facultyNavItem');
    birthday.classList.add('col', 'navItem', 'birthdayNavItem');
    studyYear.classList.add('col', 'navItem', 'studyYearNavItem');
    empty.classList.add('col');

    fio.textContent = 'Ф.И.О.';
    faculty.textContent = 'Факультет';
    birthday.textContent = 'Дата рождения';
    studyYear.textContent = 'Годы обучения';

    nav.append(fio);
    nav.append(faculty);
    nav.append(birthday);
    nav.append(studyYear);
    nav.append(empty);

    return {nav, fio, faculty, birthday, studyYear};
  }

  function sortFunction(arr, prop, dir = false) {
    let tempArr = [...arr];
    tempArr.sort((a, b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 1);
    return tempArr;
  }

  const handler = {
    onDelete({ obj, element }) {
      if (!confirm('Вы уверены?')) {
        return;
      }
      element.remove();
      fetch(`http://localhost:3000/api/students/${obj.id}`, {
        method: 'DELETE',
      });
    },
  };

  function createStudentList(studentsArray) {

    let studentList = document.createElement('div');
    studentList.classList.add('container', 'studentList');
    let tableNav = createTableNav();
    studentList.append(tableNav.nav);

    studentsArray.forEach(student => {
      let studentItem = createAStudentElement(student, handler);
      studentList.append(studentItem.student);
    });



    function sortEvent(where, what) {
      where.addEventListener('click', () => {

        let sortedArray = sortFunction(tempStudentsArray, what);

        let list = document.querySelector('.studentList');
        list.innerHTML = '';
        list.append(tableNav.nav);
        for (const arrayItem of sortedArray) {
          let studentItem = createAStudentElement(arrayItem, handler);
          list.append(studentItem.student);
        }
      });
    }

    sortEvent(tableNav.fio, 'fio');
    sortEvent(tableNav.faculty, 'faculty');
    sortEvent(tableNav.birthday, 'birthday');
    sortEvent(tableNav.studyYear, 'studyStart');

    return {studentList, tableNav};
  }

  async function createNewStudent(studentsName, studentsLastname, studentsSurname, studentsBirthday, studentsStudyStart, studentsFaculty) {
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      body: JSON.stringify({
        name: studentsName,
        lastname: studentsLastname,
        surname: studentsSurname,
        birthday: studentsBirthday,
        studyStart: studentsStudyStart,
        faculty: studentsFaculty,
      }),
      headers: {
        'Content-Type': 'applications/json',
      }
    });
    const newStudent = await response.json();
    return newStudent;
  }

  async function getAllStudents() {
    const response = await fetch('http://localhost:3000/api/students');
    const studentsArray = await response.json();
    return studentsArray;
  }

  async function createControlPanel() {

    let studentsArray = await getAllStudents();



    //Тестовые данные

    // createNewStudent('Иван', 'Павлович', 'Киселев', new Date(2002, 11, 24), 2020, 'Математические науки');
    // createNewStudent('Петр', 'Валерьевич', 'Панов', new Date(2001, 06, 05), 2019, 'Филология');
    // createNewStudent('Константин', 'Михайлович', 'Дугаев', new Date(1999, 03, 30), 2017, 'Математические науки');
    // createNewStudent('Валентина', 'Григорьевна', 'Мишаева', new Date(1998, 10, 01), 2016, 'Математические науки');
    // createNewStudent('Полина', 'Андреевна', 'Большова', new Date(2000, 07, 29), 2020, 'Робототехника');
    // createNewStudent('Злата', 'Павловна', 'Сорокина', new Date(2003, 05, 15), 2022, 'Политология');



    tempStudentsArray = [...studentsArray];
    tempStudentsArray.forEach( (item) => {
      item.fio = `${item.name} ${item.lastname} ${item.surname}`;
    });

    const title = createTitle();

    const filter = createFilterElement();

    let studentListBlock = createStudentList(tempStudentsArray);
    let studentList = studentListBlock.studentList;
    let studentListNav = studentListBlock.tableNav;

    const studentForm = createAStudentForm();

    const errorBox = document.createElement('div');

    function initiateFilter(arr) {
      const list = document.querySelector('.studentList');
      list.innerHTML = '';

      const nameInputVal = document.querySelector('.nameFilterInput').value;
      const facultyInputVal = document.querySelector('.facultyFilterInput').value;
      const studyStartInputVal = document.querySelector('.studyStartFilterInput').value;
      const lastUniYearInputVal = document.querySelector('.lastUniYearFilterInput').value;

      if (nameInputVal !== '') {arr = filterFunction(arr, 'fio', nameInputVal);}
      if (facultyInputVal !== '') {arr = filterFunction(arr, 'faculty', facultyInputVal)}
      if (studyStartInputVal !== '') {arr = filterFunction(arr, 'studyStart', studyStartInputVal)}
      if (lastUniYearInputVal !== '') {arr = filterFunction(arr, 'studyStart', lastUniYearInputVal-4)}

      list.append(studentListNav.nav);

      for (const item of arr) {
        const filteredStudent = createAStudentElement(item, handler);
        list.append(filteredStudent.student);
      }
      tempStudentsArray = arr;
    }

    filter.button.addEventListener('click', () => {
      initiateFilter(studentsArray);
    });

    studentForm.form.addEventListener('submit', async e => {
      e.preventDefault();

      let studentsName = studentForm.nameInput.value.trim();
      let studentsLastname = studentForm.lastnameInput.value.trim();
      let studentsSurname = studentForm.surnameInput.value.trim();
      let studentsBirthday = studentForm.birthdayInput.valueAsDate;
      let studentsStudyStart = studentForm.studyYearInput.value.trim();
      let studentsFaculty = studentForm.facultyInput.value.trim();

      errorBox.innerHTML = '';

      //Валидация формы
      if (!studentsName || !studentsLastname || !studentsSurname || !studentsBirthday || !studentsStudyStart || !studentsFaculty) {
        errorBox.style.color = 'red';
        errorBox.style.paddingTop = '20px';

        const errorMessage = 'Ошибки: '
        errorBox.append(errorMessage);
        if (!studentsName) {
          const nameError = 'Введите имя; ';
          errorBox.append(nameError);
        }

        if (!studentsLastname) {
          const lastnameError = 'Введите отчество; ';
          errorBox.append(lastnameError);
        }

        if (!studentsSurname) {
          const surnameError = 'Введите фамилию; ';
          errorBox.append(surnameError);
        }

        if (!studentsBirthday) {
          const birthdayError = 'Введите дату рождения; ';
          errorBox.append(birthdayError);
        }

        if (!studentsStudyStart) {
          const uniYearError = 'Введите год поступления; ';
          errorBox.append(uniYearError);
        }

        if (!studentsFaculty) {
          const facultyError = 'Введите факультет; ';
          errorBox.append(facultyError);
        }
      }

      if ((studentsBirthday < new Date(1900, 01, 01)) || (studentsBirthday > new Date(Date.now()))) {
        const birthdayError = 'Дата рождения указана неверно; ';
        errorBox.append(birthdayError);
      }

      if (((studentsStudyStart < 2000) || (studentsStudyStart > new Date(Date.now()).getFullYear())) && (studentsStudyStart)) {
        const uniYearError = 'Год поступления указан неверно; ';
        errorBox.append(uniYearError);
      }

      box.append(errorBox);

      //Создание студента если валидация пройдена успешно

      if (errorBox.innerHTML === '') {

        let newStudent = await createNewStudent(studentsName, studentsLastname, studentsSurname, studentsBirthday, studentsStudyStart, studentsFaculty);

        newStudent.fio = `${newStudent.name} ${newStudent.lastname} ${newStudent.surname}`;

        tempStudentsArray.push(newStudent);

        const studentItem = createAStudentElement(newStudent, handler);

        studentList.append(studentItem.student);

        studentForm.nameInput.value = '';
        studentForm.lastnameInput.value = '';
        studentForm.surnameInput.value = '';
        studentForm.birthdayInput.value = '';
        studentForm.studyYearInput.value = '';
        studentForm.facultyInput.value = '';
      }
    });

    box.append(title);
    box.append(filter.filterBlock);
    box.append(studentList);
    box.append(studentForm.form);

    document.body.append(box);
  }

  document.addEventListener('DOMContentLoaded', () => {

    createControlPanel();

  });

})();
