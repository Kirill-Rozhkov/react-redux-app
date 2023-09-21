import { taskDeleted, taskUpdated } from "./actionTypes"

export function taskReducer(state = [], action) {
    switch (action.type) {
        case taskUpdated: {
            const newArray = [...state]
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id
            )
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                ...action.payload,
            }
            console.log(newArray[elementIndex])
            return newArray
        }
        case taskDeleted:
            const newArray = [...state]
            const filtredArray = newArray.filter(
                (el) => el.id !== action.payload.id
            )
            return filtredArray
        default:
            return state
    }
}
