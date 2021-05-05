export const BASE_URL = "http://localhost:3001"

export const generateRandomNumber = (min, max) =>  {
    return Math.floor(Math.random() * (max - min) + min);
};