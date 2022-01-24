import React from 'react'
import {useState, useEffect} from 'react'
import Header from './Components/Header'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'

const App = () => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()

    return data
  }

  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()

    return data
  }

  const addTask = async(task) => {
    const response = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await response.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'Delete'})

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const switchReminder = async(id) => {
    const taskToSwitch = await fetchTask(id)
    const updateTaskToSwitch = {...taskToSwitch, reminder: !taskToSwitch.reminder}
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTaskToSwitch)
    })

    const data = await response.json()
    setTasks(
        tasks.map((task) =>
            task.id === id ? { ...task, reminder: data.reminder} : task
        )
    )
  }

  return (
      <div className='container'>
        <Header onAdd={() => setShowAddTaskForm(!showAddTaskForm)} showAdd={showAddTaskForm}/>
        {showAddTaskForm && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? (
            <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onSwitch={switchReminder}/>
        ) : (
            'No Tasks To Show'
        )}
      </div>
  )
}
export default App
