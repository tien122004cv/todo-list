import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import uuid from "react-uuid";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext()

const TaskContextProvider = ({ children }) => {
    const [inputTask, setInputTask] = useState('')
    const [taskList, setTaskList] = useState([])
    const [btnStatus, setBtnStatus] = useState('Add task')
    const [taskEdit, setTaskEdit] = useState({})
    const inputRef = useRef(null)
    const URL_API_TASKS = "http://localhost:3000/tasks"

    function handleSubmit(e) {
        e.preventDefault()
        if (!inputTask.trim()) return
        btnStatus === 'Update' ? updateTaskContentById() : addNewTask()
        setBtnStatus('Add task')
        setInputTask('')
    }

    function prepareEditTask(item) {
        setTaskEdit(item)
        setInputTask(item.task)
        setBtnStatus('Update')
        inputRef.current.focus()
    }

    async function getApiTasks() {
        console.log('func getApiTasks')
        try {
            const res = await axios.get(URL_API_TASKS)
            setTaskList(res.data)
        } catch (error) {
            console.error("Failed to fetch tasks", error)
        }
    }

    useEffect(() => {
        getApiTasks()
    }, [])

    async function addNewTask() {
        try {
            const newTask = { id: uuid(), task: inputTask, isDone: false }
            await axios.post(URL_API_TASKS, newTask)
            getApiTasks()
        } catch (error) {
            console.error("Failed to add task", error)
        }
    }

    async function toggleTaskComple(item) {
        await axios.patch(
            `${URL_API_TASKS}/${item.id}`,
            { ...item, isDone: !item.isDone }
        )
        getApiTasks()
    }

    async function deleteTaskById(id) {
        await axios.delete(`${URL_API_TASKS}/${id}`)
        getApiTasks()
    }

    async function updateTaskContentById() {
        await axios.patch(
            `${URL_API_TASKS}/${taskEdit.id}`,
            { ...taskEdit, task: inputTask }
        )
        getApiTasks()
    }

    const value = {
        inputTask,
        setInputTask,
        taskList,
        btnStatus,
        setBtnStatus,
        toggleTaskComple,
        deleteTaskById,
        updateTaskContentById,
        handleSubmit,
        prepareEditTask,
        inputRef
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider