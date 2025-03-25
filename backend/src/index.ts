import app from './server';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);   
const io = new Server(httpServer, {
  cors: {   
    origin: '*',   
  },
});

const PORT = 5001;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en pueto: ${PORT}`);
});

