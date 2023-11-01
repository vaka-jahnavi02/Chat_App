import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path"; 
import onSocket from "./socket.js"
import { fileURLToPath } from "url";
import {dirname} from "path"

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)
app.use(express.static(__dirname+"/public"))
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'public', 'index.html')); 
});

onSocket(io);

const port = process.env.PORT || 8080;
httpServer.listen(port, (err) => { 
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on ${port}`);
  }
});
