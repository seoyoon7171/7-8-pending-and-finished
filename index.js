const listForm = document.querySelector(".js-listForm");
const listInput = listForm.querySelector("input");
const listPending = document.querySelector(".js-pending");
const listFinished = document.querySelector(".js-finished");
const PENDING = "PENDING";
const FINISHED = "FINISHED";

let LIST_PENDING = [];
let LIST_FINISHED = [];

function showFinished(finishedObj) {
  const list = document.createElement("li");
  const delButton = document.createElement("button");
  delButton.innerText = "❌"; // (window)+(.)
  delButton.addEventListener("click", eventHandler.deleteByXFinished); ////// ❌실행
  const backButton = document.createElement("button");
  backButton.innerText = "❤";
  backButton.addEventListener("click", eventHandler.backTo);
  console.log(finishedObj.text, finishedObj.id);
  const span = document.createElement("span");
  span.innerText = finishedObj.text;
  list.id = finishedObj.id;
  list.appendChild(span);
  list.appendChild(delButton);
  list.appendChild(backButton);
  listFinished.appendChild(list);
}
function showPending(pendingObj) {
  const list = document.createElement("li");
  const delButton = document.createElement("button");
  delButton.innerText = "❌"; // (window)+(.)
  delButton.addEventListener("click", eventHandler.deleteByXPending); ////// ❌실행
  const saveButton = document.createElement("button");
  saveButton.innerText = "✅";
  saveButton.addEventListener("click", eventHandler.saveByV);
  console.log(pendingObj.text, pendingObj.id);
  const span = document.createElement("span");
  span.innerText = pendingObj.text;
  list.id = pendingObj.id;
  list.appendChild(span);
  list.appendChild(delButton);
  list.appendChild(saveButton);
  listPending.appendChild(list);
}
const eventHandler = {
  deleteByXPending: function (event) {
    const btn = event.target;
    const li = btn.parentNode;
    listPending.removeChild(li);
    const cleanToDos = LIST_PENDING.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    LIST_PENDING = cleanToDos;
    putToLocal();
  },
  saveByV: function (event) {
    eventHandler.deleteByXPending(event);
    const btn = event.target;
    const li = btn.parentNode;
    const newid = LIST_FINISHED.length + 100;
    const text = li.querySelector("span").innerText;
    const finishedObj = {
      text: text,
      id: newid,
    };
    showFinished(finishedObj);
    LIST_FINISHED.push(finishedObj);
    putToLocal2();
  },
  deleteByXFinished: function (event) {
    const btn = event.target;
    const li = btn.parentNode;
    listFinished.removeChild(li);
    const cleanToDos = LIST_FINISHED.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    LIST_FINISHED = cleanToDos;
    putToLocal2();
  },
  backTo: function (event) {
    eventHandler.deleteByXFinished(event);
    const btn = event.target;
    const li = btn.parentNode;
    const newid = LIST_PENDING.length + 100;
    const text = li.querySelector("span").innerText;
    const pendingObj = {
      text: text,
      id: newid,
    };
    showPending(pendingObj);
    LIST_PENDING.push(pendingObj);
    putToLocal();
  },
};

function putToLocal() {
  localStorage.setItem("PENDING", JSON.stringify(LIST_PENDING)); // 로컬 스토리지에 담아
}
function putToLocal2() {
  localStorage.setItem("FINISHED", JSON.stringify(LIST_FINISHED)); // 로컬 스토리지에 담아
}

function putList(text) {
  const li = document.createElement("li");

  const delButton = document.createElement("button");
  delButton.innerText = "❌"; // (window)+(.)
  delButton.addEventListener("click", eventHandler.deleteByXPending); ////// ❌실행

  const saveButton = document.createElement("button");
  saveButton.innerText = "✅";
  saveButton.addEventListener("click", eventHandler.saveByV); ////// ✅실행

  const span = document.createElement("span");
  const newId = LIST_PENDING.length + 1;
  console.log(newId);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delButton);
  li.appendChild(saveButton);
  li.id = newId; //li 에 Id 입력
  listPending.appendChild(li);
  const pendingObj = {
    text: text,
    id: newId,
  };
  LIST_PENDING.push(pendingObj); //push 쓰면 array에 object 넣어줄 수 있음
  putToLocal(); //push하고 넣어
}

function putList2(text, newId) {
  const li = document.createElement("li");
  const delButton = document.createElement("button");
  delButton.innerText = "❌"; // (window)+(.)
  delButton.addEventListener("click", eventHandler.deleteByXFinished); ////// ❌실행
  const saveButton = document.createElement("button");
  saveButton.innerText = "❤";
  saveButton.addEventListener("click", eventHandler.backTo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delButton);
  li.appendChild(saveButton);
  li.id = newId; //li 에 Id 입력
  listFinished.appendChild(li);
}

function handleSubmit(event) {
  // 그냥 간단 핸들링
  event.preventDefault();
  const currentValue = listInput.value; //toDoForm(HTML으로부터)의 값을 불러와
  putList(currentValue); //html에 <리스트 삽입>
  listInput.value = "";
}

function loadLocal() {
  //예전에 썼던걸 local storage에 담아뒀다가 다시꺼냄.
  const loadedLocalList = localStorage.getItem("PENDING");
  if (loadedLocalList !== null) {
    const parsedLLL = JSON.parse(loadedLocalList); //이쁘게 가져오려고 바꿈.
    //array는 forEach라는걸 가짐.array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜줌)
    parsedLLL.forEach(function (a) {
      putList(a.text);
    }); //forEach 때문에 각각의 parsedToDos에 대해 puList라는 함수 호출
  }
}
function loadLocal2() {
  const loadedLocalList2 = localStorage.getItem("FINISHED");
  if (loadedLocalList2 !== null) {
    const parsedLLL2 = JSON.parse(loadedLocalList2);
    parsedLLL2.forEach(function (a) {
      putList2(a.text, a.id);
    });
  }
}

function init() {
  loadLocal();
  loadLocal2();
  listForm.addEventListener("submit", handleSubmit);
}

init();
