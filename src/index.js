import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import configureStore from "./store/store"
import {
    titleChanged,
    taskDeleted,
    completeTask,
    loadTasks,
    getTasks,
    getTaskLoadingStatus,
    createTask,
} from "./store/task"
import { Provider, useSelector, useDispatch } from "react-redux"
import { getError } from "./store/errors"

const store = configureStore()

const App = () => {
    const state = useSelector(getTasks())
    const isLoading = useSelector(getTaskLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    }, [])

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId))
    }
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId))
    }

    const addTask = () => {
        dispatch(createTask({ userId: 1, title: "Title", completed: false }))
    }
    if (isLoading) {
        return <h1>Loading</h1>
    }
    // console.log(error)
    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <h1>App</h1>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change title
                        </button>
                        <button onClick={() => deleteTask(el.id)}>
                            Delete task
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
            <button onClick={() => addTask()}>Create task</button>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
