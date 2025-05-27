"use client";
import { useUser } from "@/context/authContext";
import { IUser } from "@/models/models";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export const useCodeEditorSocket = (projectId: string, isTemporary:boolean) => {
  const [code, setCode] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<any>(null);
   const [connectedUsers, setConnectedUsers] = useState<IUser[]>([]);
    const {user} = useUser()

 

  useEffect(() => {

    const javaCode = sessionStorage.getItem("javaCode")
    if (javaCode !== null && javaCode !== undefined && javaCode !== "") {
      if (!isTemporary) setCode(javaCode);
    }
    if (!projectId) return;

    const newSocket = io(`${process.env.NEXT_PUBLIC_WEB_SOCKET}-${projectId}`, {
      path: "/socket.io",
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log(`Conectado al proyecto ${projectId}`);
      newSocket.emit("user-joined", user);
    });

    newSocket.on("code-update", (newCode: string) => {
      setCode(newCode);
    });

    newSocket.on("users-updated", (users: IUser[]) => {
      setConnectedUsers(users);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [projectId]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (socket && isConnected) {
      socket.emit("code-change", newCode);
    }
  };

  return {
    code,
    isConnected,
    connectedUsers,
    handleCodeChange,
  };
};