import { createAction, createSlice } from "@reduxjs/toolkit"
import todosService from "../services/todos.service"
import { setError } from "./errors"

const initialState = { entities: [], isLoading: true }

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        recived(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(
                (el) => el.id === action.payload.id
            )
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload,
            }
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id
            )
        },
        taskCreated(state, action) {
            console.log(action.payload)
            state.entities.push(action.payload)
        },
        loadTaskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state) {
            state.isLoading = false
        },
    },
})

const { actions, reducer: taskReducer } = taskSlice
const {
    update,
    remove,
    recived,
    taskCreated,
    loadTaskRequested,
    taskRequestFailed,
} = actions

export default taskReducer

export const loadTasks = () => async (dispatch) => {
    dispatch(loadTaskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

const taskRequested = createAction("task/taskRequested")

export const createTask = (payload) => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.create(payload)
        dispatch(taskCreated(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }))
}

export function titleChanged(id) {
    return update({ id, title: `New title for ${id}` })
}

export function taskDeleted(id) {
    return remove({ id })
}

export const getTasks = () => (state) => state.tasks.entities

export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading
