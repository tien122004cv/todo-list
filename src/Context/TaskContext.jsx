import { createContext, useState } from "react";
import uuid from "react-uuid";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext()

const TaskContextProvider = ({ children }) => {
    const [inputTask, setInputTask] = useState('')
    const [taskList, setTaskList] = useState([])
    const [btnStatus, setBtnStatus] = useState('Add task')
    const [idEdit, setIdEdit] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        if (!inputTask.trim()) return
        btnStatus === 'Update' ? handleEdit() : handleAdd()
        setBtnStatus('Add task')
        setInputTask('')
    }

    function handleAdd() {
        const newTask = { id: uuid(), task: inputTask, isDone: false }
        setTaskList([...taskList, newTask])
    }

    function handleToggleDone(id) {
        setTaskList(taskList.map(item => {
            return item.id === id ? { ...item, isDone: !item.isDone } : item
        }))
    }

    function handleDelete(id) {
        setTaskList(taskList.filter(item => item.id !== id))
    }

    function handleEdit() {
        setTaskList(taskList.map(item => {
            return item.id === idEdit ? { ...item, task: inputTask } : item
        }))
    }

    const value = {
        inputTask,
        setInputTask,
        taskList,
        setTaskList,
        btnStatus,
        setBtnStatus,
        handleToggleDone,
        handleDelete,
        handleEdit,
        setIdEdit,
        handleSubmit
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider