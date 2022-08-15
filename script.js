"use strict"

//  POMODORO SELECTS
const pomo = document.querySelector(".pomo");
const short = document.querySelector(".short");
const long = document.querySelector(".long");
const bodyEl = document.querySelector("body");
const timeEl = document.querySelector(".time");
const start = document.querySelector(".btn-start");
const stop = document.querySelector(".btn-stop");
const typeButtons = document.querySelectorAll(".btn-type");
const typeContainer = document.querySelector(".pomodoro-type-btn-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const continueModal = document.querySelector(".continue");
const resetModal = document.querySelector(".reset");
const settingsBtn = document.querySelector(".btn-settings");
const settingModal = document.querySelector(".settings-modal");
const closeSettings = document.querySelector(".close");
const okBtn = document.querySelector(".btn-settings-ok");
const pomoDurationInput = document.querySelector("#pomodoro-time");
const shortDurationInput = document.querySelector("#short-time");
const longDurationInput = document.querySelector("#long-time");


//TO DO  SELECTS
const tasksContainer = document.querySelector(".tasks-container");
const addNewTask = document.querySelector(".add-task");
const addBtn = document.querySelector(".btn-add");
const addForm = document.querySelector(".add-form");
const closeAddFormBtn = document.querySelector("#closeAddForm");
const cancelAddFormBtn = document.querySelector(".cancel-add");
const saveFormBtn = document.querySelector(".btn-add");
const tasknameInput = document.querySelector("#name-add");
const estimatedInput = document.querySelector("#pomo-num-add");
const clrAll = document.querySelector("#clr-all");
const clrFinished = document.querySelector("#clr-finished");

let taskList = [];
let activeTask;
let id = 0;


/**ids are given in order. If there is a task in localstorage, 
 * the id is 1 more than the id of the last task in the list. */
if (localStorage.getItem("taskList") !== null) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
    id = taskList[ taskList.length - 1] + 1;
} 

const showAddForm = function(){
    addNewTask.classList.add("hidden");
    addForm.classList.remove("hidden");
}

const showAddTask = function(){
    addNewTask.classList.remove("hidden");
    addForm.classList.add("hidden");
}

closeAddFormBtn.addEventListener("click",function(){
    showAddTask();
})

cancelAddFormBtn.addEventListener("click",function(){
    showAddTask();
})

addNewTask.addEventListener("click", function(){
    showAddForm();
})

clrAll.addEventListener("click",function(){
    taskList.splice(0, taskList.length);
    displayTasks();
    activeTask = null;
})

clrFinished.addEventListener("click",function(){

    
    taskList.forEach((value) => {

        const deletedIndex = taskList.findIndex(value => value.isFinished === true );

        taskList.splice(deletedIndex,1);
    })

    displayTasks();

})

const closeEditForm = function(id){
    const editForm = document.querySelector(".edit-form");
    const editedTask = document.querySelector(`[data-id = "${id}"]`);

    editedTask.classList.remove("hidden");
    editForm.remove();

}

saveFormBtn.addEventListener("click",function(){
    const newName = tasknameInput.value;
    const newEstimated = +estimatedInput.value;

    const newTask = new Task(newName,newEstimated);
    taskList.push(newTask);

    //clearing input fields
    tasknameInput.value = "";
    estimatedInput.value = "";

    displayTasks();
    showAddTask();
})

class Task{
    constructor(name, estimated){
        this.name = name;
        this.estimated = estimated;

        this.completed = 0;
        this.id = id++;
        this.isActive = false;
        this.isFinished = false;
    }
}


const deleteTask = function(id){

    const deletedIndex = taskList.findIndex(value => value.id == id);
    taskList.splice(deletedIndex,1);

    const deletedTask = document.querySelector(`[data-id = "${id}"]`);
    deletedTask.remove();
}

const saveEdit = function(id){
    const editedTask = document.querySelector(`[data-id = "${id}"]`);
    //const editForm = document.querySelector("edit-form");
    const newName = document.querySelector("#name-edit").value;
    const newEstimated = +document.querySelector("#pomo-num-edit").value;
    const editedIndex = taskList.findIndex(value => value.id == id); 

    if(newEstimated <= taskList[editedIndex].completed ){
        alert("estimated value can not same or smaller than completed pomodoro times");
        return;
    }

    taskList[editedIndex].name = newName;
    taskList[editedIndex].estimated = newEstimated;

    editedTask.querySelector(".taskname").textContent = taskList[editedIndex].name;
    editedTask.querySelector(".estimated").textContent = taskList[editedIndex].estimated;
    
    closeEditForm(id);
    
}

const editTask = function(id){
    const editedTaskEl = document.querySelector(`[data-id = "${id}"]`);
    const editedTask = taskList.find( val => val.id === id );

    const editForm = 
    `<div class="edit-form w-100">
    <div class="edit-header f-between">
        <h4>Edit Task</h4>
        <i onclick="closeEditForm(${id})" id="closeEditForm" class="fa-solid fa-xmark ptr"></i>
    </div>
    <div class="edit-body">
        
        <form>

            <label for="name-edit">Task Name</label>
            <input type="text" name="name-edit" id="name-edit" value="${editedTask.name}">

            <label for="pomo-num-edit">Estimated Pomodoros</label>
            <input type="text" name="pomo-num-edit" id="pomo-num-edit" value="${editedTask.estimated}">

        </form>

    </div>
    <div class="edit-footer f-end">
        <button onclick="closeEditForm(${id})" class="cancel-edit btn-transparent">
            Cancel
        </button>

        <button onclick="saveEdit(${id})" class="btn-edit">Save</button>
    </div>
    </div>
    `
    editedTaskEl.insertAdjacentHTML("afterend", editForm);
    editedTaskEl.classList.add("hidden");
}


const displayTasks = function(){
    tasksContainer.innerHTML = "";

    taskList.forEach(task => {

        const display = task.isActive ? "" : "hidden";
        const finishedTaskstyle = task.isFinished ? "completed-task" : "div-enable-placeholder";

        const taskHtml = 
`   <div class="task f-between w-100 ${finishedTaskstyle}" data-id = "${task.id}">

        <div class="task-left f-center">
            <img class="${display}" src="tomato.png">
            <span class="taskname">${task.name}</span>
            <div class="xd"> 
                <span class="completed"> ${task.completed} </span> / <span class = estimated> ${task.estimated} </span>
            </div>
        </div>

        <div class="task-right f-center">
            <i onclick=deleteTask(${task.id}) id="delete" class="fa-solid fa-trash-can"></i>
            <i onclick="editTask(${task.id})" id="edit" class="fa-solid fa-pen"></i>
        </div>

    </div>

`
    tasksContainer.insertAdjacentHTML("beforeend", taskHtml);

    })   
}

tasksContainer.addEventListener("click",function(e){
    if(e.target.classList.contains("task")){

        const clickedId = +e.target.dataset.id;
        const clickedIndex = taskList.findIndex(val => val.id === clickedId);

        if(taskList[clickedIndex].isActive === true){
            taskList[clickedIndex].isActive = false;
            activeTask = null;
        }
        else{
            taskList.forEach( val => val.isActive = false );
            taskList.forEach( val => {
                if(val.id == clickedId) {
                    val.isActive = true;
                    activeTask = val;
                }
            } );
        }

        displayTasks();
    }
})

displayTasks();//initializing


//POMODORO PART
class PomodoroType{
    constructor(type,duration,bg){
        this.type = type;
        this.duration = duration;
        this.bg = bg;
    }
}

const pomodoro = new PomodoroType("pomo", 25 ,"#D95550");
const shortBreak = new PomodoroType("short", 5, "#4C910E");
const longBreak = new PomodoroType("long", 15 ,"#457CA3");
let activeType = pomodoro;

let timer;
let activeTime = 1;
let isPaused = true;
let time;

//FUNCTİONS FOR POMODORO TİMER
function showStart(){
    start.classList.remove("hidden");
    stop.classList.add("hidden");
} 

function showStop(){
    stop.classList.remove("hidden");
    start.classList.add("hidden");
}

const bellSound = new Audio('bell_sound.wav');
const startTimer = function(minute){

 
    const tick = function(){
  
            const min = String(Math.trunc(time / 60)).padStart(2, 0);
            const sec = String(time % 60).padStart(2, 0);

            timeEl.textContent = `${min}:${sec}`;

            if(time === 0) {
                bellSound.play();
                clearInterval(timer);
                updateUI(activeType);
                isPaused = true;
                showStart();

                if(activeTask && activeType
                    .type === "pomo"){
                    activeTask.completed++;

                    if(activeTask.completed == activeTask.estimated){
                        activeTask.isActive = false;
                        activeTask.isFinished = true;
                        activeTask = null;
                    }

                    displayTasks();
                }
            }

            if(isPaused === false) time--;
                 
    } 

    time = minute * 60;

    tick();
    timer = setInterval(tick, 1000);

    return timer;
}

const updateUI = function(type){
    bodyEl.style.backgroundColor = type.bg;
    timeEl.textContent = `${String(type.duration).padStart(2, 0)}:00`;
    activeTime = type.duration;
}

let target;

typeButtons.forEach(btn => {
    btn.addEventListener("click",function(e){

        if(isPaused === true){
            
            if(btn.classList.contains("pomo")) activeType = pomodoro;
            if(btn.classList.contains("short")) activeType = shortBreak;
            if(btn.classList.contains("long")) activeType = longBreak;

            
            typeButtons.forEach(btn => btn.classList.remove('btn-type-active'));
            btn.classList.add('btn-type-active');

            updateUI(activeType);
        }
        else if(isPaused === false){//If we want to switch to another mode while the counter is running

            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
            
            //stop timer
            if(timer) clearInterval(timer);
            activeTime = time / 60;//second -> minute conversion
            isPaused = true;

            /*While the counter is running, clicking another button to change the mode opens the modal. 
            The target variable is a small delay to make the application run according to the data from the modal.*/
            if(btn.classList.contains("pomo")) target = pomodoro;
            if(btn.classList.contains("short")) target = shortBreak;
            if(btn.classList.contains("long")) target = longBreak;
        
        }

    })
} )

start.addEventListener("click", function(){
 
    isPaused = false;

    if(timer) clearInterval(timer);
    timer = startTimer(activeTime);

    showStop();
})

stop.addEventListener("click",function(e){

    if(timer) clearInterval(timer);
    activeTime = time / 60;//unit conversion

    isPaused = true;
    showStart();
})

continueModal.addEventListener("click",function(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");

    isPaused = false;

    timer = startTimer(activeTime);
})

resetModal.addEventListener("click",function(){

    modal.classList.add("hidden");
    overlay.classList.add("hidden");

    activeTime = activeType.duration;
    activeType = target;

    typeButtons.forEach(btn => btn.classList.remove('btn-type-active'));
    document.querySelector(`.${activeType.type}`).classList.add("btn-type-active");
    updateUI(activeType);
    showStart();

})

settingsBtn.addEventListener("click",function(e){
    pomoDurationInput.value = pomodoro.duration;
    shortDurationInput.value = shortBreak.duration;
    longDurationInput.value = longBreak.duration;

    
    settingModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
})

closeSettings.addEventListener("click",function(e){
    settingModal.classList.add("hidden");
    overlay.classList.add("hidden");
})

okBtn.addEventListener("click",function(e){

    const newPomoDuration = +pomoDurationInput.value;
    const newShorDuration = +shortDurationInput.value;
    const newLongDuration = +longDurationInput.value;

    pomodoro.duration = newPomoDuration;
    shortBreak.duration = newShorDuration;
    longBreak.duration = newLongDuration;

    settingModal.classList.add("hidden");
    overlay.classList.add("hidden");

    updateUI(activeType);
})

//Saving and closing open forms with the "enter" key
document.addEventListener("keypress",function(e){

    if(e.key === "Enter"){
        
        if(!settingModal.classList.contains("hidden")){
            okBtn.click();
        }

        if(!addForm.classList.contains("hidden")){
            saveFormBtn.click();
        }

        const editForm = document.querySelector(".edit-form");
        if(editForm){
            const saveEditBtn = editForm.querySelector(".btn-edit");
            saveEditBtn.click();
        }
    }


})

/**save task list to local storage just before exiting the page */
window.addEventListener("unload",function(){
     localStorage.setItem("taskList", JSON.stringify(taskList));
})

updateUI(pomodoro);//initializng

