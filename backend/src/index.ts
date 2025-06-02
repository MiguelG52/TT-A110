import app from './servers/http.server';
import { createServer } from 'http';
import { initSocketServer } from './servers/socket.server';

const httpServer = createServer(app);   

initSocketServer(httpServer);

const PORT = 5000;
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en pueto: ${PORT}`);
});

