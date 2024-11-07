import { GitHook } from "./githook.js"
import dotenv from 'dotenv'

dotenv.config()

const webhookURL = process.env.WEBHOOK_URL
const textFileURL = process.env.TEXT_FILE_URL

try {
    const gitHook = new GitHook(webhookURL)
    gitHook.sendMessage(textFileURL)
} catch (err) {
    console.error(err.message)
}