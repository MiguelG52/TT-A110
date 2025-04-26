import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Team from "../models/team.model";

declare global {
    namespace Express {
        interface Request {
            user?: User;
            team?: Team; 
        }
    }
}
import { sendAuthError } from '../helpers/errors.helper';

export const teamExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamId } = req.params;
        console.log(req.params)

        if (!teamId) {
            res.status(400).json({ error: "ID de equipo no proporcionado" });
            return 
        }

        const team = await Team.findByPk(teamId);
        if (!team) {
            res.status(404).json({ error: "Equipo no encontrado" });
            return 
        }

        req.team = team; // Añadimos el equipo al request para reutilizarlo
        next();
    } catch (error) {
        console.error("Error en teamExists middleware:", error);
        res.status(500).json({ error: "Error al verificar el equipo" });
        return 
    }
};

export const isTeamOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const team = req.team; // Obtenido del middleware teamExists

        if (!team) {
            res.status(400).json({ error: "Información del equipo no disponible" });
            return 
        }

        if (team.userId !== userId) {
            sendAuthError(res, "No eres el propietario de este equipo", 403);
            return 
        }

        next();
    } catch (error) {
        console.error("Error en isTeamOwner middleware:", error);
        res.status(500).json({ error: "Error al verificar propiedad del equipo" });
        return 
    }
};

export const canModifyTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        const teamId = req.params.teamId || req.body.teamId;

        if (!teamId) {
            res.status(400).json({ error: "ID de equipo no proporcionado" });
            return 
        }

        // Verificar si el usuario es el propietario o tiene permisos
        const team = await Team.findByPk(teamId);
        if (!team) {
            res.status(404).json({ error: "Equipo no encontrado" });
            return 
        }

        if (team.userId !== userId) {
            // Opcional: Verificar si es admin o tiene otros permisos
            const user = req.user;
            if (user?.roleId !== 2) { // Asumiendo que 2 es admin
                sendAuthError(res, "No tienes permiso para modificar este equipo", 403);
            }
        }

        req.team = team;
        next();
    } catch (error) {
        console.error("Error en canModifyTeam middleware:", error);
        res.status(500).json({ error: "Error al verificar permisos" });
        return 
    }
};