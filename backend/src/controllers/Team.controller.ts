import { Request, Response } from "express";
import Team from "../models/team.model";
import UserTeam from "../models/userTeam.model";
import User from "../models/user.model";
import { verfyJWT } from "../helpers/jwt.helper";
import Project from "../models/project.model";
import { generateTeamToken } from "../helpers/token.helper";
import TeamProject from "../models/teamProject.model";
import sequelize from "../config/db";

export class TeamController {


  static async getTeamById(req: Request, res:Response){
    const { userId } = req.params;
    const team = await Team.findByPk(userId,{
      include:['userId, description','name', 'teamId']
    })

  }

  static async createTeam(req: Request, res: Response) {
    try {

      const { name, description, userId } = req.body;
      if (!name || !description) {
        res.status(400).json({ error: "Nombre y descripción son obligatorios" });
        return 
      } 
      const teamCode = generateTeamToken()
      
      const team = await Team.create({
        name:name,
        description:description,
        userId:userId, 
        teamCodeId:teamCode
      });
      
      await UserTeam.create({
        teamId: team.dataValues.teamId,
        userId: team.dataValues.userId,
      });

      res.status(201).json({ message: "Equipo creado exitosamente", team });
      return
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Error al crear el equipo" });
      return
    }
  }

  static async addUserToTeam(req: Request, res: Response) {
    try {
      const { teamId, userId } = req.body;
      if (!teamId || !userId) {
        res.status(400).json({ error: "teamId y userId son obligatorios" });
        return 
      }

      // Verificar existencia del equipo y usuario
      const team = await Team.findByPk(teamId as string);
      const user = await User.findByPk(userId);
      if (!team) {
        res.status(404).json({ error: "Equipo no encontrado" });
        return
      }
      if (!user){
        res.status(404).json({ error: "Usuario no encontrado" });
        return
      }

      // Verificar si el usuario ya pertenece al equipo
      const existingMembership = await UserTeam.findOne({ where: { teamId, userId } });
      if (existingMembership) {
        res.status(400).json({ error: "El usuario ya es miembro del equipo" });
        return 
      }

      // Agregar usuario al equipo
      await UserTeam.create({ teamId, userId });

      res.status(201).json({ message: "Usuario agregado al equipo exitosamente" });
      return
    } catch (error) {
      res.status(500).json({ error: "Error al agregar usuario al equipo" });
      return
    }
  }

  static async getTeamMembers(req: Request, res: Response) {
    try {
      const { teamId } = req.query;
      if (!teamId){
        res.status(404).json({error:"El identificador del equipo es requerido"})
        return
      }
      // Verificar si el equipo existe
      const team = await Team.findByPk(teamId as string);
      if (!team) {
        res.status(404).json({ error: "Equipo no encontrado" });
        return;
      }
  
      // Buscar los miembros del equipo
      const members = await User.findAll({
        include: [
          {
            model: UserTeam,
            where: { teamId },
            attributes: [] 
          }
        ],
        attributes: ["userId", "name", "lastName", "email", "username"],
      });
  
      res.status(200).json({ teamId, members });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener miembros del equipo" });
    }
  }

  // Obtener todos los proyectos de un equipo
  static async getTeamProjects(req: Request, res: Response) {
    try {
      const { teamId } = req.params;

      const projects = await Project.findAll({
        include: {
          model: Team,
          where: { teamId },
          through: { attributes: [] }
        }
      });

      res.status(200).json({ projects });
      return
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los proyectos del equipo" });
      return
    }
  }
  static async joinTeam(req:Request, res:Response){
    try{
      const {teamCodeId, userId} = req.body;
      if(!teamCodeId || !userId){
        res.status(400).json({error: "El código para unirser al equipo y el usuario son requeridos"})
        return
      }
      const team = await Team.findOne({where: { teamCodeId }})
      if (!team) {
        res.status(404).json({ 
            error: "No se encontró un equipo con ese código" 
        });
        return
      } 

      //Valida si el usuario ya se unio anteriormente
      const existingMembership = await UserTeam.findOne({ 
        where: { teamId: team.dataValues.teamId, userId } 
      });

      if (existingMembership) {
          res.status(400).json({ 
              error: "Ya eres miembro de este equipo" 
          });
          return
      }
      // Verificar que el usuario exista
      const user = await User.findByPk(userId);
      if (!user) {
          res.status(404).json({ 
              error: "Usuario no encontrado" 
          });
          return
      }
      // Añadir usuario al equipo
      await UserTeam.create({ 
        teamId: team.dataValues.teamId, 
        userId 
      });

       res.status(200).json({ 
          success: true,
          message: "Te has unido al equipo exitosamente",
          team
      });
      return
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al unirse al proyecto los proyectos del equipo" });
    }
  }
  static async deleteTeam(req: Request, res: Response) {
    try {
        const { teamId } = req.params;
        const userId = req.user?.userId;
        if (!teamId) {
          res.status(400).json({ error: "El ID del equipo es requerido" });
            return 
        }
        const team = await Team.findByPk(teamId);
        if (!team) {
            res.status(404).json({ error: "Equipo no encontrado" });
            return 
        }

        if (team.userId !== userId) {
             res.status(403).json({ 
                error: "No tienes permiso para eliminar este equipo" 
            });
            return
        }
        await sequelize.transaction(async (t) => {
            // 1. Eliminar miembros del equipo
            await UserTeam.destroy({ 
                where: { teamId },
                transaction: t
            });

            // 2. Eliminar relaciones con proyectos
            await TeamProject.destroy({ 
                where: { teamId },
                transaction: t
            });

            // 3. Eliminar el equipo
            await team.destroy({ transaction: t });
        });

        res.status(200).json({ 
            success: true,
            message: "Equipo eliminado exitosamente. Los proyectos asociados se mantienen." 
        });
        return 
    } catch (error) {
        console.error("Error en deleteTeam:", error);
        res.status(500).json({ 
            error: "Ocurrió un error al borrar el equipo" 
        });
        return
    }
}
}
