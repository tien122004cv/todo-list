import { useContext } from "react"
import { TaskContext } from "../Context/TaskContext"


export default function TaskForm() {
    const { inputTask, setInputTask, btnStatus, handleSubmit, inputRef } = useContext(TaskContext)
    console.log('comp TaskForm')

    return (
        <form className='flex items-center' onSubmit={handleSubmit}>
            <input type="text"
                placeholder='Enter Todo'
                className='flex-1 border py-1 pl-2 outline-0'
                value={inputTask}
                ref={inputRef}
                onChange={e => setInputTask(e.target.value)}
            />
            <button type='submit' className='py-2 px-2 bg-black text-white text-sm'>
                {btnStatus}
            </button>
        </form>
    )
}
