import { Request, Response } from "express";
import Project from "../models/project.model";
import User from "../models/user.model";
import Team from "../models/team.model";
import TeamProject from "../models/teamProject.model";

export class ProjectController {
  // Crear un nuevo proyecto
  static async createProject(req: Request, res: Response) {
    try {
      const { userId, description, originalCode, improveCode, teamId } = req.body;

      if (!userId || !description) {
        res.status(400).json({ error: "El userId y la descripción son obligatorios" });
        return 
      }

      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return 
      }

      const project = await Project.create({
        userId,
        description,
        originalCode,
        improveCode
      });

      if (teamId) {
        const team = await Team.findByPk(teamId);
        if (!team) {
          res.status(404).json({ error: "Equipo no encontrado" });
          return 
        }


        await TeamProject.create({
          teamId:team.dataValues.teamId,
          projectId: project.dataValues.projectId
        });
      }

      res.status(201).json({ message: "Proyecto creado exitosamente", project });
      return
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el proyecto" });
      return
    }
  }

  // Obtener un proyecto por su ID
  static async getProjectById(req: Request, res: Response) {
    try {
      const { projectId } = req.params;

      const project = await Project.findByPk(projectId, {
        include: [{ model: Team, through: { attributes: [] } }, { model: User }]
      });

      if (!project) {
        res.status(404).json({ error: "Proyecto no encontrado" });
        return 
      }

      res.status(200).json({ project });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el proyecto" });
    }
  }

  // Actualizar un proyecto
  static async updateProject(req: Request, res: Response) {
    try {
      console.log(req.params);
      
      const { projectId } = req.params;
      const { description, originalCode, improveCode } = req.body;

      const project = await Project.findByPk(projectId);
      if (!project) {
        res.status(404).json({ error: "Proyecto no encontrado" });
        return 
      }

      await project.update({ description, originalCode, improveCode });

      res.status(200).json({ message: "Proyecto actualizado exitosamente", project });
      return
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el proyecto" });
      return
    }
  }

  // Eliminar un proyecto
  static async deleteProject(req: Request, res: Response) {
    try {
      const { projectId } = req.params;

      const project = await Project.findByPk(projectId);
      if (!project) {
        res.status(404).json({ error: "Proyecto no encontrado" });
        return 
      }

      await project.destroy();

      res.status(200).json({ message: "Proyecto eliminado exitosamente" });
      return
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar el proyecto" });
      return
    }
  }
}
