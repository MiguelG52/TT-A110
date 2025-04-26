import { NextFunction, Request, Response } from "express";
import Project from "../models/project.model";
import { sendErrorResponse } from "../helpers/responses.helper";

export const projectExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findByPk(projectId);
      
      if (!project) {
        sendErrorResponse(res, 404, "Proyecto no encontrado");
        return 
      }
      req.project = project;
      next();
    } catch (error) {
      console.error("Error en projectExists middleware:", error);
      sendErrorResponse(res, 500, "Error al verificar el proyecto");
      return 
    }
  };

  export const isProjectOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      const project = req.project;
      
      if (project.userId !== userId) {
        sendErrorResponse(res, 403, "No eres el propietario de este proyecto");
        return 
      }
      
      next();
    } catch (error) {
      console.error("Error en isProjectOwner middleware:", error);
      sendErrorResponse(res, 500, "Error al verificar propiedad del proyecto");
      return 
    }
  };