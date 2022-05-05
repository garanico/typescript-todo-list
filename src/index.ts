import { v4 as uuidV4 } from "uuid"

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")


const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)
console.log(tasks)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")

  const deleteButton = document.createElement("button")
  deleteButton.innerHTML = "🗑️"
  deleteButton.id = task.id
  deleteButton.addEventListener("click", deleteListItem)

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title, deleteButton)
  item.append(label)
  list?.append(item)
}

function deleteListItem() {
  console.log("first array",tasks)
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === this.id) {
    tasks.splice(i, 1)
    saveTasks()
    this.parentNode.remove()
    console.log("second array",tasks)
    }
    } 
}




function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}