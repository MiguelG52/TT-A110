import { Request, Response } from "express";
import Project from "../models/project.model";
import User from "../models/user.model";
import Team from "../models/team.model";
import TeamProject from "../models/teamProject.model";
import UserTeam from "../models/userTeam.model";
import { sendErrorResponse, sendSuccessResponse } from "../helpers/responses.helper";
import sequelize from "../config/db";

export class ProjectController {
  // Crear un nuevo proyecto con asignación a equipo y miembros
  static async createProject(req: Request, res: Response) {
    const transaction = await sequelize.transaction();
    try {
      const { userId, description, teamId,name } = req.body;

      // Validaciones mejoradas
      if (!userId || !description) {
        await transaction.rollback();
        sendErrorResponse(res, 400, "UserId y descripción son obligatorios");
        return 
      }

      const user = await User.findByPk(userId, { transaction });
      if (!user) {
        await transaction.rollback();
        sendErrorResponse(res, 404, "Usuario no encontrado");
        return 
      }

      // Crear proyecto
      const project = await Project.create({
        userId,
        description,
        name
      }, { transaction });

      // Asignar a equipo si se especificó
      if (teamId) {
        const team = await Team.findByPk(teamId, { transaction });
        if (!team) {
          await transaction.rollback();
          sendErrorResponse(res, 404, "Equipo no encontrado");
          return 
        }

        // Verificar que el usuario pertenezca al equipo
        const isMember = await UserTeam.findOne({
          where: { userId, teamId },
          transaction
        });

        if (!isMember) {
          await transaction.rollback();
          sendErrorResponse(res, 403, "El usuario no pertenece a este equipo");
          return 
        }

        await TeamProject.create({
          teamId: team.dataValues.teamId,
          projectId: project.dataValues.projectId
        }, { transaction });
      }

      await transaction.commit();
      sendSuccessResponse(res, 201, "Proyecto creado exitosamente", { project });
      return 
    } catch (error) {
      await transaction.rollback();
      console.error("Error en createProject:", error);
      sendErrorResponse(res, 500, "Error al crear el proyecto");
    }
      return 
  }

  // Obtener un proyecto por su ID con información completa
  static async getProjectById(req: Request, res: Response) {
    try {
      const { projectId } = req.params;

      if (typeof projectId !== 'string') {
        sendErrorResponse(res, 400, "Id invalido");
        return;
      }

      const project = await Project.findByPk(projectId, {
        attributes: ['projectId', 'name', 'description', 'originalCode', 'improveCode'],
        include: [{
          model: Team,
          as: 'teams',
          attributes: ['teamId', 'name', 'description'],
          through: { attributes: [] }, // Excluye atributos de TeamProject
          include: [{
            model: UserTeam,
            as: 'members', 
            attributes: ['teamId'],
            include: [{
              model: User,
              as: 'user', // Coincide con el alias en el modelo UserTeam
              attributes: ['userId', 'name', 'lastName', 'email', 'username']
            }],
          }],
        }]
      });

      if (!project) {
        sendErrorResponse(res, 404, "Proyecto no encontrado");
        return;
      }

      const { teamId, name, description } = project.dataValues.teams[0].dataValues;
      const members = project.dataValues.teams[0].dataValues.members.map(member => (
        {
          userId: member.dataValues.user.dataValues.userId,
          name: member.dataValues.user.dataValues.name,
          lastName: member.dataValues.user.dataValues.lastName,
          email: member.dataValues.user.dataValues.email,
          username: member.dataValues.user.dataValues.username
        }
      ));
      const team = { teamId, name, description };


      const response = {
          projectId: project.dataValues.projectId,
          description: project.dataValues.description,
          originalCode: project.dataValues.originalCode,
          improveCode: project.dataValues.improveCode,
          name:project.dataValues.name,
          team,
          members

      };
      sendSuccessResponse(res, 200, "Proyecto obtenido exitosamente", response);
      return 

    } catch (error) {
      console.error("Error en getProjectById:", error);
      sendErrorResponse(res, 500, "Error al obtener el proyecto");
      return 
    }
  }

  // Actualizar un proyecto con validación de permisos
  static async updateProject(req: Request, res: Response) {
    const transaction = await sequelize.transaction();
    try {
      const { projectId } = req.params;
      const { description, originalCode, improveCode, userId } = req.body;

      const project = await Project.findByPk(projectId, { transaction });
      if (!project) {
        await transaction.rollback();
        sendErrorResponse(res, 404, "Proyecto no encontrado");
        return 
      }

      // Verificar que el usuario sea el creador o tenga permisos
      if (project.userId !== userId) {
        // Opcional: Verificar si es miembro del equipo con permisos
        const teamProject = await TeamProject.findOne({
          where: { projectId },
          include: [{
            model: Team,
            include: [{
              model: UserTeam,
              where: { userId }
            }]
          }],
          transaction
        });

        if (!teamProject) {
          await transaction.rollback();
          sendErrorResponse(res, 403, "No tienes permiso para editar este proyecto");
          return 
        }
      }

      await project.update({ description, originalCode, improveCode }, { transaction });
      await transaction.commit();
      sendSuccessResponse(res, 200, "Proyecto actualizado exitosamente", { project });
      return 

    } catch (error) {
      await transaction.rollback();
      console.error("Error en updateProject:", error);
      sendErrorResponse(res, 500, "Error al actualizar el proyecto");
      return 
    }
  }

  // Eliminar un proyecto con todas sus relaciones
  static async deleteProject(req: Request, res: Response) {
    const transaction = await sequelize.transaction();
    try {
      const { projectId } = req.params;
      const { userId } = req.body; // Asumimos que el userId viene del middleware de autenticación

      const project = await Project.findByPk(projectId, { transaction });
      if (!project) {
        await transaction.rollback();
        sendErrorResponse(res, 404, "Proyecto no encontrado");
        return 
      }

      // Solo el creador puede eliminar el proyecto
      if (project.userId !== userId) {
        await transaction.rollback();
        sendErrorResponse(res, 403, "Solo el creador puede eliminar este proyecto");
        return 
      }

      // Eliminar relaciones con equipos primero
      await TeamProject.destroy({ 
        where: { projectId },
        transaction
      });

      // Eliminar el proyecto
      await project.destroy({ transaction });
      await transaction.commit();
      sendSuccessResponse(res, 200, "Proyecto eliminado exitosamente");
      return 

    } catch (error) {
      await transaction.rollback();
      console.error("Error en deleteProject:", error);
      sendErrorResponse(res, 500, "Error al eliminar el proyecto");
      return 
    }
  }

  // Nuevo método: Añadir usuarios al proyecto a través del equipo
  static async getProjectMembers(req: Request, res: Response) {
    const transaction = await sequelize.transaction();
    try {
      const { projectId, teamId } = req.params;

      // Verificar que el proyecto y equipo existan
      const project = await Project.findByPk(projectId, { transaction });
      if (!project) {
        await transaction.rollback();
        sendErrorResponse(res, 404, "Proyecto no encontrado");
        return 
      }

      const team = await Team.findByPk(teamId, { transaction });
      if (!team) {
        await transaction.rollback();
        sendErrorResponse(res, 404, "Equipo no encontrado");
        return 
      }


      const teamProject = await TeamProject.findOne({
        where: { projectId, teamId },
        transaction
      });

      if (!teamProject) {
        await transaction.rollback();
        sendErrorResponse(res, 400, "El proyecto no pertenece a este equipo");
        return 
      }

      // Obtener todos los miembros del equipo
      const teamMembers = await UserTeam.findAll({
        where: { teamId },
        include: [User],
        transaction
      });


      await transaction.commit();
      sendSuccessResponse(res, 200, "Miembros del equipo obtenidos", { teamMembers });
      return 

    } catch (error) {
      await transaction.rollback();
      console.error("Error en addTeamMembersToProject:", error);
      return 
    }
  }
}