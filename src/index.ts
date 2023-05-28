import { app } from './app/index'
import {getEnv, getAllFlags, getFlag} from '@esliph/util'

const PORT = getEnv({ name: 'PORT', default: 8080 })

function App() {
    app.addresses().forEach(address => {
        console.log(`[Server:Address] address=${address.address} port=${address.port}`)
    })
    console.log(`[Server:Info] Server running on node environment=${getEnv({ name: 'NODE_ENV' })} port=${PORT}`)

    const flagsOptions = getAllFlags()

    if (Object.keys(flagsOptions).length > 0) {
        /* eslint no-unused-expressions: ["off"] */
        const logs: ('query' | 'info' | 'warn' | 'error')[] = []

        if (getFlag('--debug')) {
            getFlag('query') && logs.push('query')
            getFlag('info') && logs.push('info')
            getFlag('warn') && logs.push('warn')
            getFlag('error') && logs.push('error')

            if (logs.length == 0) {
                logs.push('query')
                logs.push('info')
                logs.push('warn')
                logs.push('error')
            }
        }

        flagsOptions['--debug'] && console.log(`[Server:Options] Start debug=${logs}`)
    }
}

app.listen({ port: Number(PORT) }, App)
