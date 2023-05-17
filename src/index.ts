import { app } from './app/index'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8080

function App() {
    app.addresses().forEach(address => {
        console.log(`[Server] Server running on URL: http://${address.address}:${address.port}`)
    })
}

app.listen({ port: Number(PORT) }, App)
