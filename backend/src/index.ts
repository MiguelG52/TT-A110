import app from './server';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);   
const io = new Server(httpServer, {
  cors: {   
    origin: 'http://localhost:3000',   
  },
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en pueto: ${PORT}`);
});

