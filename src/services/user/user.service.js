import { USER_KEY } from "./auth"

export const setUserLocalStorage = user =>{
    const stringData = JSON.stringify(user)
    window.localStorage.setItem(USER_KEY, stringData)
}
