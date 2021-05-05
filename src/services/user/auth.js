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

export const getUser = _ => {
    return JSON.parse(localStorage.getItem(USER_KEY)) || [{}]
}

export const getUserInformation = _ => {
    const user = getUser()[0]

    delete user.password;
    delete user.id;
    console.log(user);
    return user;
}