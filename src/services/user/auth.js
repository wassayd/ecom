export const USER_KEY = 'user';

export const isConnected = _ => {
    const userString = localStorage.getItem(USER_KEY)

    if(!userString) {
        return false;
    }

    const user = JSON.parse(userString)

    return !user.id;
}

export const logout = _ => {
    window.localStorage.removeItem(USER_KEY)
}    