import { app } from './app/index'
import { getEnv } from '@util/var-env'

const PORT = getEnv({ name: 'PORT', default: 8080 })

function App() {
    app.addresses().forEach(address => {
        console.log(`[Server::Address] address=${address.address} port=${address.port}`)
    })
}

app.listen({ port: Number(PORT) }, App)
