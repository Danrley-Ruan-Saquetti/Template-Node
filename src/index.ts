import 'dotenv/config'
import { app } from './app/index'

const PORT = process.env.PORT || 8080

function App() {
    app.addresses().forEach(address => {
        console.log(`[Server] Server running on URL: http://${address.address}:${address.port}`)
    })
}

app.listen({ port: Number(PORT) }, App)
