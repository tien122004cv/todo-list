import React, { useReducer } from 'react'

const initialState = {
  task: '',
  taskList: []
}

const ACTIONS = {
  SET_TASK: 'set_task',
  ADD_TASK: 'add_task'
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TASK:
      return { ...state, task: action.payload }
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        task: '',
        taskList: [...state.taskList, state.task]
      }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { task, taskList } = state

  const handleSubmit = () => {
    dispatch({ type: ACTIONS.ADD_TASK })
  }

  const handleInputChange = e => {
    dispatch({ type: ACTIONS.SET_TASK, payload: e.target.value })
  }

  return (
    <div>
      <input type="text"
        className='border outline-0'
        value={task}
        onChange={handleInputChange}
      />
      <button className='border bg-gray-500'
        onClick={handleSubmit}
      >Addtask</button>
      {taskList.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  )
}
