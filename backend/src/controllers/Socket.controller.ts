import { Server, Socket } from "socket.io";

export default {
  handleCodeChange: (
    io: Server,
    projectId: string,
    newCode: string,
    senderId: string
  ) => {
    // Validaciones adicionales aquí (ej: permisos del usuario)
    io.to(projectId).emit("code-update", newCode); // Envía a todos en el proyecto
    console.log(`Código actualizado en proyecto ${projectId}`);
  },
};