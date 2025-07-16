import { Pagination } from 'antd'
import { useContext, useState } from 'react'
import { TaskContext } from '../Context/TaskContext'

export default function TaskList() {
    const {
        taskList,
        handleToggleDone,
        handleDelete,
        setIdEdit,
        setBtnStatus,
        setInputTask
    } = useContext(TaskContext)

    function handleClickEdit(item) {
        setIdEdit(item.id)
        setBtnStatus('Update')
        setInputTask(item.task)
    }

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const startIndex = (currentPage - 1) * itemsPerPage
    const data = taskList.slice(startIndex, currentPage * itemsPerPage)


    return taskList.length <= 0
        ? <p className='text-center py-3 text-red-500'>Task empty</p>
        : <>
            <ul>
                {data.map(item => (
                    <li key={item.id} className='flex items-center justify-between py-3'>
                        <div className='relative'>
                            <p className='text-lg'>{item.task}</p>
                            {item.isDone && <p className='absolute w-full h-0.5 bg-black top-1/2'></p>}
                        </div>
                        <div className='flex items-center gap-1 text-white'>
                            <button className='py-1 px-2 bg-green-600 text-sm cursor-pointer'
                                onClick={() => handleToggleDone(item.id)}
                            >{item.isDone ? 'Undo' : 'Done'}</button>
                            <button className='py-1 px-3 bg-red-600 text-sm cursor-pointer'
                                onClick={() => handleDelete(item.id)}
                            >X</button>
                            <button className='py-1 px-2 bg-yellow-500 text-sm cursor-pointer'
                                onClick={() => handleClickEdit(item)}
                            >Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination
                className='justify-center'
                defaultCurrent={1}
                total={taskList.length}
                pageSize={itemsPerPage}
                onChange={page => setCurrentPage(page)}
            />
        </>

}
