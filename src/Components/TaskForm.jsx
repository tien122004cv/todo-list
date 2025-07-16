import { useContext } from "react"
import { TaskContext } from "../Context/TaskContext"


export default function TaskForm() {
    const { inputTask, setInputTask, handleSubmit, btnStatus } = useContext(TaskContext)

    return (
        <form className='flex items-center' onSubmit={e => handleSubmit(e)}>
            <input type="text"
                placeholder='Enter Todo'
                className='flex-1 border py-1 pl-2 outline-0'
                value={inputTask}
                onChange={e => setInputTask(e.target.value)}
            />
            <button className='py-2 px-2 bg-black text-white text-sm'>
                {btnStatus}
            </button>
        </form>
    )
}
