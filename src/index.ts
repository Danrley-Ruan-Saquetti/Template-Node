import { app } from './app/index'
import { getEnv } from '@util/var-env'
import { getFlag } from '@util/command-line-flags'

const FLAG_PORT = Number(getFlag('--port')) || ''

const PORT = FLAG_PORT || getEnv({ name: 'PORT', default: 8080 })

function App() {
    app.addresses().forEach(address => {
        console.log(`[Server:Address] address=${address.address} port=${address.port}`)
    })
    console.log(`[Server:Info] Server running on node environment=${getEnv({ name: 'NODE_ENV' })} port=${PORT}`)
}

app.listen({ port: Number(PORT) }, App)
