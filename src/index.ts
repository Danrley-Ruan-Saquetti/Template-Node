import { app } from "./app/index";
import { createServer } from "http";

const server = createServer(app);
const PORT = 8080;

function App() {
  console.log(`Server running on port ${PORT}`);
}

server.listen(PORT, App);
