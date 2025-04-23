import { Request, Response } from "express";
import Team from "../models/team.model";
import UserTeam from "../models/userTeam.model";
import User from "../models/user.model";
import { verfyJWT } from "../helpers/jwt.helper";
import Project from "../models/project.model";
import { generateTeamToken } from "../helpers/token.helper";

export class TeamController {


  static async getTeamById(req: Request, res:Response){
    const { userId } = req.body;
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
      const team = await Team.findByPk(teamId);
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
      const { teamId } = req.body;
  
      if (!teamId) {
        res.status(400).json({ error: "Se requiere teamId" });
        return;
      }
  
      // Verificar si el equipo existe
      const team = await Team.findByPk(teamId);
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

      if (!teamId) {
        return res.status(400).json({ error: "El teamId es obligatorio" });
      }

      const projects = await Project.findAll({
        include: {
          model: Team,
          where: { teamId },
          through: { attributes: [] }
        }
      });

      res.status(200).json({ projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los proyectos del equipo" });
    }
  }
}
