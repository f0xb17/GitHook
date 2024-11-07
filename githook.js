import axios from 'axios'

export class GitHook {

    constructor(webhookURL) {
        if (!webhookURL) {
            throw new Error('Webhook URL should not be empty!')
        }
        this.webhookURL = webhookURL
    }

    async fetchTextFile(url) {
        try {
            const { data } = await axios.get(url)
            return data
        } catch (err) {
            console.error('Error fetching Data from file: ', err)
            throw err
        }
    }

    getRandomContent(text) {
        const lines = text.split('\n').filter(line => line.trim() !== '')
        return lines[Math.floor(Math.random() * lines.length)]
    }

    async sendMessage(url) {
        try {
            const text = await this.fetchTextFile(url)
            if (text) {
                let message = this.getRandomContent(text)
                await axios.post(this.webhookURL, { content: `Meddle loide, ${message}` })
                console.log('Message sent: ', message)
            }
        } catch (err) {
            console.error('Error sending Messsage: ', err)
        }
    }
}