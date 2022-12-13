(function(){

  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    if (!input.value) {
      button.setAttribute('disabled', '');
    }

    input.addEventListener('input', function() {
      if (!input.value) {
        button.setAttribute('disabled', '');
      } else {
        button.removeAttribute('disabled');
      }
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button
    };
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(obj) {

    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = obj['name'];

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton
    };

  }

  function createTodoApp(container, title = 'Список дел', storageKey, defaultStorage = [{name: 'Купить хлеб', done: true}, {name: 'Помыть пол', done: false}]) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    let aStorage = [];

    function getStorage(storageKey) {
      return JSON.parse(localStorage.getItem(storageKey));
    }

    function setStorage(storageKey, aStorage) {
      localStorage.setItem(storageKey, JSON.stringify(aStorage));
    }

    //Добавляем дефолтные дела на страницы
    if (JSON.parse(localStorage.getItem('defaultStorage')) === null) {
      localStorage.setItem('defaultStorage', JSON.stringify(defaultStorage));
    }


    //Создаем несколько localStorage
    if (JSON.parse(localStorage.getItem(storageKey)) === null) {
      localStorage.setItem(storageKey, JSON.stringify(aStorage));
    }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);


    defaultStorage = getStorage('defaultStorage');

    // Создание дефолтных дел
    for (let taskInd in defaultStorage) {
      let todoItemFromArray = createTodoItem(defaultStorage[parseInt(taskInd, 10)]);

      //Добавление взаимодействия с кнопками на дефолтных делах
      todoItemFromArray.doneButton.addEventListener('click', function(){
        todoItemFromArray.item.classList.toggle('list-group-item-success');
        if (defaultStorage[parseInt(taskInd, 10)].done === true) {
          defaultStorage[parseInt(taskInd, 10)].done = false;
        } else {
          defaultStorage[parseInt(taskInd, 10)].done = true;
        }

        setStorage('defaultStorage', defaultStorage);
      });

      todoItemFromArray.deleteButton.addEventListener('click', function(){
        if (confirm('Вы уверены?')) {
          todoItemFromArray.item.remove();
          defaultStorage.splice(parseInt(taskInd, 10), 1);

          setStorage('defaultStorage', defaultStorage);
        }
      });

      //Добавление статуса дела
      if (defaultStorage[parseInt(taskInd, 10)].done === true) {
        todoItemFromArray.item.classList.toggle('list-group-item-success');
      }

      //Добавление дефолтного дела в DOM
      todoList.append(todoItemFromArray.item);

    }



    //Вывод дел из localStorage

    aStorage = getStorage(storageKey);

    for (let storageItemInd in aStorage) {
      let itemFromStorage = createTodoItem(aStorage[parseInt(storageItemInd, 10)]);

      //Добавление взаимодействия с кнопками на делах
      itemFromStorage.doneButton.addEventListener('click', function(){
        itemFromStorage.item.classList.toggle('list-group-item-success');
        if (aStorage[parseInt(storageItemInd, 10)].done === true) {
          aStorage[parseInt(storageItemInd, 10)].done = false;
        } else {
          aStorage[parseInt(storageItemInd, 10)].done = true;
        }
        setStorage(storageKey, aStorage);
      });

      itemFromStorage.deleteButton.addEventListener('click', function(){
        if (confirm('Вы уверены?')) {
          itemFromStorage.item.remove();
          aStorage.splice(parseInt(storageItemInd, 10), 1);
          setStorage(storageKey, aStorage);
        }
      });

      //Добавление статуса дела
      if (aStorage[parseInt(storageItemInd, 10)].done === true) {
        itemFromStorage.item.classList.toggle('list-group-item-success');
      }

      todoList.append(itemFromStorage.item);

    }

    //Сохранение в localStorage
    setStorage(storageKey, aStorage);




    // Событие клика на добавление нового дела
    todoItemForm.form.addEventListener('submit', function(e){

      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      } else {
        todoItemForm.button.setAttribute('disabled', '');
      }

      //Создаем объект
      let itemObj = {name: todoItemForm.input.value, done: false};

      //Берем объекты из localStorage и сохраняем созданный объект
      aStorage = getStorage(storageKey);
      aStorage.push(itemObj);
      setStorage(storageKey, aStorage);

      //Создаем дело
      let todoItem = createTodoItem(itemObj);

      //Добавление взаимодействия с кнопками на делах
      todoItem.doneButton.addEventListener('click', function(){
        todoItem.item.classList.toggle('list-group-item-success');
        if (itemObj.done === true) {
          itemObj.done = false;
        } else {
          itemObj.done = true;
        }

        aStorage = getStorage(storageKey);

        for (let aStorageItemInd in aStorage) {
          if (aStorage[parseInt(aStorageItemInd, 10)].name === itemObj.name) {
            aStorage[parseInt(aStorageItemInd, 10)] = itemObj;
          }
        }

        setStorage(storageKey, aStorage);
      });

      todoItem.deleteButton.addEventListener('click', function(){
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();

          aStorage = getStorage(storageKey);

          for (let aStorageItemInd in aStorage) {
            if (aStorage[parseInt(aStorageItemInd, 10)].name === itemObj.name) {
              aStorage.splice(parseInt(aStorageItemInd, 10), 1);
            }
          }

          setStorage(storageKey, aStorage);
        }
      });

      todoList.append(todoItem.item);

      todoItemForm.input.value = '';

    });

  }

  // localStorage.removeItem('defaultStorage');
  // localStorage.removeItem('myStorage');
  // localStorage.removeItem('dadStorage');
  // localStorage.removeItem('momStorage');

  window.createTodoApp = createTodoApp;

})();
