import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { ProjectManager } from "../helpers/project-manager";
import { User } from "../models/user.type";

const connectedUsersByProject: Record<string, Record<string, User>> = {};

export const initSocketServer = (httpServer: HttpServer): void => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: true,
    },
  });

  // Namespaces dinámicos para proyectos
  const projectNamespace = io.of(/^\/project-\w+$/);

  projectNamespace.on("connection", (socket) => {
    const namespaceParts = socket.nsp.name.split("-");
    const projectId = namespaceParts.slice(1).join("-"); // Soporta IDs con guiones

    console.log(`Usuario conectado al proyecto ${projectId}: ${socket.id}`);

    if (!connectedUsersByProject[projectId]) {
      connectedUsersByProject[projectId] = {};
    }

    socket.join(projectId);

    // El cliente debe emitir "user-joined" después de conectarse
    socket.on("user-joined", (userData: User) => {
      connectedUsersByProject[projectId][socket.id] = userData;
      emitUserList(projectId);
    });

    socket.on("code-change", (newCode: string) => {
      ProjectManager.handleCodeChange(projectId, newCode, socket.id);
      socket.to(projectId).emit("code-update", newCode);
    });

    socket.on("disconnect", () => {
      console.log(`Usuario desconectado del proyecto ${projectId}: ${socket.id}`);

      // Eliminamos al usuario de la lista del proyecto
      delete connectedUsersByProject[projectId][socket.id];

      // Si no quedan usuarios en el proyecto, puedes limpiar el proyecto si lo deseas
      if (Object.keys(connectedUsersByProject[projectId]).length === 0) {
        delete connectedUsersByProject[projectId];
      }

      emitUserList(projectId);
    });
  });

  // Namespace separado para administración (opcional)
  io.of("/projects").on("connection", (socket) => {
    console.log(`Admin conectado: ${socket.id}`);

    socket.on("list-projects", () => {
      socket.emit("projects-list", ProjectManager.listActiveProjects());
    });

    socket.on("disconnect", () => {
      console.log(`Admin desconectado: ${socket.id}`);
    });
  });

  function emitUserList(projectId: string) {
    const users = Object.values(connectedUsersByProject[projectId] || {});
    // Enviar a todos los sockets del proyecto
    const namespace = io.of(`/project-${projectId}`);
    namespace.to(projectId).emit("users-updated", users);
  }
};
