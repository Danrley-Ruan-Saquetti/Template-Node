import { app } from './app/index'
import { createServer } from 'http'
import dotenv from 'dotenv'
dotenv.config()

const server = createServer(app)
const PORT = process.env.PORT || 8080

function App() {
  console.log(`[Server] Server running on URL: ${process.env.URL_SERVER || ''}:${PORT}`)
}

server.listen(PORT, App)
