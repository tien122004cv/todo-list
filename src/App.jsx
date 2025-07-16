import TaskForm from './Components/TaskForm'
import TaskList from './Components/TaskList'

export default function App() {
  return (
    <div className='w-100 mx-auto mt-3'>
      <TaskForm />
      <TaskList />
    </div>
  )
}
