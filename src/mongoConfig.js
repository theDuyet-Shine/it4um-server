import {set, connect }from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const URL = process.env.MONGO_URL

export const handleConnectDB = () => {
    set("strictQuery", false);
    connect(URL)
    .then(() => console.log(`Connected to MongoDB: ${URL}`))
    .catch((err) => console.log('Failed to connect: ', err))
}
