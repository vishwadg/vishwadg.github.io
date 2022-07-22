window.onload = function () {
    document.getElementById('all-task').innerHTML = localStorage.getItem("allTask") != null ? localStorage.getItem("allTask") : ""
}

const addTask = function () {
    var oldData = localStorage.getItem("allTask")
    var task = document.getElementById("task-input").value
    localStorage.setItem("allTask", oldData == null ? task : oldData + "\n" + task)
    console.log("allTask", localStorage.getItem("allTask"));
    document.getElementById('all-task').innerHTML = localStorage.getItem("allTask")
    document.getElementById("task-input").value = ""
}

const clearTask = function () {
    localStorage.clear();
    document.getElementById('all-task').innerHTML = localStorage.getItem("allTask") == null && ""
    document.getElementById("task-input").value = ""
    console.log("all cleared")
}