import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import socketController from "../controllers/Socket.controller";

export const initSocketServer = (httpServer: HttpServer): void => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // Unirse a una sala de proyecto
    socket.on("join-project", (projectId: string) => {
      socket.join(projectId);
      console.log(`Usuario ${socket.id} unido al proyecto ${projectId}`);
    });

    // Manejar cambios de código en tiempo real
    socket.on("code-change", (projectId: string, newCode: string) => {
      socketController.handleCodeChange(io, projectId, newCode, socket.id);
    });

    socket.on("disconnect", () => {
      console.log(`Usuario desconectado: ${socket.id}`);
    });
  });
};